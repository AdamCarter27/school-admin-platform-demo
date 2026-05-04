import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const teacher_id = searchParams.get('teacher_id')

    const { data, error } = await supabaseAdmin
        .from('goals')
        .select('*')
        .eq('teacher_id', teacher_id)
        .order('created_at', { ascending: false })

    if (error) return Response.json({ error: error.message }, { status: 500 })

    return Response.json(data)
}

export async function POST(req: Request) {
    const { teacher_id, description } = await req.json()

    const { data, error } = await supabaseAdmin
        .from('goals')
        .insert([{ teacher_id, description, status: 'pending' }])
        .select()

    if (error) return Response.json({ error: error.message }, { status: 500 })

    return Response.json(data[0])
}