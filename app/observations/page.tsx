'use client'

import { useState } from 'react'

export default function ObservationsPage() 
{
    const [notes, setNotes] = useState('')
    const [engagement, setEngagement] = useState(3)
    const [successfulSubmit, setSuccessfulSubmit] = useState(false)

    const handleSubmit = async () => 
    {
        await fetch('/api/observations', 
        {
            method: 'POST',
            body: JSON.stringify({
                teacher_id: 1,
                scores: { engagement },
                notes,
            }),
        })
        setSuccessfulSubmit(true)

    }
    const onChangeNumber= (e: React.ChangeEvent<HTMLInputElement>) => 
    {
        const value = Number(e.target.value)

        if (value >= 0 && value <= 10) 
        {
            setEngagement(value)
        }
    }

    return (
        <div className="min-h-screen p-6">
        <h1 className="text-2xl text-center font-bold">New Observation</h1>

        <textarea
            className="w-full p-2 text-center border mt-4"
            placeholder="Notes..."
            onChange={(e) => setNotes(e.target.value)}
        />

        <h3 className = "text-center font-bold mt-4">Rating (0-10):</h3>

        <div className="text-center">
            <input
                type="number"
                className="mt-4 border p-2"
                value={engagement}
                onChange = {onChangeNumber}
            />

            <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-red-600 text-white rounded"
            >
                Submit
            </button>
        </div>

        {successfulSubmit && 
        (
            <p className="mt-4 text-green-600">
                Observation submitted successfully!
            </p>
        )}

        </div>
    )
}