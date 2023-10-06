import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const msgs = await prisma.chat.findMany()
        console.log(msgs)
        return NextResponse.json({ msgs }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ "cannot fetch msg": error }, { status: 500 })
    }

}