'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Waves, 
  Activity, 
  Heart, 
  ChevronLeft, 
  X,
  Loader2
} from 'lucide-react'

const WEBHOOK_URL = 'https://arvexes.app.n8n.cloud/webhook/luxe-booking'

interface BookingData {
  service: string
  duration: string
  price: number
  date: string
  time: string
  name: string
  phone: string
  email: string
  address: string
  notes: string
  agreedToPolicy: boolean
}

const serviceOptions = [
  {
    id: 'remedial',
    name: 'Remedial Massage',
    description: 'Chronic pain, injury recovery, tension release',
    icon: Sparkles,
    prices: { '60': 149, '90': 199 }
  },
  {
    id: 'deeptissue',
    name: 'Deep Tissue',
    description: 'Deep muscular work, slow deliberate pressure',
    icon: Waves,
    prices: { '60': 159, '90': 209 }
  },
  {
    id: 'sports',
    name: 'Sports Recovery',
    description: 'Performance therapy for active bodies',
    icon: Activity,
    prices: { '60': 169, '90': 219 }
  },
  {
    id: 'pregnancy',
    name: 'Pregnancy Massage',
    description: 'Safe therapeutic touch after first trimester',
    icon: Heart,
    prices: { '60': 149, '75': 179 }
  }
]

const timeSlots = ['8am', '9am', '10am', '11am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm']

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const BookingModalContent = ({ isOpen, onClose }: BookingModalProps) => {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [unavailableSlots, setUnavailableSlots] = useState<string[]>([])
  
  const [bookingData, setBookingData] = useState<BookingData>({
    service: '',
    duration: '',
    price: 0,
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    agreedToPolicy: false
  })

  // Generate next 14 days
  const generateCalendarDays = () => {
    const days = []
    const today = new Date()
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push(date)
    }
    return days
  }

  const calendarDays = generateCalendarDays()

  // Randomly make 2-3 slots unavailable when date changes
  useEffect(() => {
    if (bookingData.date) {
      const shuffled = [...timeSlots].sort(() => 0.5 - Math.random())
      setUnavailableSlots(shuffled.slice(0, Math.floor(Math.random() * 2) + 2))
    }
  }, [bookingData.date])

  const totalSteps = 6
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    setDirection(1)
    setStep(prev => Math.min(prev + 1, totalSteps))
  }

  const handleBack = () => {
    setDirection(-1)
    setStep(prev => Math.max(prev - 1, 1))
  }

  const handleClose = () => {
    setStep(1)
    setBookingData({
      service: '',
      duration: '',
      price: 0,
      date: '',
      time: '',
      name: '',
      phone: '',
      email: '',
      address: '',
      notes: '',
      agreedToPolicy: false
    })
    setErrors({})
    onClose()
  }

  const selectService = (serviceId: string) => {
    const service = serviceOptions.find(s => s.id === serviceId)
    if (service) {
      setBookingData(prev => ({
        ...prev,
        service: service.name,
        duration: '',
        price: 0,
        date: prev.date,
        time: prev.time,
        name: prev.name,
        phone: prev.phone,
        email: prev.email,
        address: prev.address,
        notes: prev.notes,
        agreedToPolicy: prev.agreedToPolicy
      }))
    }
  }

  const selectDuration = (duration: string) => {
    const service = serviceOptions.find(s => s.name === bookingData.service)
    const price = service?.prices[duration as keyof typeof service.prices]
    if (service && price !== undefined) {
      setBookingData(prev => ({
        ...prev,
        duration,
        price,
        date: prev.date,
        time: prev.time,
        name: prev.name,
        phone: prev.phone,
        email: prev.email,
        address: prev.address,
        notes: prev.notes,
        agreedToPolicy: prev.agreedToPolicy
      }))
    }
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })
  }

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors }
    
    switch (field) {
      case 'name':
        if (!value.trim()) newErrors.name = 'Please enter your full name'
        else delete newErrors.name
        break
      case 'phone':
        if (!value.trim()) newErrors.phone = 'Please enter your phone number'
        else if (!/^\+?61[\d\s]{8,10}$/.test(value.replace(/\s/g, ''))) {
          newErrors.phone = 'Please enter a valid Australian mobile number'
        } else delete newErrors.phone
        break
      case 'email':
        if (!value.trim()) newErrors.email = 'Please enter your email'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address'
        } else delete newErrors.email
        break
      case 'address':
        if (!value.trim()) newErrors.address = 'Please enter your address'
        else delete newErrors.address
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    const timestamp = Date.now()
    const id = `LX-${timestamp}`
    setBookingId(id)

    const payload = {
      service: bookingData.service,
      duration: bookingData.duration,
      price: bookingData.price,
      date: bookingData.date,
      time: bookingData.time,
      name: bookingData.name,
      phone: bookingData.phone,
      email: bookingData.email,
      address: bookingData.address,
      notes: bookingData.notes,
      booking_id: id
    }

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        handleNext()
      } else {
        setErrors({ submit: 'Something went wrong. Please try again.' })
        setIsLoading(false)
      }
    } catch {
      setErrors({ submit: 'Connection error. Please check your internet and try again.' })
      setIsLoading(false)
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  }

  const getSelectedService = () => serviceOptions.find(s => s.name === bookingData.service)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-onyx/90 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-[680px] md:rounded-lg bg-charcoal border border-champagne/20 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-champagne/10">
          {step < 6 ? (
            <>
              <button
                onClick={step === 1 ? handleClose : handleBack}
                className="p-2 text-ivory/60 hover:text-champagne transition-colors"
                aria-label={step === 1 ? 'Close' : 'Go back'}
              >
                {step === 1 ? <X size={20} /> : <ChevronLeft size={20} />}
              </button>
              
              <div className="flex flex-col items-center">
                <span className="font-body text-[10px] tracking-tracked uppercase text-champagne/60">
                  Step {step} of 5
                </span>
                <div className="w-24 h-0.5 bg-ivory/10 mt-2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-champagne"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <button
                onClick={handleClose}
                className="p-2 text-ivory/60 hover:text-champagne transition-colors md:hidden"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <div className="w-10 hidden md:block" />
            </>
          ) : (
            <div className="w-full" />
          )}
        </div>

        {/* Content */}
        <div className="px-6 py-8 md:px-10 md:py-10 overflow-y-auto max-h-[calc(100vh-80px)] md:max-h-[calc(90vh-80px)]">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-display text-3xl md:text-4xl text-ivory mb-2">Select your service</h2>
                <p className="font-heading text-lg text-cream/60 mb-8">Choose the treatment that suits your needs</p>

                <div className="grid grid-cols-2 gap-4">
                  {serviceOptions.map((service) => {
                    const Icon = service.icon
                    const isSelected = bookingData.service === service.name
                    return (
                      <button
                        key={service.id}
                        onClick={() => selectService(service.id)}
                        className={`p-6 text-left border transition-all duration-300 group ${
                          isSelected 
                            ? 'border-champagne bg-champagne/5 shadow-[0_0_20px_rgba(201,169,97,0.1)]' 
                            : 'border-champagne/20 hover:border-champagne/50 hover:scale-[1.02]'
                        }`}
                      >
                        <Icon 
                          size={24} 
                          className={`mb-4 transition-colors ${isSelected ? 'text-champagne' : 'text-champagne/40 group-hover:text-champagne/70'}`}
                          strokeWidth={1.5}
                        />
                        <h3 className={`font-heading text-lg mb-2 ${isSelected ? 'text-champagne' : 'text-ivory'}`}>
                          {service.name}
                        </h3>
                        <p className="font-body text-xs text-cream/50 leading-relaxed">
                          {service.description}
                        </p>
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={handleNext}
                  disabled={!bookingData.service}
                  className="w-full mt-8 py-4 font-body text-xs tracking-tracked uppercase bg-champagne text-onyx font-medium hover:bg-light-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-display text-3xl md:text-4xl text-ivory mb-2">Select duration</h2>
                <p className="font-heading text-lg text-cream/60 mb-8">How long would you like your session?</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {(() => {
                    const service = getSelectedService()
                    const durations = service?.id === 'pregnancy' ? ['60', '75'] : ['60', '90']
                    return durations.map((duration) => {
                      const isSelected = bookingData.duration === duration
                      const price = service?.prices[duration as keyof typeof service.prices]
                      return (
                        <button
                          key={duration}
                          onClick={() => selectDuration(duration)}
                          className={`p-6 text-center border transition-all duration-300 ${
                            isSelected 
                              ? 'border-champagne bg-champagne/5' 
                              : 'border-champagne/20 hover:border-champagne/50'
                          }`}
                        >
                          <span className={`font-display text-4xl ${isSelected ? 'text-champagne' : 'text-ivory'}`}>
                            {duration}
                          </span>
                          <span className="font-body text-sm text-cream/50 ml-1">min</span>
                          <p className="font-heading text-lg text-champagne mt-2">
                            ${price}
                          </p>
                        </button>
                      )
                    })
                  })()}
                </div>

                {bookingData.duration && (
                  <div className="text-center mb-8">
                    <p className="font-body text-xs tracking-tracked uppercase text-cream/40 mb-1">Total</p>
                    <p className="font-display text-5xl text-champagne">${bookingData.price}</p>
                  </div>
                )}

                <button
                  onClick={handleNext}
                  disabled={!bookingData.duration}
                  className="w-full py-4 font-body text-xs tracking-tracked uppercase bg-champagne text-onyx font-medium hover:bg-light-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-display text-3xl md:text-4xl text-ivory mb-2">Choose date & time</h2>
                <p className="font-heading text-lg text-cream/60 mb-6">When would you like us to visit?</p>

                {/* Calendar */}
                <div className="mb-6">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="text-center font-body text-[10px] tracking-tracked uppercase text-cream/40 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((date, i) => {
                      const dateStr = formatDate(date)
                      const isSelected = bookingData.date === dateStr
                      const isToday = i === 0
                      return (
                        <button
                          key={dateStr}
                          onClick={() => setBookingData(prev => ({ ...prev, date: dateStr, time: '' }))}
                          className={`aspect-square flex items-center justify-center font-heading text-sm transition-all ${
                            isSelected 
                              ? 'bg-champagne text-onyx' 
                              : 'hover:bg-champagne/20 text-ivory'
                          } ${isToday ? 'border border-champagne/30' : ''}`}
                        >
                          {date.getDate()}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                {bookingData.date && (
                  <div className="mb-6">
                    <p className="font-body text-xs tracking-tracked uppercase text-cream/40 mb-3">
                      Available times for {formatDisplayDate(bookingData.date)}
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((slot) => {
                        const isUnavailable = unavailableSlots.includes(slot)
                        const isSelected = bookingData.time === slot
                        return (
                          <button
                            key={slot}
                            onClick={() => !isUnavailable && setBookingData(prev => ({ ...prev, time: slot }))}
                            disabled={isUnavailable}
                            className={`py-2 px-3 font-body text-xs transition-all ${
                              isUnavailable 
                                ? 'text-cream/20 line-through cursor-not-allowed'
                                : isSelected
                                  ? 'bg-champagne text-onyx'
                                  : 'border border-champagne/30 text-ivory hover:border-champagne'
                            }`}
                          >
                            {slot}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleNext}
                  disabled={!bookingData.date || !bookingData.time}
                  className="w-full py-4 font-body text-xs tracking-tracked uppercase bg-champagne text-onyx font-medium hover:bg-light-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-display text-3xl md:text-4xl text-ivory mb-2">Your details</h2>
                <p className="font-heading text-lg text-cream/60 mb-8">How can we reach you?</p>

                <div className="space-y-6">
                  <div>
                    <label className="block font-body text-xs tracking-tracked uppercase text-cream/40 mb-2">
                      Full name *
                    </label>
                    <input
                      type="text"
                      value={bookingData.name}
                      onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                      onBlur={(e) => validateField('name', e.target.value)}
                      placeholder="Your full name"
                      className="input-gold-underline"
                    />
                    {errors.name && <p className="font-heading italic text-sm text-champagne mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block font-body text-xs tracking-tracked uppercase text-cream/40 mb-2">
                      Phone number *
                    </label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => {
                        let value = e.target.value
                        if (value && !value.startsWith('+61')) {
                          value = '+61' + value.replace(/^0/, '').replace(/[^\d]/g, '')
                        }
                        setBookingData(prev => ({ ...prev, phone: value }))
                      }}
                      onBlur={(e) => validateField('phone', e.target.value)}
                      placeholder="+61 400 000 000"
                      className="input-gold-underline"
                    />
                    {errors.phone && <p className="font-heading italic text-sm text-champagne mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block font-body text-xs tracking-tracked uppercase text-cream/40 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                      onBlur={(e) => validateField('email', e.target.value)}
                      placeholder="you@example.com"
                      className="input-gold-underline"
                    />
                    {errors.email && <p className="font-heading italic text-sm text-champagne mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block font-body text-xs tracking-tracked uppercase text-cream/40 mb-2">
                      Address & suburb *
                    </label>
                    <textarea
                      value={bookingData.address}
                      onChange={(e) => setBookingData(prev => ({ ...prev, address: e.target.value }))}
                      onBlur={(e) => validateField('address', e.target.value)}
                      rows={2}
                      placeholder="123 Bondi Rd, Bondi NSW 2026"
                      className="input-gold-underline"
                    />
                    {errors.address && <p className="font-heading italic text-sm text-champagne mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block font-body text-xs tracking-tracked uppercase text-cream/40 mb-2">
                      Health conditions / special requests
                    </label>
                    <textarea
                      value={bookingData.notes}
                      onChange={(e) => setBookingData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={2}
                      placeholder="Any injuries, allergies, or preferences..."
                      className="input-gold-underline"
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="policy"
                      checked={bookingData.agreedToPolicy}
                      onChange={(e) => setBookingData(prev => ({ ...prev, agreedToPolicy: e.target.checked }))}
                      className="mt-1 w-4 h-4 accent-champagne cursor-pointer"
                    />
                    <label htmlFor="policy" className="font-body text-xs text-cream/60 leading-relaxed cursor-pointer">
                      I agree to the <span className="text-champagne">24-hour cancellation policy</span>. 
                      Late cancellations incur a 50% fee; no-shows are charged in full.
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={!bookingData.name || !bookingData.phone || !bookingData.email || !bookingData.address || !bookingData.agreedToPolicy}
                  className="w-full mt-8 py-4 font-body text-xs tracking-tracked uppercase bg-champagne text-onyx font-medium hover:bg-light-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Review booking
                </button>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-display text-3xl md:text-4xl text-ivory mb-2">Confirm your booking</h2>
                <p className="font-heading text-lg text-cream/60 mb-8">Please review your session details</p>

                <div className="border border-champagne/20 p-6 mb-8 space-y-4">
                  <div className="flex justify-between items-start pb-4 border-b border-champagne/10">
                    <div>
                      <p className="font-body text-xs tracking-tracked uppercase text-cream/40 mb-1">Service</p>
                      <p className="font-heading text-lg text-ivory">{bookingData.service}</p>
                    </div>
                    <p className="font-display text-2xl text-champagne">${bookingData.price}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-champagne/10">
                    <div>
                      <p className="font-body text-xs tracking-tracked uppercase text-cream/40 mb-1">Duration</p>
                      <p className="font-heading text-lg text-ivory">{bookingData.duration} minutes</p>
                    </div>
                    <div>
                      <p className="font-body text-xs tracking-tracked uppercase text-cream/40 mb-1">Date & Time</p>
                      <p className="font-heading text-lg text-ivory">
                        {formatDisplayDate(bookingData.date)} at {bookingData.time}
                      </p>
                    </div>
                  </div>

                  <div className="pb-4 border-b border-champagne/10">
                    <p className="font-body text-xs tracking-tracked uppercase text-cream/40 mb-1">Name</p>
                    <p className="font-heading text-lg text-ivory">{bookingData.name}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-champagne/10">
                    <div>
                      <p className="font-body text-xs tracking-tracked uppercase text-cream/40 mb-1">Phone</p>
                      <p className="font-heading text-lg text-ivory">{bookingData.phone}</p>
                    </div>
                    <div>
                      <p className="font-body text-xs tracking-tracked uppercase text-cream/40 mb-1">Email</p>
                      <p className="font-heading text-lg text-ivory">{bookingData.email}</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-body text-xs tracking-tracked uppercase text-cream/40 mb-1">Address</p>
                    <p className="font-heading text-lg text-ivory">{bookingData.address}</p>
                  </div>

                  {bookingData.notes && (
                    <div className="pt-4 border-t border-champagne/10">
                      <p className="font-body text-xs tracking-tracked uppercase text-cream/40 mb-1">Notes</p>
                      <p className="font-heading text-base text-cream/80">{bookingData.notes}</p>
                    </div>
                  )}
                </div>

                {errors.submit && (
                  <p className="font-heading italic text-sm text-champagne text-center mb-4">{errors.submit}</p>
                )}

                <button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="w-full py-5 font-body text-sm tracking-tracked uppercase bg-champagne text-onyx font-medium hover:bg-light-gold transition-colors disabled:opacity-70 flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center py-8"
              >
                {/* Animated Checkmark */}
                <div className="w-20 h-20 mx-auto mb-8 relative">
                  <svg viewBox="0 0 50 50" className="w-full h-full">
                    <motion.circle
                      cx="25"
                      cy="25"
                      r="22"
                      fill="none"
                      stroke="#c9a961"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M15 25 L22 32 L35 18"
                      fill="none"
                      stroke="#c9a961"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3, delay: 0.5, ease: "easeInOut" }}
                    />
                  </svg>
                </div>

                <h2 className="font-display text-3xl md:text-4xl text-ivory mb-4">Your session is reserved.</h2>
                <p className="font-heading text-lg text-cream/60 max-w-sm mx-auto mb-8">
                  We'll confirm via WhatsApp within the hour. A confirmation email is on its way to your inbox.
                </p>

                <p className="font-body text-xs tracking-tracked uppercase text-cream/40 mb-8">
                  Booking reference: <span className="text-champagne">{bookingId}</span>
                </p>

                <button
                  onClick={handleClose}
                  className="px-12 py-4 font-body text-xs tracking-tracked uppercase border border-champagne text-champagne hover:bg-champagne hover:text-onyx transition-colors"
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

// Lazy-loaded wrapper
const BookingModal = (props: BookingModalProps) => {
  return (
    <AnimatePresence>
      {props.isOpen && (
        <Suspense fallback={null}>
          <BookingModalContent {...props} />
        </Suspense>
      )}
    </AnimatePresence>
  )
}

export default BookingModal
