import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Grid, Navigation } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import 'swiper/css/navigation'

import RoadmapCard from './components/RoadmapCard'

import styles from './styles.module.scss'

import title from './assets/title.png'
import secondaryTitle1 from './assets/secondarytitle1.png'
import secondaryTitle2 from './assets/secondarytitle2.png'
import secondaryTitle3 from './assets/secondarytitle3.png'
import secondaryTitle4 from './assets/secondarytitle4.png'
import secondaryTitle5 from './assets/secondarytitle5.png'

SwiperCore.use([Autoplay])

const Slider = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <Swiper
          slidesPerView={3}
          initialSlide={1}
          loop={true}
          autoplay={{ delay: 10000 }}
          navigation={false}
          direction="horizontal"
          grabCursor={true}
          centeredSlides={true}
        >
          <SwiperSlide>
            <RoadmapCard
              title={title}
              secondaryTitle={secondaryTitle1}
              text="Loading... great things take time!"
            />
          </SwiperSlide>

          <SwiperSlide>
            <RoadmapCard
              title={title}
              secondaryTitle={secondaryTitle2}
              text="Not set in stone yet, but big things are coming."
            />
          </SwiperSlide>

          <SwiperSlide>
            <RoadmapCard
              title={title}
              secondaryTitle={secondaryTitle3}
              text="Yeah yeah, we know. It’s coming. Just chill and let the magic happen."
            />
          </SwiperSlide>

          <SwiperSlide>
            <RoadmapCard
              title={title}
              secondaryTitle={secondaryTitle4}
              text="Still cookin’! We’re whipping up something dope, so hang tight and keep your eyes peeled."
            />
          </SwiperSlide>

          <SwiperSlide>
            <RoadmapCard
              title={title}
              secondaryTitle={secondaryTitle5}
              text="Still in the lab, makin’ it fresh. Stay tuned, it’s gonna be fire!."
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default Slider
