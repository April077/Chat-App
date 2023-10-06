import { prisma } from "@/lib/db";
import { hash } from "bcrypt"
import { NextResponse } from "next/server";
import { z } from "zod"

const userSchema = z
    .object({
        username: z.string().min(1, "Username is required").max(100),
        email: z.string().min(1, "Email is required").email("invalid email"),
        password: z.string().min(8, "must be 8 characters"),
    });

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = userSchema.parse(body);
        //check if email exists
        const existingEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (existingEmail) {
            return NextResponse.json({ message: "user already exists" }, { status: 409 })
        }
        const hashedPassword = await hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: username
            }
        })

        const { password: newPassword, ...rest } = newUser
        return NextResponse.json({ user: rest, message: "new user created" }, { status: 201 })
    }
    catch (err) {
        return NextResponse.json({ error: err })
    }
}