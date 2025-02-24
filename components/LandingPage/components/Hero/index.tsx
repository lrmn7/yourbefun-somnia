import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import styles from './styles.module.scss'
import contractABI from './SmartContractAbi.json'

const contractAddress = '0xC7db42854266939dEf416d043d1C7c50Ee7ea8a4'

declare global {
  interface Window {
    ethereum?: any
  }
}

interface Message {
  id: number
  address: string
  message: string
  sender: string
}

const Hero = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [account, setAccount] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [showErrorPopup, setShowErrorPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    connectWallet()
    fetchMessages()
  }, [])

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      setAccount(await signer.getAddress())
    }
  }

  const fetchMessages = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider,
      )

      try {
        const data = await contract.getLastMessages()
        const totalMessages = data.length

        setMessages(
          data.map((m: Message, index: number) => ({
            id: totalMessages - index - 1,
            address: m.sender,
            message: m.message,
          })),
        )
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }
  }

  const sendMessage = async () => {
    if (!message.trim()) {
      setShowPopup(true)
      setTimeout(() => setShowPopup(false), 5000)
      return
    }

    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)

      try {
        setIsSending(true)

        const tx = await contract.sendMessage(message, {
          value: ethers.parseEther('0.001'),
        })
        await tx.wait()

        setMessage('')
        fetchMessages()
      } catch (error: any) {
        console.error('Error sending message:', error)
        setErrorMessage(error.reason || 'Transaction failed! Please try again.')
        setShowErrorPopup(true)

        setTimeout(() => {
          setShowErrorPopup(false)
          setErrorMessage(null)
        }, 5000)
      } finally {
        setIsSending(false)
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div className={styles.blankContainer} />
      </div>

      <div className={styles.positionContainer}>
        <div className={styles.statsContainer}></div>
      </div>

      <div className={styles.funMessageSection}>
        <div className={styles.funMessageInputContainer}>
          {showPopup && (
            <div className={`${styles.popupError} ${styles.show}`}>
              Please enter a fun message!
            </div>
          )}

          {showErrorPopup && errorMessage && (
            <div className={`${styles.popupError} ${styles.show}`}>
              {errorMessage}
            </div>
          )}

          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Type something cool..."
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 32))}
              className={styles.funMessageInput}
            />
            <span className={styles.charIndicator}>{message.length}/32</span>
          </div>
        </div>

        <button
          onClick={sendMessage}
          className={styles.funMessageButton}
          disabled={isSending}
        >
          {isSending ? 'Please Wait...' : 'Blast a Message'}
        </button>

        <div className={styles.funMessageAlert}>(0.001 STT)</div>

        <div className={styles.recentMessagesContainer}>
          <h3>Fresh Off the Keyboard</h3>
          <ul className={styles.recentMessagesList}>
            {messages.slice(0, 10).map(({ id, address, message }) => (
              <li key={id}>
                <strong>
                  [{id}] {address.slice(0, 6)}...{address.slice(-4)}:
                </strong>{' '}
                <span>{message}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Hero
