'use client'

import { useState } from 'react'

export default function ObservationsPage() {
  const [notes, setNotes] = useState('')
  const [engagement, setEngagement] = useState(3)

  const handleSubmit = async () => {
    await fetch('/api/observations', {
      method: 'POST',
      body: JSON.stringify({
        teacher_id: 1,
        scores: { engagement },
        notes,
      }),
    })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">New Observation</h1>

      <textarea
        className="w-full p-2 border mt-4"
        placeholder="Notes..."
        onChange={(e) => setNotes(e.target.value)}
      />

      <input
        type="number"
        className="mt-4 border p-2"
        value={engagement}
        onChange={(e) => setEngagement(Number(e.target.value))}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Submit
      </button>
    </div>
  )
}