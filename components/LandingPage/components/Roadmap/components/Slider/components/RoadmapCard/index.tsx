import styles from './styles.module.scss'
import Image, { StaticImageData } from 'next/image'
interface CardProps {
  title: string | StaticImageData
  secondaryTitle: string | StaticImageData
  text: string
}

const RoadmapCard = ({ ...props }: CardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Image src={props.title} alt="Title" />
      </div>

      <div className={styles.secondaryTitle}>
        <Image src={props.secondaryTitle} alt="Title" />
      </div>

      <div className={styles.text}>{props.text}</div>
    </div>
  )
}

export default RoadmapCard
