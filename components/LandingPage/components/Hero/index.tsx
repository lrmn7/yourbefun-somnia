import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useAccount } from 'wagmi'
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
}

const Hero = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [account, setAccount] = useState<string | null>(null)
  const [lrmnFee, setLrmnFee] = useState<string>('0.001') // Default fee
  const [showPopup, setShowPopup] = useState(false)
  const [showErrorPopup, setShowErrorPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)

  const { isConnected } = useAccount()

  useEffect(() => {
    connectWallet()
    fetchMessages()
    fetchFee()
    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [])

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })

      if (accounts.length > 0) {
        const signer = await provider.getSigner()
        setAccount(await signer.getAddress())
      }
    }
  }

  const fetchMessages = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(
        'https://dream-rpc.somnia.network',
      )
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider,
      )

      const data = await contract.getLastMessages()
      const totalMessages = await contract.totalMessages()

      setMessages(
        data.map((m: any, index: number) => ({
          id: Number(totalMessages) - index,
          address: m.sender,
          message: m.message,
        })),
      )
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const fetchFee = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(
        'https://dream-rpc.somnia.network',
      )
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider,
      )
      const fee = await contract.lrmnFee()
      setLrmnFee(ethers.formatEther(fee))
    } catch (error) {
      console.error('Error fetching fee:', error)
    }
  }

  const checkBalanceAndSendMessage = async () => {
    if (!isConnected) {
      showError('Please connect your wallet first!')
      return
    }

    if (!message.trim()) {
      setShowPopup(true)
      setTimeout(() => setShowPopup(false), 5000)
      return
    }

    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const balance = await provider.getBalance(await signer.getAddress())

      const requiredFee = ethers.parseEther(lrmnFee)
      if (balance < requiredFee) {
        showError(
          'Insufficient balance to send message, get faucet first here https://testnet.somnia.network/',
        )
        return
      }

      await sendMessage()
    }
  }

  const sendMessage = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const network = await provider.getNetwork()

      if (network.chainId !== BigInt(50312)) {
        showError('You are not connected to Somnia Network Testnet!')
        return
      }

      const contract = new ethers.Contract(contractAddress, contractABI, signer)

      try {
        setIsSending(true)

        const tx = await contract.sendMessage(message, {
          value: ethers.parseEther(lrmnFee),
        })
        await tx.wait()

        setMessage('')
        fetchMessages()
      } catch (error: any) {
        console.error('Error sending message:', error)
        showError(parseErrorMessage(error))
      } finally {
        setIsSending(false)
      }
    }
  }

  const parseErrorMessage = (error: any) => {
    return (
      error.reason ||
      error.data?.message ||
      error.message ||
      'Transaction failed! Please try again.'
    )
  }

  const showError = (msg: string) => {
    setErrorMessage(msg)
    setShowErrorPopup(true)
    setTimeout(() => {
      setShowErrorPopup(false)
      setErrorMessage(null)
    }, 5000)
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
              Please type something cool first!
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
          onClick={checkBalanceAndSendMessage}
          className={styles.funMessageButton}
          disabled={isSending}
        >
          {isSending ? 'Please Wait...' : 'Blast a Message'}
        </button>

        <div className={styles.funMessageAlert}>({lrmnFee} STT)</div>

        <div className={styles.recentMessagesContainer}>
          <h3>Fresh Off the Keyboard</h3>
          <ul className={styles.recentMessagesList}>
            {messages.map(({ id, address, message }) => (
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
