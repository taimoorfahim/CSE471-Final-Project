import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from "openai";
import { auth } from '@clerk/nextjs';
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


export const POST = async (
    req: Request,
) => {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt,amount=1,resolution="512x512" } = body;
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API key not configured", { status: 500 });
        }
        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        const freeTrial = await checkApiLimit();
        if (!freeTrial) {
            return new NextResponse("You have exceeded the free trial limit", { status: 403 });
        }


        const response = await openai.createImage({
            prompt,
            n: parseInt(amount,10),
            size: resolution,
        })


        await increaseApiLimit();

        return NextResponse.json(response.data.data);
    }
    catch (err) {
        console.log("[Image error]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
}