import styles from './styles.module.scss'

const fakeMessages = [
  { id: 4966, address: '0xCD22...01a9', message: 'ekesitem nya herese"=' },
  {
    id: 4965,
    address: '0x7ba2...baD2',
    message: 'Get ready to dream big "Somnia"',
  },
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
  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div className={styles.blankContainer} />
        <div className={styles.mintContainer}>
          <div className={styles.widthContainer}>
            <div className={styles.placeholder}>
              {/* Bisa diganti teks atau dibiarkan kosong */}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.positionContainer}>
        <div className={styles.statsContainer}></div>
      </div>

      {/* Fun Message Section */}
      <div className={styles.funMessageSection}>
        <div className={styles.funMessageInputContainer}>
          <input
            type="text"
            placeholder="Enter your fun message... (0/32)"
            className={styles.funMessageInput}
          />
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
