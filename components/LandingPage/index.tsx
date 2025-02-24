import Navbar from '../Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Team from './components/Team'
import Roadmap from './components/Roadmap'
import Footer from './components/Footer'

import styles from './styles.module.scss'

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <div id="navbar">
        <Navbar />
      </div>

      <div id="hero">
        <Hero />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="team">
        <Team />
      </div>

      <div id="roadmap">
        <Roadmap />
      </div>

      <div id="community">
        <Footer />
      </div>
    </div>
  )
}

export default LandingPage
