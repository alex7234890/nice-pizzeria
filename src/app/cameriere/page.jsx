'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Plus,
  Minus,
  Send,
  Users,
  UtensilsCrossed,
  LogOut,
  User,
  Search,
  ShoppingBag,
  CheckCircle2,
  Clock,
  Trash2,
} from 'lucide-react'

const menuCategories = [
  { id: 'pizze', name: 'Pizze', icon: '🍕' },
  { id: 'antipasti', name: 'Antipasti', icon: '🥗' },
  { id: 'bevande', name: 'Bevande', icon: '🍺' },
  { id: 'dolci', name: 'Dolci', icon: '🍰' },
]

const menuItems = {
  pizze: [
    { id: 1, name: 'Margherita', price: 8.50 },
    { id: 2, name: 'Marinara', price: 7.00 },
    { id: 3, name: 'Diavola', price: 10.00 },
    { id: 4, name: 'Capricciosa', price: 11.00 },
    { id: 5, name: 'Quattro Stagioni', price: 12.00 },
    { id: 6, name: 'Quattro Formaggi', price: 11.50 },
    { id: 7, name: 'Ortolana', price: 10.50 },
    { id: 8, name: 'Tartufo e Burrata', price: 14.00 },
    { id: 9, name: 'Pistacchio e Mortadella', price: 13.00 },
    { id: 10, name: 'Salmone e Avocado', price: 13.50 },
  ],
  antipasti: [
    { id: 11, name: 'Bruschette Miste', price: 6.00 },
    { id: 12, name: 'Mozzarella di Bufala', price: 8.00 },
    { id: 13, name: 'Tagliere Salumi', price: 12.00 },
    { id: 14, name: 'Supplì', price: 2.50 },
    { id: 15, name: 'Fritto Misto', price: 9.00 },
  ],
  bevande: [
    { id: 16, name: 'Coca Cola 33cl', price: 2.50 },
    { id: 17, name: 'Acqua 50cl', price: 1.50 },
    { id: 18, name: 'Birra Moretti 33cl', price: 3.50 },
    { id: 19, name: 'Birra Peroni 33cl', price: 3.50 },
    { id: 20, name: 'Vino Rosso (calice)', price: 4.00 },
    { id: 21, name: 'Vino Bianco (calice)', price: 4.00 },
    { id: 22, name: 'Caffè', price: 1.50 },
  ],
  dolci: [
    { id: 23, name: 'Tiramisù', price: 5.00 },
    { id: 24, name: 'Panna Cotta', price: 4.50 },
    { id: 25, name: 'Cannolo Siciliano', price: 4.00 },
    { id: 26, name: 'Torta della Nonna', price: 5.00 },
  ],
}

const mockTables = [
  { id: 1, name: 'Tavolo 1', guests: 4, status: 'active', items: 3 },
  { id: 2, name: 'Tavolo 2', guests: 2, status: 'active', items: 2 },
  { id: 3, name: 'Tavolo 3', guests: 0, status: 'free' },
  { id: 4, name: 'Tavolo 4', guests: 6, status: 'ordering', items: 0 },
  { id: 5, name: 'Tavolo 5', guests: 3, status: 'active', items: 5 },
  { id: 6, name: 'Tavolo 6', guests: 0, status: 'free' },
  { id: 7, name: 'Tavolo 7', guests: 2, status: 'active', items: 1 },
  { id: 8, name: 'Tavolo 8', guests: 0, status: 'free' },
]

const statusColors = {
  free: 'bg-muted text-muted-foreground',
  active: 'bg-green-100 text-green-700',
  ordering: 'bg-amber-100 text-amber-700',
}

export default function CamerierePage() {
  const [selectedTable, setSelectedTable] = useState(null)
  const [activeCategory, setActiveCategory] = useState('pizze')
  const [currentOrder, setCurrentOrder] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isOrderSent, setIsOrderSent] = useState(false)
  const [notes, setNotes] = useState('')

  const allMenuItems = Object.values(menuItems).flat()
  
  const filteredItems = searchQuery
    ? allMenuItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : menuItems[activeCategory]

  const addToOrder = (item) => {
    const existingItem = currentOrder.find((i) => i.id === item.id)
    if (existingItem) {
      setCurrentOrder(
        currentOrder.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      )
    } else {
      setCurrentOrder([...currentOrder, { ...item, quantity: 1 }])
    }
  }

  const updateQuantity = (itemId, delta) => {
    const item = currentOrder.find((i) => i.id === itemId)
    if (item.quantity + delta <= 0) {
      setCurrentOrder(currentOrder.filter((i) => i.id !== itemId))
    } else {
      setCurrentOrder(
        currentOrder.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + delta } : i
        )
      )
    }
  }

  const orderTotal = currentOrder.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const sendOrder = () => {
    setIsOrderSent(true)
    setTimeout(() => {
      setIsOrderSent(false)
      setCurrentOrder([])
      setSelectedTable(null)
      setNotes('')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span
                className="text-2xl font-bold text-primary"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                La Fiamma
              </span>
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                Cameriere
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Marco</span>
              </div>
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <LogOut className="w-4 h-4 mr-2" />
                  Esci
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Table Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Seleziona Tavolo
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {mockTables.map((table) => (
              <Sheet key={table.id}>
                <SheetTrigger asChild>
                  <button
                    onClick={() => {
                      setSelectedTable(table)
                      setCurrentOrder([])
                    }}
                    className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                      statusColors[table.status]
                    } ${
                      table.status === 'free'
                        ? 'border-dashed border-muted-foreground/30'
                        : 'border-transparent'
                    }`}
                  >
                    <span className="text-sm font-bold block">T{table.id}</span>
                    {table.guests > 0 && (
                      <span className="text-xs flex items-center justify-center gap-1 mt-1">
                        <Users className="w-3 h-3" />
                        {table.guests}
                      </span>
                    )}
                  </button>
                </SheetTrigger>

                <SheetContent side="right" className="w-full sm:max-w-2xl p-0">
                  {isOrderSent ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Ordine Inviato!
                      </h3>
                      <p className="text-muted-foreground">
                        L&apos;ordine per {table.name} è stato inviato in cucina
                      </p>
                    </div>
                  ) : (
                    <>
                      <SheetHeader className="p-6 border-b border-border">
                        <SheetTitle className="flex items-center gap-2">
                          <UtensilsCrossed className="w-5 h-5 text-primary" />
                          Nuovo Ordine - {table.name}
                        </SheetTitle>
                        <SheetDescription>
                          {table.guests} ospiti | Aggiungi articoli al conto
                        </SheetDescription>
                      </SheetHeader>

                      <div className="flex h-[calc(100vh-200px)]">
                        {/* Menu Section */}
                        <div className="flex-1 p-4 overflow-auto border-r border-border">
                          {/* Search */}
                          <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              placeholder="Cerca nel menu..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-10"
                            />
                          </div>

                          {/* Categories */}
                          {!searchQuery && (
                            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                              {menuCategories.map((cat) => (
                                <button
                                  key={cat.id}
                                  onClick={() => setActiveCategory(cat.id)}
                                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                                    activeCategory === cat.id
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-card text-muted-foreground hover:bg-muted'
                                  }`}
                                >
                                  {cat.icon} {cat.name}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Menu Items */}
                          <div className="grid grid-cols-2 gap-2">
                            {filteredItems.map((item) => (
                              <button
                                key={item.id}
                                onClick={() => addToOrder(item)}
                                className="bg-card rounded-xl p-4 text-left hover:shadow-md transition-shadow border border-border"
                              >
                                <p className="font-medium text-foreground text-sm">
                                  {item.name}
                                </p>
                                <p className="text-primary font-bold">
                                  €{item.price.toFixed(2)}
                                </p>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Current Order Section */}
                        <div className="w-80 bg-muted/50 flex flex-col">
                          <div className="p-4 border-b border-border">
                            <h3 className="font-semibold flex items-center gap-2">
                              <ShoppingBag className="w-4 h-4 text-primary" />
                              Ordine Corrente
                            </h3>
                          </div>

                          {currentOrder.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                              <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mb-2" />
                              <p className="text-sm text-muted-foreground">
                                Seleziona articoli dal menu
                              </p>
                            </div>
                          ) : (
                            <>
                              <div className="flex-1 overflow-auto p-4 space-y-2">
                                {currentOrder.map((item) => (
                                  <div
                                    key={item.id}
                                    className="bg-card rounded-lg p-3 flex items-center gap-3"
                                  >
                                    <div className="flex-1">
                                      <p className="font-medium text-sm">{item.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        €{item.price.toFixed(2)} cad.
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center"
                                      >
                                        <Minus className="w-3 h-3" />
                                      </button>
                                      <span className="w-6 text-center text-sm font-medium">
                                        {item.quantity}
                                      </span>
                                      <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                ))}

                                {/* Notes */}
                                <div className="pt-2">
                                  <Input
                                    placeholder="Note per la cucina..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="text-sm"
                                  />
                                </div>
                              </div>

                              {/* Order Total & Send */}
                              <div className="p-4 border-t border-border bg-card">
                                <div className="flex justify-between mb-4">
                                  <span className="font-semibold">Totale</span>
                                  <span className="text-xl font-bold text-primary">
                                    €{orderTotal.toFixed(2)}
                                  </span>
                                </div>
                                <Button
                                  onClick={sendOrder}
                                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
                                >
                                  <Send className="w-5 h-5 mr-2" />
                                  Invia in Cucina
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Tavoli Attivi</p>
            <p className="text-3xl font-bold text-foreground">
              {mockTables.filter((t) => t.status !== 'free').length}
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Ospiti Totali</p>
            <p className="text-3xl font-bold text-foreground">
              {mockTables.reduce((sum, t) => sum + t.guests, 0)}
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Tavoli Liberi</p>
            <p className="text-3xl font-bold text-green-600">
              {mockTables.filter((t) => t.status === 'free').length}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
