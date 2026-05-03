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

    if (error) {
        return Response.json({ error: error.message }, { status: 500 })
    }

    const enriched = teachers.map((t) => ({
        id: t.id,
        name: t.name,
        subject: t.subject,
        observations: t.observations.length,
        avg: t.observations.length > 0
            ? (t.observations.reduce((sum: number, o: any) => sum + o.engagement_score, 0) / t.observations.length).toFixed(1)
            : 'N/A',
    }))

    return Response.json(enriched)
}