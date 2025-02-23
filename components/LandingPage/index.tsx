import Navbar from '../Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Collections from './components/Collections'
import Roadmap from './components/Roadmap'
import Team from './components/Team'
import FAQ from './components/FAQ'
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
        <Collections />
      </div>

      <div id="roadmap">
        <Roadmap />
      </div>

      {/*  <div id='team'>
        <Team />
      </div> 
      */}

      {/*  <div id="FAQ">
        <FAQ />
      </div>
      */}

      <div id="community">
        <Footer />
      </div>
    </div>
  )
}

export default LandingPage
