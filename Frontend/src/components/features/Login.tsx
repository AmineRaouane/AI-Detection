import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/ui/login-form"

export function Login() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-inherit md:p-10 py-24 px-4 max-w-7xl mx-auto">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}
//<div className="py-24 px-4 max-w-7xl mx-auto">