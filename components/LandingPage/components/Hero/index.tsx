import styles from './styles.module.scss'
import Image from 'next/image'
import megahyped from './assets/wew.png'

const Hero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div className={styles.blankContainer} />

        <div className={styles.logoContainer}>
          <div className={styles.widthContainer}>
            <Image
              src={megahyped}
              alt='Megahyped'
              fill
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.mintContainer}>
          <div className={styles.widthContainer}>
            <div className={styles.placeholder}>
              {/* Bisa diganti teks atau dibiarkan kosong */}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.positionContainer}>
        <div className={styles.statsContainer}>
          </div>
        </div>
    </div>
  )
}

export default Hero
