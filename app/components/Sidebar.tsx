"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Users } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Appointments", href: "/appointments", icon: Calendar },
  { name: "Doctors", href: "/doctors", icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col space-y-2 p-4">
      {navItems.map((item) => (
        <Button
          key={item.name}
          asChild
          variant={pathname === item.href ? "secondary" : "ghost"}
          className="w-full justify-start"
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Link>
        </Button>
      ))}
    </nav>
  )
}

