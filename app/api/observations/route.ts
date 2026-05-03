import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: Request) 
{
    const body = await req.json()

    const { teacher_id, scores, notes } = body

    const { data, error } = await supabaseAdmin
      .from('observations')
      .insert([
        {
          teacher_id,
          engagement_score: scores.engagement,
          notes,
        },
      ])
      .select()

    if (error) 
    {
      return new Response(JSON.stringify({ error: error.message }), 
      {
        status: 500,
      })
    }

    return Response.json(data[0])
}