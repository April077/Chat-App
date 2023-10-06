// import { NextResponse } from "next/server";

// import { prisma } from "@/lib/db"
// export async function POST(request: Request) {
//   try {
//     const res = await request.json();
    
//     const { title, description, price, image, userId } = res;
//     console.log("Received data:", {
//       title,
//       description,
//       price,
//       image,
//       userId,
//     });

//     // Check if all required fields are present in the request body
//     if (!title || !description || !price || !image || !userId) {
//       return NextResponse.json(
//         { error: "Missing required fields in request body" },
//         { status: 400 }
//       );
//     }

//     const newCourse = await prisma.course.create({
//       data: {
//         title,
//         description,
//         price,
//         image,
//         userId,
//       },
//     });

//     return NextResponse.json({ message: "Course created", newCourse }, { status: 200 });
//   } catch (error) {
//     console.error("Error creating course:", error);
//     return NextResponse.json(
//       { error: "Error creating course" },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect(); // Disconnect from the Prisma client
//   }
// }
