import { NextResponse } from "next/server";

import { prisma } from "@/lib/db"
export async function POST(request: Request) {
    try {
        const res = await request.json();

        const { name, userId } = res;
        console.log("Received data:", {
            name, userId
        });

        // Check if all required fields are present in the request body
        if (!name || !userId) {
            return NextResponse.json(
                { error: "Missing required fields in request body" },
                { status: 400 }
            );
        }

        const newRoom = await prisma.room.create({
            data: {
                name,
                userId,
            },
        });

        return NextResponse.json({ message: "Room created", newRoom }, { status: 200 });
    } catch (error) {
        console.error("Error creating room:", error);
        return NextResponse.json(
            { error: "Error creating room" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect(); // Disconnect from the Prisma client
    }
}
