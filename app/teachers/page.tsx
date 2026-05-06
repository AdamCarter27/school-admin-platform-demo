'use client'

import { useEffect, useState } from 'react'
import {  useRouter } from 'next/navigation'

export default function TeachersPage() {
    const [teachers, setTeachers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        fetch('/api/teachers')
            .then((res) => res.json())
            .then((data) => {
                setTeachers(data)
                setLoading(false)
            })
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800">Teachers</h1>
                <p className="text-gray-500 mt-2">Manage and review staff performance</p>

                {loading ? (
                    <p className="mt-6 text-gray-500">Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {teachers.map((t) => (
                            <div key={t.id} className="bg-white p-6 rounded-xl shadow">
                                <h2 className="text-lg font-semibold text-gray-800">{t.name}</h2>
                                <p className="text-gray-500 mt-1">{t.subject}</p>
                                <div className="mt-4 text-sm text-gray-600">
                                    <p>Avg Engagement: {t.avg}</p>
                                    <p>Observations: {t.observations}</p>
                                </div>
                                <button
                                    onClick={() => router.push(`/teachers/${t.id}`)}
                                    className="mt-4 text-blue-600 font-medium"
                                >
                                    View Details →
                                </button>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}