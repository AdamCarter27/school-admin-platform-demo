'use client'

import { useEffect, useState } from 'react'

const STATUS_STYLES: Record<string, string> = 
{
    pending: 'bg-gray-100 text-gray-600',
    in_progress: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-green-100 text-green-700',
}

const STATUS_LABELS: Record<string, string> = 
{
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
}

export default function GoalsPage() {
    const [teachers, setTeachers] = useState<any[]>([])
    const [teacherId, setTeacherId] = useState<number | null>(null)
    const [goals, setGoals] = useState<any[]>([])
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => 
    {
        fetch('/api/teachers')
            .then((res) => res.json())
            .then((data) => {
                setTeachers(data)
                if (data.length > 0) setTeacherId(data[0].id)
            })
    }, [])

    useEffect(() => 
    {
        if (!teacherId) return
        setLoading(true)
        fetch(`/api/goals?teacher_id=${teacherId}`)
            .then((res) => res.json())
            .then((data) => { setGoals(data); setLoading(false) })
    }, [teacherId])

    const handleAdd = async () => 
    {
        if (!description.trim() || !teacherId) return

        const res = await fetch('/api/goals', 
        {
            method: 'POST',
            body: JSON.stringify({ teacher_id: teacherId, description }),
        })
        const newGoal = await res.json()
        setGoals([newGoal, ...goals])
        setDescription('')
    }

    const handleStatusChange = async (id: number, status: string) => 
    {
        await fetch(`/api/goals/${id}`, 
        {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        })
        setGoals(goals.map((g) => g.id === id ? { ...g, status } : g))
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-800">Goals</h1>
                <p className="text-gray-500 mt-1">Set and track improvement goals per teacher</p>

                {/* Teacher selector */}
                <div className="mt-6 bg-white p-6 rounded-xl shadow">
                    <label className="block text-sm font-medium text-gray-700">Select Teacher</label>
                    <select
                        className="mt-2 w-full border rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onChange={(e) => setTeacherId(Number(e.target.value))}
                    >
                        {teachers.map((t) => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>
                </div>

                {/* Add goal */}
                <div className="mt-4 bg-white p-6 rounded-xl shadow">
                    <label className="block text-sm font-medium text-gray-700">New Goal</label>
                    <textarea
                        className="mt-2 w-full border rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none h-24"
                        placeholder="e.g. Increase engagement to 7.0 by using more group activities"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button
                        onClick={handleAdd}
                        className="mt-3 w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
                    >
                        Add Goal
                    </button>
                </div>

                {/* Goals list */}
                <div className="mt-4 space-y-3">
                    {loading && <p className="text-gray-500 text-sm">Loading goals...</p>}
                    {!loading && goals.length === 0 && (
                        <p className="text-gray-400 text-sm">No goals yet for this teacher.</p>
                    )}
                    {goals.map((goal) => (
                        <div key={goal.id} className="bg-white p-5 rounded-xl shadow">
                            <p className="text-gray-800">{goal.description}</p>
                            <div className="mt-3 flex items-center gap-2">
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_STYLES[goal.status]}`}>
                                    {STATUS_LABELS[goal.status]}
                                </span>
                                <select
                                    className="ml-auto text-sm border rounded-lg p-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    value={goal.status}
                                    onChange={(e) => handleStatusChange(goal.id, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}