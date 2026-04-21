import { useState, createContext, useContext } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Services from './components/Services'
import WhatToExpect from './components/WhatToExpect'
import Philosophy from './components/Philosophy'
import Therapist from './components/Therapist'
import ServiceArea from './components/ServiceArea'
import HealthFunds from './components/HealthFunds'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Booking from './components/Booking'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import ScrollProgress from './components/ScrollProgress'
import WhatsAppFloat from './components/WhatsAppFloat'

interface BookingContextType {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const BookingContext = createContext<BookingContextType>({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {}
})

export const useBooking = () => useContext(BookingContext)

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <BookingContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      <div className="min-h-screen bg-onyx text-ivory overflow-x-hidden">
        {/* Scroll progress indicator */}
        <ScrollProgress />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main content */}
        <main>
          <Hero />
          <TrustBar />
          <Services />
          <WhatToExpect />
          <Philosophy />
          <Therapist />
          <ServiceArea />
          <HealthFunds />
          <Testimonials />
          <FAQ />
          <Booking />
        </main>
        
        <Footer />
        
        {/* Mobile WhatsApp button */}
        <WhatsAppFloat />
        
        {/* Booking modal */}
        <BookingModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </BookingContext.Provider>
  )
}

export default App
