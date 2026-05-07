import Link from 'next/link'
import { Eye, BarChart2, Flag } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-lg w-full">
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h1 className="text-4xl font-bold text-gray-800">School Admin Platform</h1>
          <p className="text-gray-500 mt-3">
            Manage staff performance, classroom observations, and teacher goals.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-block w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
          >
            Go to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <Link href="/observations" className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition">
            <Eye size={28} className="text-red-600 mx-auto" />
            <p className="text-sm font-medium text-gray-700 mt-1">Observations</p>
          </Link>
          <Link href="/reviews" className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition">
            <BarChart2 size={28} className="text-red-600 mx-auto" />
            <p className="text-sm font-medium text-gray-700 mt-1">Reviews</p>
          </Link>
          <Link href="/goals" className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition">
            <Flag size={28} className="text-red-600 mx-auto" />
            <p className="text-sm font-medium text-gray-700 mt-1">Goals</p>
          </Link>
        </div>
      </div>
    </div>
  )
}