import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'
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

        {/* Custom ConnectButton */}
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openConnectModal,
            openAccountModal,
            openChainModal,
            mounted,
          }) => {
            const ready = mounted
            const connected = ready && account && chain

            return (
              <>
                {/* Button jaringan dengan popup (sekarang di atas tombol connect) */}
                {connected && (
                  <button
                    onClick={openChainModal}
                    className={styles.connectButton}
                  >
                    {chain.name}
                  </button>
                )}

                <button
                  onClick={connected ? openAccountModal : openConnectModal}
                  className={styles.connectButton}
                >
                  {connected
                    ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
                    : 'Connect Wallet'}
                </button>

                {/* Tombol SOMNIA EXPLORE */}
                {connected && (
                  <button
                    onClick={() =>
                      window.open(
                        'https://somnia-testnet.socialscan.io/address/0xc7db42854266939def416d043d1c7c50ee7ea8a4',
                        '_blank',
                      )
                    }
                    className={styles.connectButton}
                  >
                    Somnia Explorer
                  </button>
                )}
              </>
            )
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  )
}

export default Navbar
