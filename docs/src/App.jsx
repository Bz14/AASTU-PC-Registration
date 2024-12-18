import { useState } from 'react'
import Navbar from './navbar'
import LandingPage from './landing_page'
import Services from './service'
import HowItWorks from './how_it_works'
import Footer from './footer'
import AboutUs from './about'

function App() {
 

  return(
  <>
  <Navbar/>
  <LandingPage/>
  <Services/>
  <HowItWorks/>
  <AboutUs/>
  <Footer/>
  </>)
}

export default App
