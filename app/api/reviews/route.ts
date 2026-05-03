import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: Request) {
  const { teacher_id } = await req.json()

  // Get observations
  const { data: observations, error } = await supabaseAdmin
    .from('observations')
    .select('*')
    .eq('teacher_id', teacher_id)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  if (!observations || observations.length === 0) {
    return Response.json({
      summary: "No observations available.",
      avg_engagement: 0,
    })
  }

  // Compute average
  const avg =
    observations.reduce(
      (sum, o) => sum + o.engagement_score,
      0
    ) / observations.length

  // Simple summary (add gpt summary later)
  let summary = ""

  if (avg >= 8) {
    summary = "Strong classroom engagement observed."
  } else if (avg >= 5) {
    summary = "Moderate engagement, room for improvement."
  } else {
    summary = "Low engagement, needs attention."
  }

  return Response.json({
    avg_engagement: avg.toFixed(2),
    summary,
  })
}