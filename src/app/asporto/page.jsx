'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  ArrowLeft,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Clock,
  CheckCircle2,
  Flame,
  Search,
} from 'lucide-react'

const menuCategories = [
  { id: 'classiche', name: 'Classiche' },
  { id: 'speciali', name: 'Speciali' },
  { id: 'vegetariane', name: 'Vegetariane' },
  { id: 'bevande', name: 'Bevande' },
  { id: 'dolci', name: 'Dolci' },
]

const menuItems = [
  { id: 1, name: 'Margherita', description: 'Pomodoro, mozzarella, basilico', price: 8.5, category: 'classiche', popular: true },
  { id: 2, name: 'Marinara', description: 'Pomodoro, aglio, origano', price: 7.0, category: 'classiche', vegetarian: true },
  { id: 3, name: 'Diavola', description: 'Pomodoro, mozzarella, salame piccante', price: 10.0, category: 'classiche', spicy: true },
  { id: 4, name: 'Capricciosa', description: 'Pomodoro, mozzarella, funghi, prosciutto, olive', price: 11.0, category: 'classiche' },
  { id: 5, name: 'Quattro Stagioni', description: 'Pomodoro, mozzarella, funghi, carciofi, prosciutto, olive', price: 12.0, category: 'classiche' },
  { id: 6, name: 'Tartufo e Burrata', description: 'Crema di tartufo, burrata, rucola', price: 14.0, category: 'speciali', premium: true },
  { id: 7, name: 'Salmone e Avocado', description: 'Base bianca, salmone affumicato, avocado, rucola', price: 13.5, category: 'speciali' },
  { id: 8, name: 'Pistacchio e Mortadella', description: 'Crema di pistacchio, mortadella, stracciatella', price: 13.0, category: 'speciali', popular: true },
  { id: 9, name: 'Ortolana', description: 'Pomodoro, mozzarella, verdure grigliate', price: 10.5, category: 'vegetariane', vegetarian: true },
  { id: 10, name: 'Quattro Formaggi', description: 'Mozzarella, gorgonzola, fontina, parmigiano', price: 11.5, category: 'vegetariane', vegetarian: true },
  { id: 11, name: 'Vegana', description: 'Pomodoro, verdure, mozzarella vegana', price: 11.0, category: 'vegetariane', vegetarian: true },
  { id: 12, name: 'Coca Cola 33cl', description: 'Classica, Zero o Light', price: 2.5, category: 'bevande' },
  { id: 13, name: 'Acqua 50cl', description: 'Naturale o Frizzante', price: 1.5, category: 'bevande' },
  { id: 14, name: 'Birra Moretti 33cl', description: 'Birra lager italiana', price: 3.5, category: 'bevande' },
  { id: 15, name: 'Tiramisù', description: 'Classico tiramisù fatto in casa', price: 5.0, category: 'dolci' },
  { id: 16, name: 'Panna Cotta', description: 'Con coulis di frutti di bosco', price: 4.5, category: 'dolci' },
]

const pickupTimes = [
  '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45',
  '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30',
]

export default function AsportoPage() {
  const [activeCategory, setActiveCategory] = useState('classiche')
  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = item.category === activeCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return searchQuery ? matchesSearch : matchesCategory
  })

  const addToCart = (item) => {
    const existingItem = cart.find((i) => i.id === item.id)
    if (existingItem) {
      setCart(cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId) => {
    setCart(cart.filter((i) => i.id !== itemId))
  }

  const updateQuantity = (itemId, delta) => {
    const item = cart.find((i) => i.id === itemId)
    if (item.quantity + delta <= 0) {
      removeFromCart(itemId)
    } else {
      setCart(cart.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity + delta } : i)))
    }
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cashbackAmount = cartTotal * 0.1

  const handleSubmit = () => {
    setIsSubmitted(true)
    setIsCartOpen(false)
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
            Ordine Confermato!
          </h1>
          <p className="text-muted-foreground mb-4">
            Grazie {customerName}! Il tuo ordine è stato ricevuto.
          </p>
          <div className="bg-card rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-muted-foreground mb-2">Ritiro previsto:</p>
            <p className="text-lg font-bold text-primary">{pickupTime}</p>
            <p className="text-sm text-muted-foreground mt-4 mb-2">Totale:</p>
            <p className="text-2xl font-bold text-foreground">€{cartTotal.toFixed(2)}</p>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-primary font-semibold flex items-center gap-2">
                <Flame className="w-4 h-4" />
                Cashback guadagnato: €{cashbackAmount.toFixed(2)}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-8">
            Riceverai un SMS con i dettagli dell&apos;ordine.
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
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Torna al sito</span>
            </Link>
            <Link href="/">
              <span
                className="text-2xl font-bold text-primary"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                La Fiamma
              </span>
            </Link>

            {/* Desktop Cart Button */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative hidden lg:flex">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Carrello
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Il Tuo Ordine</SheetTitle>
                  <SheetDescription>
                    Controlla il tuo ordine e procedi al checkout
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 flex flex-col h-full">
                  {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                      <p className="text-muted-foreground">Il carrello è vuoto</p>
                      <p className="text-sm text-muted-foreground/70 mt-1">
                        Aggiungi qualcosa dal menu!
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-auto space-y-4 pb-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 bg-secondary/50 rounded-xl p-4">
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{item.name}</p>
                              <p className="text-sm text-muted-foreground">€{item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 rounded-full bg-card flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 rounded-full bg-card flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive/20 transition-colors ml-2"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Checkout Form */}
                      <div className="border-t border-border pt-4 space-y-4">
                        <div className="space-y-2">
                          <Label>Orario di Ritiro</Label>
                          <Select value={pickupTime} onValueChange={setPickupTime}>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleziona orario" />
                            </SelectTrigger>
                            <SelectContent>
                              {pickupTimes.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Nome *</Label>
                          <Input
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="Mario Rossi"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Telefono *</Label>
                          <Input
                            type="tel"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            placeholder="+39 333 123 4567"
                          />
                        </div>

                        {/* Totals */}
                        <div className="bg-secondary rounded-xl p-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotale</span>
                            <span className="font-medium">€{cartTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm text-primary">
                            <span className="flex items-center gap-1">
                              <Flame className="w-4 h-4" />
                              Cashback (10%)
                            </span>
                            <span className="font-medium">+€{cashbackAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                            <span>Totale</span>
                            <span>€{cartTotal.toFixed(2)}</span>
                          </div>
                        </div>

                        <Button
                          onClick={handleSubmit}
                          disabled={!pickupTime || !customerName || !customerPhone}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-full"
                        >
                          Conferma Ordine
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <Flame className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold">Ordina da Asporto</span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold text-foreground mb-2"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Il Nostro Menu
          </h1>
          <p className="text-muted-foreground">
            Guadagna il 10% di cashback su ogni ordine!
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cerca nel menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-full"
          />
        </div>

        {/* Categories */}
        {!searchQuery && (
          <div className="flex overflow-x-auto gap-2 pb-4 mb-8 -mx-4 px-4 scrollbar-hide">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card text-muted-foreground hover:bg-card/80 border border-border'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* Menu Items */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl p-5 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                    {item.popular && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                        Popolare
                      </Badge>
                    )}
                    {item.spicy && (
                      <Badge variant="secondary" className="bg-red-100 text-red-600 text-xs">
                        Piccante
                      </Badge>
                    )}
                    {item.vegetarian && (
                      <Badge variant="secondary" className="bg-green-100 text-green-600 text-xs">
                        Veg
                      </Badge>
                    )}
                    {item.premium && (
                      <Badge variant="secondary" className="bg-amber-100 text-amber-600 text-xs">
                        Premium
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
                <span className="text-xl font-bold text-primary ml-4">€{item.price.toFixed(2)}</span>
              </div>
              <Button
                onClick={() => addToCart(item)}
                variant="outline"
                className="w-full mt-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Aggiungi
              </Button>
            </div>
          ))}
        </div>
      </main>

      {/* Mobile Cart Button */}
      {cartItemsCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border lg:hidden">
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-full">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Vedi Carrello ({cartItemsCount}) - €{cartTotal.toFixed(2)}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
              <SheetHeader>
                <SheetTitle>Il Tuo Ordine</SheetTitle>
                <SheetDescription>
                  Controlla il tuo ordine e procedi
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex flex-col h-full overflow-hidden">
                <div className="flex-1 overflow-auto space-y-4 pb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-secondary/50 rounded-xl p-4">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">€{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-card flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-card flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Checkout Form */}
                <div className="border-t border-border pt-4 space-y-4 pb-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Orario Ritiro</Label>
                      <Select value={pickupTime} onValueChange={setPickupTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Orario" />
                        </SelectTrigger>
                        <SelectContent>
                          {pickupTimes.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Nome</Label>
                      <Input
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Nome"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Telefono</Label>
                    <Input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+39 333 123 4567"
                    />
                  </div>

                  <div className="bg-secondary rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm text-primary">
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4" />
                        Cashback
                      </span>
                      <span className="font-medium">+€{cashbackAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Totale</span>
                      <span>€{cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={!pickupTime || !customerName || !customerPhone}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-full"
                  >
                    Conferma Ordine
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  )
}
