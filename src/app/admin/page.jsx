'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  Settings,
  TrendingUp,
  Euro,
  ShoppingBag,
  UtensilsCrossed,
  LogOut,
  User,
  Check,
  X,
  Clock,
  Flame,
  AlertCircle,
  Edit,
  Trash2,
  Plus,
} from 'lucide-react'

// Mock data
const mockStats = {
  todayRevenue: 1245.50,
  todayOrders: 47,
  avgTicket: 26.50,
  tableReservations: 12,
  takeawayOrders: 18,
  activeTables: 6,
}

const mockReservations = [
  { id: 1, name: 'Mario Rossi', phone: '333 1234567', date: '2024-01-15', time: '20:00', guests: 4, status: 'confirmed' },
  { id: 2, name: 'Anna Bianchi', phone: '339 7654321', date: '2024-01-15', time: '20:30', guests: 2, status: 'pending' },
  { id: 3, name: 'Luca Verdi', phone: '340 1111222', date: '2024-01-15', time: '21:00', guests: 6, status: 'confirmed' },
  { id: 4, name: 'Sara Neri', phone: '347 3333444', date: '2024-01-15', time: '21:30', guests: 3, status: 'pending' },
  { id: 5, name: 'Paolo Gialli', phone: '348 5555666', date: '2024-01-16', time: '19:30', guests: 5, status: 'pending' },
]

const mockCards = [
  { id: 1, number: '****4582', holder: 'Mario Rossi', balance: 24.50, totalSpent: 450.00, visits: 18 },
  { id: 2, number: '****7891', holder: 'Anna Bianchi', balance: 12.30, totalSpent: 280.00, visits: 12 },
  { id: 3, number: '****2345', holder: 'Luca Verdi', balance: 45.80, totalSpent: 890.00, visits: 35 },
  { id: 4, number: '****6789', holder: 'Sara Neri', balance: 8.90, totalSpent: 150.00, visits: 6 },
  { id: 5, number: '****1234', holder: 'Paolo Gialli', balance: 67.20, totalSpent: 1200.00, visits: 48 },
]

const mockTakeawayOrders = [
  { id: 'A001', customer: 'Cliente Web', time: '19:30', total: 28.50, items: 3, status: 'preparing' },
  { id: 'A002', customer: 'Cliente Web', time: '19:45', total: 42.00, items: 4, status: 'ready' },
  { id: 'A003', customer: 'Cliente Web', time: '20:00', total: 35.50, items: 2, status: 'preparing' },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [maxTableReservations, setMaxTableReservations] = useState('20')
  const [maxTakeawayOrders, setMaxTakeawayOrders] = useState('15')
  const [takeawayEnabled, setTakeawayEnabled] = useState(true)
  const [reservationsEnabled, setReservationsEnabled] = useState(true)

  const handleConfirmReservation = (id) => {
    // In real app, this would update the database
    console.log('Confirming reservation:', id)
  }

  const handleCancelReservation = (id) => {
    // In real app, this would update the database
    console.log('Cancelling reservation:', id)
  }

  return (
    <div className="min-h-screen bg-secondary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden lg:block">
        <div className="p-6 border-b border-border">
          <span
            className="text-2xl font-bold text-primary"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            La Fiamma
          </span>
          <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
            Admin
          </Badge>
        </div>

        <nav className="p-4 space-y-1">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'reservations', icon: Calendar, label: 'Prenotazioni' },
            { id: 'takeaway', icon: ShoppingBag, label: 'Asporto' },
            { id: 'cards', icon: CreditCard, label: 'Fiamma Cards' },
            { id: 'settings', icon: Settings, label: 'Impostazioni' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-border bg-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">Admin</p>
              <p className="text-xs text-muted-foreground">Proprietario</p>
            </div>
          </div>
          <Link href="/">
            <Button variant="outline" className="w-full" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Esci
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <header className="lg:hidden bg-card border-b border-border sticky top-0 z-50">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xl font-bold text-primary"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                La Fiamma Admin
              </span>
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <LogOut className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                { id: 'reservations', icon: Calendar, label: 'Prenotazioni' },
                { id: 'takeaway', icon: ShoppingBag, label: 'Asporto' },
                { id: 'cards', icon: CreditCard, label: 'Cards' },
                { id: 'settings', icon: Settings, label: 'Impostazioni' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Euro className="w-4 h-4" />
                      <span className="text-xs">Incasso Oggi</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      €{mockStats.todayRevenue.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <ShoppingBag className="w-4 h-4" />
                      <span className="text-xs">Ordini Oggi</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{mockStats.todayOrders}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs">Scontrino Medio</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      €{mockStats.avgTicket.toFixed(2)}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs">Prenotazioni</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      {mockStats.tableReservations}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <ShoppingBag className="w-4 h-4" />
                      <span className="text-xs">Asporto</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      {mockStats.takeawayOrders}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <UtensilsCrossed className="w-4 h-4" />
                      <span className="text-xs">Tavoli Attivi</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{mockStats.activeTables}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Prenotazioni in Attesa
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockReservations
                        .filter((r) => r.status === 'pending')
                        .slice(0, 3)
                        .map((res) => (
                          <div
                            key={res.id}
                            className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{res.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {res.date} alle {res.time} | {res.guests} ospiti
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 text-green-600"
                                onClick={() => handleConfirmReservation(res.id)}
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 text-destructive"
                                onClick={() => handleCancelReservation(res.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-primary" />
                      Ordini Asporto Attivi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockTakeawayOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                order.status === 'ready'
                                  ? 'bg-green-100 text-green-600'
                                  : 'bg-amber-100 text-amber-600'
                              }`}
                            >
                              {order.status === 'ready' ? (
                                <Check className="w-5 h-5" />
                              ) : (
                                <Clock className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">#{order.id}</p>
                              <p className="text-sm text-muted-foreground">
                                Ritiro: {order.time} | {order.items} articoli
                              </p>
                            </div>
                          </div>
                          <p className="font-bold text-primary">€{order.total.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Reservations Tab */}
          {activeTab === 'reservations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">Prenotazioni Tavoli</h1>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Ora</TableHead>
                        <TableHead>Ospiti</TableHead>
                        <TableHead>Stato</TableHead>
                        <TableHead className="text-right">Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockReservations.map((res) => (
                        <TableRow key={res.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{res.name}</p>
                              <p className="text-sm text-muted-foreground">{res.phone}</p>
                            </div>
                          </TableCell>
                          <TableCell>{res.date}</TableCell>
                          <TableCell>{res.time}</TableCell>
                          <TableCell>{res.guests}</TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={
                                res.status === 'confirmed'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-amber-100 text-amber-700'
                              }
                            >
                              {res.status === 'confirmed' ? 'Confermata' : 'In Attesa'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {res.status === 'pending' && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 w-8 p-0 text-green-600"
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 w-8 p-0 text-destructive"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                              {res.status === 'confirmed' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Takeaway Tab */}
          {activeTab === 'takeaway' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-foreground">Ordini Asporto</h1>

              <div className="grid gap-4">
                {mockTakeawayOrders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              order.status === 'ready'
                                ? 'bg-green-100 text-green-600'
                                : 'bg-amber-100 text-amber-600'
                            }`}
                          >
                            {order.status === 'ready' ? (
                              <Check className="w-6 h-6" />
                            ) : (
                              <Clock className="w-6 h-6" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold">#{order.id}</p>
                              <Badge
                                variant="secondary"
                                className={
                                  order.status === 'ready'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-amber-100 text-amber-700'
                                }
                              >
                                {order.status === 'ready' ? 'Pronto' : 'In Preparazione'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Ritiro: {order.time} | {order.items} articoli
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            €{order.total.toFixed(2)}
                          </p>
                          {order.status === 'preparing' && (
                            <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700 text-white">
                              Segna Pronto
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Cards Tab */}
          {activeTab === 'cards' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">Fiamma Cards</h1>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Plus className="w-4 h-4 mr-2" />
                      Nuova Carta
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crea Nuova Fiamma Card</DialogTitle>
                      <DialogDescription>
                        Inserisci i dati del cliente per creare una nuova carta fedeltà
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Nome e Cognome</Label>
                        <Input placeholder="Mario Rossi" />
                      </div>
                      <div className="space-y-2">
                        <Label>Telefono</Label>
                        <Input placeholder="+39 333 123 4567" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email (opzionale)</Label>
                        <Input placeholder="mario@email.com" />
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Crea Carta
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Carta</TableHead>
                        <TableHead>Titolare</TableHead>
                        <TableHead>Saldo</TableHead>
                        <TableHead>Totale Speso</TableHead>
                        <TableHead>Visite</TableHead>
                        <TableHead className="text-right">Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCards.map((card) => (
                        <TableRow key={card.id}>
                          <TableCell className="font-mono">{card.number}</TableCell>
                          <TableCell className="font-medium">{card.holder}</TableCell>
                          <TableCell>
                            <span className="text-primary font-bold">
                              €{card.balance.toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell>€{card.totalSpent.toFixed(2)}</TableCell>
                          <TableCell>{card.visits}</TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-foreground">Impostazioni</h1>

              <div className="grid gap-6 max-w-2xl">
                {/* Reservations Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Prenotazioni Tavoli
                    </CardTitle>
                    <CardDescription>
                      Gestisci le impostazioni per le prenotazioni dei tavoli
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Abilita Prenotazioni Online</Label>
                        <p className="text-sm text-muted-foreground">
                          Permetti ai clienti di prenotare dal sito
                        </p>
                      </div>
                      <Switch
                        checked={reservationsEnabled}
                        onCheckedChange={setReservationsEnabled}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Massimo Prenotazioni per Giorno</Label>
                      <Select value={maxTableReservations} onValueChange={setMaxTableReservations}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {['10', '15', '20', '25', '30', '40', '50'].map((num) => (
                            <SelectItem key={num} value={num}>
                              {num} prenotazioni
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Takeaway Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-primary" />
                      Ordini Asporto
                    </CardTitle>
                    <CardDescription>
                      Gestisci le impostazioni per gli ordini da asporto
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Abilita Ordini Asporto Online</Label>
                        <p className="text-sm text-muted-foreground">
                          Permetti ai clienti di ordinare dal sito
                        </p>
                      </div>
                      <Switch
                        checked={takeawayEnabled}
                        onCheckedChange={setTakeawayEnabled}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Massimo Ordini per Fascia Oraria</Label>
                      <Select value={maxTakeawayOrders} onValueChange={setMaxTakeawayOrders}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {['5', '10', '15', '20', '25', '30'].map((num) => (
                            <SelectItem key={num} value={num}>
                              {num} ordini
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Cashback Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-primary" />
                      Fiamma Card - Cashback
                    </CardTitle>
                    <CardDescription>
                      Impostazioni del programma fedeltà
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">Cashback Attivo: 10%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        I clienti ricevono il 10% del totale speso come credito sulla loro Fiamma Card.
                        Il credito può essere utilizzato per pagare i prossimi ordini.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
