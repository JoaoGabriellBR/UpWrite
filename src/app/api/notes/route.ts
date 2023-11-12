import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { Session } from "@/lib/types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json('Unauthorized', { status: 401 });
    }

    const { title, content } = await request.json();

    const response = await prisma.notes.create({
        data: {
            title,
            content,
            author: {
                connect: {
                 id: session?.user?.id
                }
            }
        }
    });

    return NextResponse.json({ response });
}