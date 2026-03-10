"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  User,
  UserPlus,
  Minus,
  Plus,
  Trash2,
  CreditCard,
  Banknote,
  Building,
  Check,
  Receipt,
} from "lucide-react"
import type { CartItem } from "@/lib/pos-data"
import { customers } from "@/lib/pos-data"

interface CartProps {
  items: CartItem[]
  selectedCustomer: string | null
  onSelectCustomer: (customerId: string | null) => void
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onClearCart: () => void
}

export function Cart({
  items,
  selectedCustomer,
  onSelectCustomer,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartProps) {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [showDiscount, setShowDiscount] = useState(false)
  const [discountCode, setDiscountCode] = useState("")

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  const taxRate = 0.16 // 16% IVA
  const taxes = subtotal * taxRate
  const discount = 0 // For now, no discount applied
  const total = subtotal + taxes - discount

  const handlePayment = () => {
    if (items.length === 0) return
    alert(`Procesando pago de $${total.toFixed(2)} MXN vía ${paymentMethod || "Efectivo"}`)
    onClearCart()
    setPaymentMethod(null)
  }

  return (
    <Card className="flex h-full flex-col rounded-2xl shadow-lg border-0 bg-card py-0">
      {/* Header with Customer Selection */}
      <CardHeader className="border-b py-4 px-4">
        <div className="flex items-center justify-between mb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Receipt className="h-5 w-5 text-primary" />
            Ticket de Venta
          </CardTitle>
          <span className="text-xs text-muted-foreground">#{Math.floor(Math.random() * 10000).toString().padStart(5, "0")}</span>
        </div>
        <div className="flex gap-2">
          <Select value={selectedCustomer || ""} onValueChange={(v) => onSelectCustomer(v || null)}>
            <SelectTrigger className="flex-1 bg-secondary/50 border-transparent">
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Seleccionar cliente" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id}>
                  {customer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="shrink-0">
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Cart Items */}
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-3">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Receipt className="h-12 w-12 mb-3 opacity-30" />
                <p className="text-sm">El carrito está vacío</p>
                <p className="text-xs">Agrega productos para comenzar</p>
              </div>
            ) : (
              items.map((item) => (
                <CartItemRow
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={() => onRemoveItem(item.product.id)}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>

      {/* Summary and Payment */}
      <div className="border-t bg-muted/30 p-4 space-y-4">
        {/* Discount Code */}
        {showDiscount ? (
          <div className="flex gap-2">
            <Input
              placeholder="Código de descuento"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="flex-1 h-8 text-sm"
            />
            <Button size="sm" variant="secondary" className="h-8">
              Aplicar
            </Button>
          </div>
        ) : (
          <button
            onClick={() => setShowDiscount(true)}
            className="text-xs text-primary hover:underline"
          >
            ¿Tienes un código de descuento?
          </button>
        )}

        {/* Financial Summary */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>IVA (16%)</span>
            <span>${taxes.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-primary">
              <span>Descuento</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between text-xl font-bold text-foreground">
            <span>Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-3 gap-2">
          <PaymentButton
            icon={Banknote}
            label="Efectivo"
            selected={paymentMethod === "efectivo"}
            onClick={() => setPaymentMethod("efectivo")}
          />
          <PaymentButton
            icon={CreditCard}
            label="Tarjeta"
            selected={paymentMethod === "tarjeta"}
            onClick={() => setPaymentMethod("tarjeta")}
          />
          <PaymentButton
            icon={Building}
            label="Transferencia"
            selected={paymentMethod === "transferencia"}
            onClick={() => setPaymentMethod("transferencia")}
          />
        </div>

        {/* Main Action Button */}
        <Button
          className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg bg-primary hover:bg-primary/90"
          disabled={items.length === 0}
          onClick={handlePayment}
        >
          <Check className="mr-2 h-5 w-5" />
          Cobrar ${total.toFixed(2)}
        </Button>
      </div>
    </Card>
  )
}

interface CartItemRowProps {
  item: CartItem
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: () => void
}

function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  const lineTotal = item.product.price * item.quantity

  return (
    <div className="group flex items-start gap-3 rounded-xl bg-background p-3 transition-all hover:shadow-sm">
      {/* Product Image */}
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground truncate">
          {item.product.name}
        </h4>
        <p className="text-xs text-muted-foreground">
          ${item.product.price.toFixed(2)} c/u
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) =>
            onUpdateQuantity(item.product.id, parseInt(e.target.value) || 1)
          }
          className="h-7 w-10 text-center text-sm px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Line Total & Remove */}
      <div className="flex flex-col items-end gap-1">
        <span className="text-sm font-semibold text-foreground">
          ${lineTotal.toFixed(2)}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={onRemove}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}

interface PaymentButtonProps {
  icon: React.ElementType
  label: string
  selected: boolean
  onClick: () => void
}

function PaymentButton({ icon: Icon, label, selected, onClick }: PaymentButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "flex flex-col h-auto py-3 gap-1 transition-all",
        selected && "border-primary bg-primary/10 text-primary"
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs">{label}</span>
    </Button>
  )
}
