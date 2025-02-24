import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import styles from './styles.module.scss'
import contractABI from './ABI.json'

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
        setMessages(
          data.map((m: Message, index: number) => ({
            id: index,
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
      setTimeout(() => setShowPopup(false), 2000) // Popup menghilang setelah 2 detik
      return
    }

    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)

      try {
        setIsSending(true) // Tombol disabled dan berubah teks

        const tx = await contract.sendMessage(message, {
          value: ethers.parseEther('0.001'),
        })
        await tx.wait()

        setMessage('')
        fetchMessages()
      } catch (error) {
        console.error('Error sending message:', error)
      } finally {
        setIsSending(false) // Tombol aktif kembali setelah transaksi selesai
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
          {/* Popup Error */}
          {showPopup && (
            <div className={`${styles.popupError} ${styles.show}`}>
              Please enter a fun message!
            </div>
          )}

          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Enter your fun message..."
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 32))}
              className={styles.funMessageInput}
            />
            <span className={styles.charIndicator}>{message.length}/32</span>
          </div>
        </div>

        {/* Tombol dengan perubahan status saat loading */}
        <button
          onClick={sendMessage}
          className={styles.funMessageButton}
          disabled={isSending}
        >
          {isSending ? 'Please Wait...' : 'Blast a Message'}
        </button>

        <div className={styles.funMessageAlert}>(0.001 STT)</div>

        <div className={styles.recentMessagesContainer}>
          <h3>Recent Fun Messages</h3>
          <ul className={styles.recentMessagesList}>
            {messages.slice(0, 10).map(({ id, address, message }) => (
              <li key={id}>
                <strong>
                  [{id}] {address}:
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
