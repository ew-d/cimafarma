"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Bell, Calendar, Clock } from "lucide-react"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-border bg-card px-6">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-2xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar producto por nombre, SKU o código de barras..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10 pl-10 bg-secondary/50 border-transparent focus:bg-background focus:border-input"
        />
      </div>

      {/* Date and Time */}
      <div className="hidden items-center gap-6 md:flex">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span className="text-sm capitalize">{formatDate(currentTime)}</span>
        </div>
        <div className="flex items-center gap-2 text-foreground font-medium">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-sm tabular-nums">{formatTime(currentTime)}</span>
        </div>
      </div>

      {/* Notifications */}
      <Button variant="ghost" size="icon" className="relative h-10 w-10">
        <Bell className="h-5 w-5 text-muted-foreground" />
        <Badge
          variant="destructive"
          className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center"
        >
          3
        </Badge>
      </Button>
    </header>
  )
}
