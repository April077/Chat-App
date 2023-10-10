import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";



export async function GET() {

    const courses = await prisma.room.findMany()
    return NextResponse.json(courses)

} 