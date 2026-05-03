'use client'

import { useEffect, useState } from 'react'

export default function DashboardPage() { 
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => 
    {
        fetch('/api/dashboard')
            .then((res) => res.json())
            .then((d) => { setData(d); setLoading(false) })
    }, [])

    if (loading) return <div className="min-h-screen bg-gray-100 p-8 text-gray-500">Loading...</div>

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500 mt-2">School-wide performance overview</p>

                {/* Stat Cards */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <p className="text-sm text-gray-500">School Avg Engagement</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">{data.schoolAvg}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <p className="text-sm text-gray-500">Total Observations</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">{data.totalObservations}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <p className="text-sm text-gray-500">Total Teachers</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">{data.totalTeachers}</p>
                    </div>
                </div>

                {/* Top Performers */}
                <div className="mt-8 bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold text-gray-800">Top Performers</h2>
                    {data.top.length === 0 ? (
                        <p className="text-gray-400 mt-3 text-sm">No data yet.</p>
                    ) : (
                        <ul className="mt-3 space-y-2">
                            {data.top.map((t: any) => (
                                <li key={t.id} className="flex justify-between items-center text-sm text-gray-700">
                                    <span>{t.name} <span className="text-gray-400">· {t.subject}</span></span>
                                    <span className="font-semibold text-green-600">{t.avg.toFixed(1)}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Needs Attention */}
                <div className="mt-4 bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold text-gray-800">Needs Attention <span className="text-sm font-normal text-gray-400">(avg below 5)</span></h2>
                    {data.needsAttention.length === 0 ? (
                        <p className="text-gray-400 mt-3 text-sm">All teachers are performing well.</p>
                    ) : (
                        <ul className="mt-3 space-y-2">
                            {data.needsAttention.map((t: any) => (
                                <li key={t.id} className="flex justify-between items-center text-sm text-gray-700">
                                    <span>{t.name} <span className="text-gray-400">· {t.subject}</span></span>
                                    <span className="font-semibold text-red-500">{t.avg.toFixed(1)}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </div>
    )
}