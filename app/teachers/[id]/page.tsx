'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

const STATUS_STYLES: Record<string, string> = {
    pending: 'bg-gray-100 text-gray-600',
    in_progress: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-green-100 text-green-700',
}

const STATUS_LABELS: Record<string, string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
}

export default function TeacherDetailPage() {
    const { id } = useParams()
    const router = useRouter()
    const [teacher, setTeacher] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => 
    {
        fetch(`/api/teachers/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setTeacher(data)
                setLoading(false)
            })
    }, [id])
    if (loading) return <div className="min-h-screen bg-gray-100 p-8 text-gray-500">Loading...</div>

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto">

                {/* Back */}
                <button
                    onClick={() => router.push('/teachers')}
                    className="text-sm text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-1"
                >
                    ← Back to Teachers
                </button>

                {/* Header */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h1 className="text-3xl font-bold text-gray-800">{teacher.name}</h1>
                    <p className="text-gray-500 mt-1">{teacher.subject}</p>
                    <div className="mt-4 flex gap-6 text-sm text-gray-600">
                        <div>
                            <p className="text-gray-400">Avg Engagement</p>
                            <p className="text-2xl font-bold text-gray-800">{teacher.avg}</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Total Observations</p>
                            <p className="text-2xl font-bold text-gray-800">{teacher.observations.length}</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Goals</p>
                            <p className="text-2xl font-bold text-gray-800">{teacher.goals.length}</p>
                        </div>
                    </div>
                </div>

                {/* Observations */}
                <div className="mt-6 bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold text-gray-800">Observations</h2>
                    {teacher.observations.length === 0 
                    ? (
                        <p className="text-gray-400 text-sm mt-3">No observations yet.</p>
                    ) 

                    : (
                        <ul className="mt-3 space-y-3">
                            {teacher.observations.map((o: any) => (
                                <li key={o.id} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">
                                            {new Date(o.created_at).toLocaleDateString()}
                                        </span>
                                        <span className="font-semibold text-gray-800">
                                            {o.engagement_score}/10
                                        </span>
                                    </div>
                                    {o.notes && (
                                        <p className="mt-2 text-sm text-gray-600">{o.notes}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Goals */}
                <div className="mt-4 bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold text-gray-800">Goals</h2>
                    {teacher.goals.length === 0 ? (
                        <p className="text-gray-400 text-sm mt-3">No goals set yet.</p>
                    ) : (
                        <ul className="mt-3 space-y-3">
                            {teacher.goals.map((g: any) => (
                                <li key={g.id} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                                    <p className="text-sm text-gray-700">{g.description}</p>
                                    <span className={`ml-4 shrink-0 text-xs font-medium px-2 py-1 rounded-full ${STATUS_STYLES[g.status]}`}>
                                        {STATUS_LABELS[g.status]}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </div>
    )
}