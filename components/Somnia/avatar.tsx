import Image from 'next/image'
import { AvatarComponent } from '@rainbow-me/rainbowkit'
import avatar from './avatar.png'

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return (
    <Image
      src={avatar.src}
      alt="Custom Avatar"
      width={size}
      height={size}
      style={{ borderRadius: '50%' }}
    />
  )
}

export default CustomAvatar
