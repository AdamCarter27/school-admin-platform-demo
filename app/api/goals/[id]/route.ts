import { supabaseAdmin } from '@/lib/supabase'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const { status } = await req.json()

    const { data, error } = await supabaseAdmin
        .from('goals')
        .update({ status })
        .eq('id', id)
        .select()

    if (error) return Response.json({ error: error.message }, { status: 500 })

    return Response.json(data[0])
}