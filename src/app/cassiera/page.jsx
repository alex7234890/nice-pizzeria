'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  CreditCard,
  Users,
  Receipt,
  Search,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  Euro,
  Flame,
  LogOut,
  User,
  Hash,
  Wallet,
} from 'lucide-react'

// Mock data
const mockTables = [
  { id: 1, name: 'Tavolo 1', status: 'occupied', total: 45.50, items: 4 },
  { id: 2, name: 'Tavolo 2', status: 'occupied', total: 32.00, items: 3 },
  { id: 3, name: 'Tavolo 3', status: 'free', total: 0, items: 0 },
  { id: 4, name: 'Tavolo 4', status: 'occupied', total: 78.50, items: 6 },
  { id: 5, name: 'Tavolo 5', status: 'paying', total: 56.00, items: 5 },
  { id: 6, name: 'Tavolo 6', status: 'free', total: 0, items: 0 },
  { id: 7, name: 'Tavolo 7', status: 'occupied', total: 23.00, items: 2 },
  { id: 8, name: 'Tavolo 8', status: 'free', total: 0, items: 0 },
]

const mockTakeawayOrders = [
  { id: 'A001', customer: 'Mario Rossi', phone: '333 1234567', time: '19:30', total: 28.50, status: 'ready' },
  { id: 'A002', customer: 'Anna Bianchi', phone: '339 7654321', time: '19:45', total: 42.00, status: 'preparing' },
  { id: 'A003', customer: 'Luca Verdi', phone: '340 1111222', time: '20:00', total: 35.50, status: 'ready' },
  { id: 'A004', customer: 'Sara Neri', phone: '347 3333444', time: '20:15', total: 19.00, status: 'preparing' },
]

const mockTableDetails = {
  1: {
    items: [
      { name: 'Margherita', quantity: 2, price: 8.50 },
      { name: 'Diavola', quantity: 1, price: 10.00 },
      { name: 'Birra Moretti 33cl', quantity: 3, price: 3.50 },
    ],
  },
}

const statusColors = {
  free: 'bg-green-100 text-green-700 border-green-200',
  occupied: 'bg-blue-100 text-blue-700 border-blue-200',
  paying: 'bg-amber-100 text-amber-700 border-amber-200',
}

const statusLabels = {
  free: 'Libero',
  occupied: 'Occupato',
  paying: 'In Pagamento',
}

export default function CassieraPage() {
  const [activeTab, setActiveTab] = useState('tables')
  const [selectedTable, setSelectedTable] = useState(null)
  const [cardNumber, setCardNumber] = useState('')
  const [cardBalance, setCardBalance] = useState(null)
  const [useBalance, setUseBalance] = useState(0)
  const [isPaymentComplete, setIsPaymentComplete] = useState(false)

  const handleSearchCard = () => {
    // Simulate card lookup
    if (cardNumber.length >= 4) {
      setCardBalance({
        number: cardNumber,
        holder: 'Mario Rossi',
        balance: 24.50,
      })
    }
  }

  const handlePayment = () => {
    setIsPaymentComplete(true)
    setTimeout(() => {
      setIsPaymentComplete(false)
      setSelectedTable(null)
      setCardNumber('')
      setCardBalance(null)
      setUseBalance(0)
    }, 3000)
  }

  const tableItems = mockTableDetails[1]?.items || []
  const subtotal = selectedTable?.total || 0
  const cashback = (subtotal - useBalance) * 0.1
  const finalTotal = subtotal - useBalance

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
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Cassa
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Giulia</span>
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto">
            <TabsTrigger value="tables" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Tavoli
            </TabsTrigger>
            <TabsTrigger value="takeaway" className="flex items-center gap-2">
              <Receipt className="w-4 h-4" />
              Asporto
            </TabsTrigger>
          </TabsList>

          {/* Tables Tab */}
          <TabsContent value="tables" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockTables.map((table) => (
                <Dialog key={table.id}>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => setSelectedTable(table)}
                      disabled={table.status === 'free'}
                      className={`p-6 rounded-2xl border-2 text-left transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                        statusColors[table.status]
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold">{table.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {statusLabels[table.status]}
                        </Badge>
                      </div>
                      {table.status !== 'free' && (
                        <>
                          <p className="text-2xl font-bold mb-1">€{table.total.toFixed(2)}</p>
                          <p className="text-sm opacity-70">{table.items} articoli</p>
                        </>
                      )}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Receipt className="w-5 h-5 text-primary" />
                        Conto {table.name}
                      </DialogTitle>
                      <DialogDescription>
                        Gestisci il pagamento e la Fiamma Card
                      </DialogDescription>
                    </DialogHeader>

                    {isPaymentComplete ? (
                      <div className="py-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">Pagamento Completato!</h3>
                        <p className="text-muted-foreground">
                          Cashback caricato: €{cashback.toFixed(2)}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Order Items */}
                        <div className="bg-secondary rounded-xl p-4">
                          <h4 className="font-semibold mb-3">Riepilogo Ordine</h4>
                          <div className="space-y-2">
                            {tableItems.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span>
                                  {item.quantity}x {item.name}
                                </span>
                                <span className="font-medium">
                                  €{(item.quantity * item.price).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-border mt-3 pt-3">
                            <div className="flex justify-between font-bold">
                              <span>Subtotale</span>
                              <span>€{subtotal.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Fiamma Card Section */}
                        <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-primary" />
                            Fiamma Card
                          </h4>
                          <div className="flex gap-2 mb-3">
                            <Input
                              placeholder="Numero carta o telefono"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="flex-1"
                            />
                            <Button onClick={handleSearchCard} variant="outline">
                              <Search className="w-4 h-4" />
                            </Button>
                          </div>

                          {cardBalance && (
                            <div className="bg-card rounded-lg p-3 space-y-3">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">{cardBalance.holder}</p>
                                  <p className="text-sm text-muted-foreground">
                                    **** {cardBalance.number.slice(-4)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-muted-foreground">Saldo</p>
                                  <p className="text-xl font-bold text-primary">
                                    €{cardBalance.balance.toFixed(2)}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-sm">Usa credito (max €{cardBalance.balance.toFixed(2)})</Label>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setUseBalance(Math.max(0, useBalance - 5))}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <Input
                                    type="number"
                                    value={useBalance}
                                    onChange={(e) =>
                                      setUseBalance(
                                        Math.min(
                                          cardBalance.balance,
                                          Math.max(0, parseFloat(e.target.value) || 0)
                                        )
                                      )
                                    }
                                    className="text-center w-24"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      setUseBalance(Math.min(cardBalance.balance, useBalance + 5))
                                    }
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => setUseBalance(Math.min(cardBalance.balance, subtotal))}
                                  >
                                    Max
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Payment Summary */}
                        <div className="bg-foreground text-background rounded-xl p-4">
                          {useBalance > 0 && (
                            <div className="flex justify-between text-sm mb-2">
                              <span className="opacity-70">Credito usato</span>
                              <span>-€{useBalance.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-2xl font-bold mb-3">
                            <span>Totale da Pagare</span>
                            <span>€{finalTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-primary text-sm">
                            <Flame className="w-4 h-4" />
                            <span>Cashback che verrà caricato: €{cashback.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Payment Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            variant="outline"
                            onClick={handlePayment}
                            className="py-6"
                          >
                            <Euro className="w-5 h-5 mr-2" />
                            Contanti
                          </Button>
                          <Button
                            onClick={handlePayment}
                            className="py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            <CreditCard className="w-5 h-5 mr-2" />
                            Carta
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>

          {/* Takeaway Tab */}
          <TabsContent value="takeaway" className="space-y-4">
            <div className="grid gap-4">
              {mockTakeawayOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-card rounded-xl p-5 border border-border flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        order.status === 'ready'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-amber-100 text-amber-600'
                      }`}
                    >
                      {order.status === 'ready' ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Clock className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">#{order.id}</span>
                        <Badge
                          variant="secondary"
                          className={
                            order.status === 'ready'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-amber-100 text-amber-700'
                          }
                        >
                          {order.status === 'ready' ? 'Pronto' : 'In preparazione'}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        Ritiro: {order.time} | Tel: {order.phone}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">€{order.total.toFixed(2)}</p>
                    {order.status === 'ready' && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                            Paga
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Pagamento Ordine #{order.id}</DialogTitle>
                            <DialogDescription>
                              Cliente: {order.customer}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="bg-secondary rounded-xl p-4">
                              <div className="flex justify-between text-lg font-bold">
                                <span>Totale</span>
                                <span>€{order.total.toFixed(2)}</span>
                              </div>
                            </div>
                            <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-primary" />
                                Fiamma Card
                              </h4>
                              <div className="flex gap-2">
                                <Input placeholder="Numero carta" className="flex-1" />
                                <Button variant="outline">
                                  <Search className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <Button variant="outline" className="py-6">
                                <Euro className="w-5 h-5 mr-2" />
                                Contanti
                              </Button>
                              <Button className="py-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                                <CreditCard className="w-5 h-5 mr-2" />
                                Carta
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
