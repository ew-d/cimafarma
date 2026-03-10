"use client"

import { useState } from "react"
import { Sidebar } from "@/components/pos/sidebar"
import { Header } from "@/components/pos/header"
import { Inventory } from "@/components/pos/inventory"

export default function InventarioPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeItem="Inventario"
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <Inventory />
      </div>
    </div>
  )
}
