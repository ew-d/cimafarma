"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { products, categories, type Product } from "@/lib/pos-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Download, Plus, Pencil, Trash2, Camera } from "lucide-react"

// Extended product data with cost
interface InventoryProduct extends Product {
  cost: number
}

const inventoryProducts: InventoryProduct[] = products.map((p) => ({
  ...p,
  cost: Math.round(p.price * 0.65 * 100) / 100, // Simulated cost at 65% of price
}))

export function Inventory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("todos")
  const [stockFilter, setStockFilter] = useState("todos")
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Filter products
  const filteredProducts = inventoryProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      categoryFilter === "todos" || product.category === categoryFilter

    let matchesStock = true
    if (stockFilter === "bajo") {
      matchesStock = product.stock > 0 && product.stock <= 5
    } else if (stockFilter === "agotado") {
      matchesStock = product.stock === 0
    }

    return matchesSearch && matchesCategory && matchesStock
  })

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return (
        <Badge variant="destructive" className="font-medium">
          {stock}
        </Badge>
      )
    }
    if (stock <= 5) {
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 font-medium">
          {stock}
        </Badge>
      )
    }
    return (
      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 font-medium">
        {stock}
      </Badge>
    )
  }

  return (
    <div className="flex-1 bg-slate-50 p-6">
      <Card className="h-full shadow-sm">
        <CardContent className="p-6 flex flex-col h-full">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            {/* Left side - Search and Filters */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Estado de Stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="bajo">Bajo Stock</SelectItem>
                  <SelectItem value="agotado">Agotado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Right side - Actions */}
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
              <Button className="gap-2" onClick={() => setIsSheetOpen(true)}>
                <Plus className="h-4 w-4" />
                Nuevo Producto
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Producto</TableHead>
                  <TableHead>SKU/Código</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className="text-right">Precio de Venta</TableHead>
                  <TableHead className="text-right">Costo</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-md">
                          <AvatarImage
                            src={product.image}
                            alt={product.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="rounded-md">
                            {product.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.sku}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal">
                        {categories.find((c) => c.id === product.category)?.name ||
                          product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      ${product.cost.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      {getStockBadge(product.stock)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 border-t mt-4">
            <p className="text-sm text-muted-foreground">
              Mostrando {startIndex + 1} a{" "}
              {Math.min(startIndex + itemsPerPage, filteredProducts.length)} de{" "}
              {filteredProducts.length} productos
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Product Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Nuevo Producto</SheetTitle>
            <SheetDescription>
              Agrega un nuevo producto al inventario
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="flex-1 -mx-4 px-4">
            <div className="space-y-6 py-6">
              {/* Image Upload Area */}
              <div className="flex justify-center">
                <div className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-primary/50 hover:bg-muted">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                  <span className="mt-2 text-xs text-muted-foreground">
                    Subir Imagen
                  </span>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre</label>
                  <Input placeholder="Nombre del producto" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">SKU</label>
                  <Input placeholder="Ej: BEB-001" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoría</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Precio de Compra</label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Precio de Venta</label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Stock Inicial</label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
            </div>
          </ScrollArea>
          <SheetFooter>
            <Button className="w-full" onClick={() => setIsSheetOpen(false)}>
              Guardar Producto
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
