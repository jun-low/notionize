import { Button } from "@/components/ui/button"

import { Logo } from "./logo"

export const Footer = () => {
  return (
    <div className="flex items-center w-full py-6 px-24 bg-background bg-neutral-50 z-50 dark:bg-[#1F1F1F]">
      <Logo />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Terms & privacy
        </Button>
        <Button variant="ghost" size="sm">
          Status
        </Button>
      </div>
    </div>
  )
}