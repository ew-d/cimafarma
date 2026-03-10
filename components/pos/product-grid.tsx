"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"
import type { Product, Category } from "@/lib/pos-data"

interface ProductGridProps {
  products: Product[]
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  onAddToCart: (product: Product) => void
}

export function ProductGrid({
  products,
  categories,
  selectedCategory,
  onCategoryChange,
  onAddToCart,
}: ProductGridProps) {
  return (
    <div className="flex flex-col gap-4 h-full overflow-hidden">
      {/* Category Filters */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "rounded-full px-4 shrink-0 transition-all",
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card hover:bg-accent"
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Product Grid */}
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-2 gap-4 pb-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => onAddToCart(product)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

interface ProductCardProps {
  product: Product
  onAddToCart: () => void
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isLowStock = product.stock < 5

  return (
    <Card
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-primary/30",
        "py-0"
      )}
      onClick={onAddToCart}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Stock Badge */}
          <Badge
            variant={isLowStock ? "destructive" : "secondary"}
            className={cn(
              "absolute right-2 top-2 text-[10px] font-medium",
              isLowStock
                ? "bg-destructive text-destructive-foreground"
                : "bg-background/90 text-foreground backdrop-blur-sm"
            )}
          >
            Stock: {product.stock}
          </Badge>
          {/* Add to cart overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-primary/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
              <Plus className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3">
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-tight mb-1">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-2">{product.sku}</p>
          <p className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
