import { supabaseAdmin } from '@/lib/supabase'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { status } = await req.json()

    const { data, error } = await supabaseAdmin
        .from('goals')
        .update({ status })
        .eq('id', params.id)
        .select()

    if (error) return Response.json({ error: error.message }, { status: 500 })

    return Response.json(data[0])
}