import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import styles from './styles.module.scss'
import contractABI from './ABI.json' // ✅ Perbaiki import

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
  const [messages, setMessages] = useState<Message[]>([]) // ✅ Tipe array Message
  const [account, setAccount] = useState<string | null>(null) // ✅ Tipe string | null

  useEffect(() => {
    connectWallet()
    fetchMessages()
  }, [])

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      setAccount(await signer.getAddress()) // ✅ Tidak error lagi
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
        const data = await contract.getLastMessages() // ✅ Gunakan fungsi yang benar
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
    if (!message) return
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)

      try {
        const tx = await contract.sendMessage(message, {
          value: ethers.parseEther('0.001'), // ✅ Ethers v6
        })
        await tx.wait()
        setMessage('')
        fetchMessages()
      } catch (error) {
        console.error('Error sending message:', error)
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

        <button onClick={sendMessage} className={styles.funMessageButton}>
          Blast a Message
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
