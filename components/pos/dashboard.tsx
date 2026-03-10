"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DollarSign,
  Receipt,
  Users,
  AlertTriangle,
  TrendingUp,
  CreditCard,
  Banknote,
  Package,
} from "lucide-react"
import { products } from "@/lib/pos-data"

// Dashboard data
const kpis = {
  dailySales: 1250.0,
  transactions: 45,
  avgTransaction: 27.78,
  newCustomers: 12,
  criticalProducts: products.filter((p) => p.stock < 5).length,
}

const weeklySales = [
  { day: "Lun", amount: 850 },
  { day: "Mar", amount: 1120 },
  { day: "Mié", amount: 980 },
  { day: "Jue", amount: 1450 },
  { day: "Vie", amount: 1680 },
  { day: "Sáb", amount: 2100 },
  { day: "Dom", amount: 1250 },
]

const topProducts = [
  { name: "Coca-Cola 500ml", sold: 85, percentage: 100 },
  { name: "Agua Mineral 1L", sold: 72, percentage: 85 },
  { name: "Pan de Caja", sold: 58, percentage: 68 },
  { name: "Doritos Nacho", sold: 45, percentage: 53 },
  { name: "Leche Entera 1L", sold: 38, percentage: 45 },
]

const recentTransactions = [
  { id: "#00689", time: "14:32", customer: "Juan Pérez", method: "card", total: 145.50 },
  { id: "#00688", time: "14:15", customer: "Público General", method: "cash", total: 28.00 },
  { id: "#00687", time: "13:58", customer: "María García", method: "card", total: 89.00 },
  { id: "#00686", time: "13:42", customer: "Público General", method: "cash", total: 52.50 },
  { id: "#00685", time: "13:20", customer: "Ana López", method: "transfer", total: 210.00 },
]

const lowStockProducts = products.filter((p) => p.stock < 5)

const maxSale = Math.max(...weeklySales.map((s) => s.amount))

export function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-secondary/30 min-h-full">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Daily Sales */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ventas del Día
            </CardTitle>
            <div className="rounded-full bg-primary/10 p-2">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${kpis.dailySales.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</div>
            <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">
              <TrendingUp className="mr-1 h-3 w-3" />
              +8% vs ayer
            </Badge>
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Transacciones
            </CardTitle>
            <div className="rounded-full bg-primary/10 p-2">
              <Receipt className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.transactions}</div>
            <Badge variant="secondary" className="mt-2">
              Promedio: ${kpis.avgTransaction.toFixed(2)}
            </Badge>
          </CardContent>
        </Card>

        {/* New Customers */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Nuevos Clientes
            </CardTitle>
            <div className="rounded-full bg-primary/10 p-2">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.newCustomers}</div>
            <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">
              +2
            </Badge>
          </CardContent>
        </Card>

        {/* Critical Products */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Productos Críticos
            </CardTitle>
            <div className="rounded-full bg-destructive/10 p-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{kpis.criticalProducts}</div>
            <p className="mt-2 text-xs text-muted-foreground">Stock bajo mínimo</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Weekly Sales Chart */}
        <Card className="shadow-sm lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Ventas de los últimos 7 días</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-end gap-2">
              {weeklySales.map((day) => (
                <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    ${day.amount}
                  </span>
                  <div
                    className="w-full rounded-t-md bg-primary transition-all hover:bg-primary/80"
                    style={{ height: `${(day.amount / maxSale) * 180}px` }}
                  />
                  <span className="text-xs font-medium text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Top 5 Productos más Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                        {index + 1}
                      </span>
                      {product.name}
                    </span>
                    <span className="text-muted-foreground">{product.sold} uds</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${product.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Recent Transactions */}
        <Card className="shadow-sm lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Últimas Transacciones</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Venta</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium text-primary">{tx.id}</TableCell>
                    <TableCell className="text-muted-foreground">{tx.time}</TableCell>
                    <TableCell>{tx.customer}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {tx.method === "card" && <CreditCard className="h-4 w-4 text-primary" />}
                        {tx.method === "cash" && <Banknote className="h-4 w-4 text-green-600" />}
                        {tx.method === "transfer" && <Receipt className="h-4 w-4 text-orange-500" />}
                        <span className="text-sm capitalize">
                          {tx.method === "card" ? "Tarjeta" : tx.method === "cash" ? "Efectivo" : "Transferencia"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${tx.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Alertas de Inventario</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[280px] pr-4">
              <div className="space-y-4">
                {lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                        <Package className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.sku}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive" className="font-medium">
                        Stock: {product.stock}
                      </Badge>
                      <Button size="sm" variant="outline" className="h-8 text-xs">
                        Reabastecer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
