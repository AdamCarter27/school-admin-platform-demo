import { supabaseAdmin } from '@/lib/supabase'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const { data: teacher, error } = await supabaseAdmin
        .from('teachers')
        .select(`
            id,
            name,
            subject,
            observations (
                id,
                engagement_score,
                notes,
                created_at
            ),
            goals (
                id,
                description,
                status
            )
        `)
        .eq('id', id)
        .single()

    if (error) return Response.json({ error: error.message }, { status: 500 })

    const scores = teacher.observations.map((o: any) => o.engagement_score)
    const avg = scores.length > 0
        ? (scores.reduce((a: number, b: number) => a + b, 0) / scores.length).toFixed(1)
        : 'N/A'

    return Response.json({ ...teacher, avg })
}