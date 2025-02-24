import Image from 'next/image'

import styles from './styles.module.scss'

import logo from './assets/somnia-light.svg'
import twitter from './assets/twitter.svg'

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image
          src={logo}
          alt="Logo"
          width={40}
          onClick={() => window.open('https://somnia.network/', '_blank')}
        />
      </div>

      <div className={styles.navigationContainer}></div>

      <div className={styles.connectionsContainer}>
        <div
          className={styles.dcButton}
          onClick={() => window.open('https://x.com/romanromannya', '_blank')}
        >
          <Image src={twitter} alt="Twitter-x" width={30} />
        </div>

        <div className={styles.connectButton}>Connect Wallet</div>
      </div>
    </div>
  )
}

export default Navbar
