import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { userId, msgIndex, roomId } = body;

        const msgArr = await prisma.chat.findMany({
            where: {
                roomId: roomId
            }
        })
        const msgObj = msgArr[msgIndex]
        if (!msgObj) {
            return NextResponse.json({ error: "Message not found" }, { status: 404 });
        }
        const existingVote = await prisma.chat.findFirst({
            where: {
                AND: [
                    { id: msgObj.id },
                    { voters: { hasSome: [userId] } }
                ]
            }
        });

        console.log(msgObj);
        if (existingVote) {
            return NextResponse.json({ duplicateVoter: "You have already voted" }, { status: 400 });
        }

        const updatedMsg = await prisma.chat.update({
            where: {
                id: msgObj.id
            },
            data: {
                votes: msgObj.votes + 1,
                voters: { push: userId }
            }
        });

        if (updatedMsg) {
            return NextResponse.json({ updateVote: updatedMsg }, { status: 200 });
        }

        return NextResponse.json({ error: "Error updating vote" }, { status: 500 });
    } catch (error) {
        return NextResponse.json({ error: "Not able to upvote", details: error.message }, { status: 500 });
    }
} 
