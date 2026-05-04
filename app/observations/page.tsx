'use client'
import { useState } from 'react'

export default function ObservationsPage() {
    const [notes, setNotes] = useState('')
    const [engagement, setEngagement] = useState(3)
    const [successfulSubmit, setSuccessfulSubmit] = useState(false)

    const handleSubmit = async () => {
        await fetch('/api/observations', {
            method: 'POST',
            body: JSON.stringify({
                teacher_id: 1,
                scores: { engagement },
                notes,
            }),
        })
        setSuccessfulSubmit(true)
    }

    const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if (value >= 0 && value <= 10) {
            setEngagement(value)
        }
    }

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-900">New Observation</h1>
                <p className="text-gray-500 mt-1">Record classroom notes and engagement</p>

                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none h-36"
                        placeholder="What did you observe in the classroom today?"
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Engagement Rating: <span className="text-red-600 font-bold">{engagement}</span> / 10
                    </label>
                    <input
                        type="range"
                        min={0}
                        max={10}
                        value={engagement}
                        onChange={onChangeNumber}
                        className="w-full accent-red-600"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>0</span>
                        <span>5</span>
                        <span>10</span>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="mt-8 w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
                >
                    Submit Observation
                </button>

                {successfulSubmit && (
                    <p className="mt-4 text-center text-green-600 font-medium">
                        Observation submitted successfully!
                    </p>
                )}

            </div>
        </div>
    )
}