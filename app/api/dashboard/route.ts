import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
    const { data: teachers, error } = await supabaseAdmin
        .from('teachers')
        .select(`
            id,
            name,
            subject,
            observations (
                engagement_score
            )
        `)

    if (error) 
    {
        return Response.json({ error: error.message }, { status: 500 })
    }

    const enriched = teachers.map((t) => 
    {
        const scores = t.observations.map((o: any) => o.engagement_score)
        const avg = scores.length > 0
            ? scores.reduce((a: number, b: number) => a + b, 0) / scores.length
            : null
        return { id: t.id, name: t.name, subject: t.subject, avg, observations: scores.length }
    })

    const withData = enriched.filter((t) => t.avg !== null)
    const totalObservations = enriched.reduce((sum, t) => sum + t.observations, 0)
    const schoolAvg = withData.length > 0
        ? (withData.reduce((sum, t) => sum + t.avg!, 0) / withData.length).toFixed(2)
        : 'N/A'

    const top = [...withData].sort((a, b) => b.avg! - a.avg!).slice(0, 3)
    const needsAttention = [...withData].filter((t) => t.avg! < 5)

    return Response.json({ schoolAvg, totalObservations, totalTeachers: teachers.length, top, needsAttention })
}