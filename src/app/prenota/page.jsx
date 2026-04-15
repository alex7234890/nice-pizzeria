'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { it } from 'date-fns/locale'
import {
  CalendarIcon,
  Clock,
  Users,
  Phone,
  Mail,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

const timeSlots = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00',
]

const guestOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+']

export default function PrenotaPage() {
  const [date, setDate] = useState(undefined)
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate submission
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1
            className="text-3xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Prenotazione Inviata!
          </h1>
          <p className="text-muted-foreground mb-8">
            Grazie {name}! La tua richiesta di prenotazione per{' '}
            <strong>{guests} persone</strong> il{' '}
            <strong>{date ? format(date, 'dd MMMM yyyy', { locale: it }) : ''}</strong> alle{' '}
            <strong>{time}</strong> è stata inviata con successo.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Riceverai una conferma via SMS o email entro pochi minuti.
          </p>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 rounded-full">
              Torna alla Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Torna al sito</span>
            </Link>
            <Link href="/">
              <span
                className="text-2xl font-bold text-primary"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Nice Pizza
              </span>
            </Link>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold">Prenotazione Tavolo</span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Prenota il Tuo Tavolo
            </h1>
            <p className="text-muted-foreground text-lg">
              Compila il modulo per prenotare la tua esperienza da Nice Pizza
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Date & Time Section */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                Data e Ora
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Date Picker */}
                <div className="space-y-2">
                  <Label>Data della Prenotazione</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal h-12',
                          !date && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP', { locale: it }) : 'Seleziona una data'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date() || date.getDay() === 1}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs text-muted-foreground">Chiusi il lunedì</p>
                </div>

                {/* Time Select */}
                <div className="space-y-2">
                  <Label>Orario Preferito</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Seleziona orario" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Guests Section */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Numero di Ospiti
              </h2>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {guestOptions.map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuests(num)}
                    className={cn(
                      'h-12 rounded-xl font-medium transition-all',
                      guests === num
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                I Tuoi Dati
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome e Cognome *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mario Rossi"
                    className="h-12"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefono *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+39 333 123 4567"
                      className="h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="mario@email.com"
                      className="h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Note Aggiuntive</Label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Allergie, richieste particolari, seggiolone per bambini..."
                    className="w-full min-h-24 rounded-xl border border-input bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                disabled={!date || !time || !guests || !name || !phone}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-12 py-6 text-lg rounded-full shadow-lg shadow-primary/25 disabled:opacity-50"
              >
                Conferma Prenotazione
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Riceverai una conferma via SMS entro pochi minuti
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
