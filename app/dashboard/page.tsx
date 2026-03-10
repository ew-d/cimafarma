"use client"

import { useState } from "react"
import { Sidebar } from "@/components/pos/sidebar"
import { Header } from "@/components/pos/header"
import { Dashboard } from "@/components/pos/dashboard"

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeItem="Panel de Control"
      />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />
        
        <main className="flex-1 overflow-auto">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}
