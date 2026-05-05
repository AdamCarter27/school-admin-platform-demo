import { supabaseAdmin } from '@/lib/supabase'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { HumanMessage } from '@langchain/core/messages'

const model = new ChatGoogleGenerativeAI({
    model: 'gemini-2.5-flash-lite',
    apiKey: process.env.GOOGLE_API_KEY,
    })

export async function POST(req: Request) {
    const { teacher_id } = await req.json()

    // Get observations
    const { data: observations, error } = await supabaseAdmin
        .from('observations')
        .select('*')
        .eq('teacher_id', teacher_id)

    if (error) 
    {
        return Response.json({ error: error.message }, { status: 500 })
    }

    if (!observations || observations.length === 0) 
    {
        return Response.json
        ({
            summary: "No observations available.",
            avg_engagement: 0,
        })
    }

    // Compute average
    const avg =
        observations.reduce
        (
            (sum, o) => sum + o.engagement_score,
            0
        ) / observations.length

    let summary = ""

    try 
    {
        const response = await model.invoke([
            new HumanMessage(`You are an educational performance analyst. Based on the following classroom observations, write a concise 2-3 sentence professional summary of this teacher's performance. Focus on patterns in engagement and specific notes. Be constructive and specific. 
            Observations: ${JSON.stringify(observations)}`)
        ])

        summary = response.text
    } 
    catch (err) 
    {
        console.error("Error generating review:", err)
        summary = "Failed to generate a review summary."
    }
    return Response.json
    ({
        avg_engagement: avg.toFixed(2),
        summary,
    })
}