"use client"

import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/posts",
    label: "Posts",
  },
]

const Header = () => {
  const pathname = usePathname()

  return (
    <header className="flex justify-between items-center py-4 px-8 boreder-b">
      <Link href="/">
        <Image src="/vercel.svg" alt="Logo" width="100" height="35" className="w-[100px] h-[35px]"  />
      </Link>
      <nav>
        <ul className="flex gap-x-5 text-sm">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-zinc-400 ${
                  pathname === link.href ? "text-zinc-900" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header