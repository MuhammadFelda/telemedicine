import { ModeToggle } from "./ModeToggle"

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background border-b">
      <h1 className="text-2xl font-bold">Telemedicine</h1>
      <ModeToggle />
    </header>
  )
}

