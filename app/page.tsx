"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/pos/sidebar"
import { Header } from "@/components/pos/header"
import { ProductGrid } from "@/components/pos/product-grid"
import { Cart } from "@/components/pos/cart"
import { products, categories, type Product, type CartItem } from "@/lib/pos-data"

export default function POSPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "todos" || product.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode.includes(searchQuery)
    return matchesCategory && matchesSearch
  })

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }

  const clearCart = () => {
    setCartItems([])
    setSelectedCustomer(null)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />
        
        <main className="flex flex-1 gap-6 overflow-hidden p-6">
          <div className="flex flex-1 flex-col gap-4 overflow-hidden lg:basis-[70%]">
            <ProductGrid
              products={filteredProducts}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onAddToCart={addToCart}
            />
          </div>
          
          <div className="hidden w-full lg:block lg:basis-[30%] lg:max-w-md">
            <Cart
              items={cartItems}
              selectedCustomer={selectedCustomer}
              onSelectCustomer={setSelectedCustomer}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onClearCart={clearCart}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
