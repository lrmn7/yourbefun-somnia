import { useState } from 'react'
import styles from './styles.module.scss'

const fakeMessages = [
  { id: 4966, address: '0xCD22...01a9', message: 'ekesitem nya herese"=' },
  { id: 4964, address: '0x6a5b...Af9b', message: 'hello' },
  { id: 4963, address: '0xf8a5...1319', message: 'Hello World!' },
  {
    id: 4962,
    address: '0xCD22...01a9',
    message: 'ngetik ngetik weh, naon maksudna',
  },
  { id: 4960, address: '0xdB47...0ad2', message: '안녕히 주무세요!' },
  { id: 4959, address: '0xE244...B59B', message: 'Somnia LFG' },
  {
    id: 4956,
    address: '0xCD22...01a9',
    message: 'urang mah teu apal ieu aplikasin',
  },
]

const Hero = () => {
  const [message, setMessage] = useState('')

  const handleChange = (e: any) => {
    if (e.target.value.length <= 32) {
      setMessage(e.target.value)
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

      {/* Fun Message Section */}
      <div className={styles.funMessageSection}>
        <div className={styles.funMessageInputContainer}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Enter your fun message..."
              value={message}
              onChange={handleChange}
              className={styles.funMessageInput}
            />
            <span className={styles.charIndicator}>{message.length}/32</span>
          </div>
        </div>

        <div className={styles.funMessageButton}>Connect</div>
        <div className={styles.funMessageAlert}>need 0.001 stt</div>

        {/* Recent Messages */}
        <div className={styles.recentMessagesContainer}>
          <h3>Recent Fun Messages</h3>
          <ul className={styles.recentMessagesList}>
            {fakeMessages.slice(0, 10).map(({ id, address, message }) => (
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
