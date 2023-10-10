import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const { roomId } = await req.json();
        console.log(roomId)
        if (!roomId) {
            return NextResponse.json({ error: "no room id" }, { status: 100 })
        }
        const msgs = await prisma.chat.findMany({
            where: {
                roomId: roomId
            }
        })
        console.log(msgs, " from server")
        return NextResponse.json({ msgs }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ "cannot fetch msg": error }, { status: 500 })
    }

}