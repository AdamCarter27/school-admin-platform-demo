'use client'

import { useState } from 'react'

export default function ReviewsPage() {
    const [teacherId, setTeacherId] = useState(1)
    const [review, setReview] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const generateReview = async () => 
    {
        setLoading(true)

        const res = await fetch('/api/reviews', 
        {
            method: 'POST',
            body: JSON.stringify({ teacher_id: teacherId })
        })

        const data = await res.json()
        setReview(data)
        
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto">
            
            {/* Header */}
            <h1 className="text-3xl font-bold text-gray-800">
            Teacher Performance Review
            </h1>
            <p className="text-gray-500 mt-2">
            Generate a summary based on classroom observations
            </p>

            {/* Controls Card */}
            <div className="mt-6 bg-white p-6 rounded-xl shadow">
            <label className="block text-sm font-medium text-gray-700">
                Select Teacher
            </label>

            <select
                className="mt-2 w-full border rounded-lg p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) => setTeacherId(Number(e.target.value))}
            >
                <option value={1}>Teacher 1</option>
                <option value={2}>Teacher 2</option>
            </select>

            <button
                onClick={generateReview}
                className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
                Generate Review
            </button>
            </div>

            {loading && (
            <div className="mt-6 p-4 bg-gray-100 text-yellow-800 rounded-lg">
                Generating review...
            </div>
            )}

            {/* Results Card */}
            {review && (
            <div className="mt-6 bg-white p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold text-gray-800">
                Summary
                </h2>

                <p className="mt-3 text-gray-600">
                {review.summary}
                </p>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">
                    Average Engagement
                </p>
                <p className="text-2xl font-bold text-gray-800">
                    {review.avg_engagement}
                </p>
                </div>
            </div>
            )}
        </div>
        </div>
    )
    }