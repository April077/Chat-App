import { prisma } from "@/lib/db"
import { NextResponse } from "next/server";


export async function POST(req: Request,) {
    try {
        const data = await req.json()
        console.log(data)
        const { chatMsg, userId } = data;
        const chat = await prisma.chat.create({
            data: {
                chatMsg,
                userId
            }
        })

        return NextResponse.json({ "new msg created": chat }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ "no msg created": error }, { status: 500 })
    }

}