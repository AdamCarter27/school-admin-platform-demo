'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/teachers', label: 'Teachers' },
    { href: '/observations', label: 'Observations' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/goals', label: 'Goals' },
]

export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="bg-white border-b border-gray-200 px-8 py-4">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
                <span className="text-lg font-bold text-red-600 tracking-tight">
                    School Administration Demo 
                </span>
                <div className="flex gap-1">
                    {links.map((link) => {
                        const active = pathname === link.href
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    active
                                        ? 'bg-red-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}