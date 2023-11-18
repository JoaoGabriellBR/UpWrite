import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const noteId = searchParams.get('id');

    try {
        const response = await prisma.notes.findFirst({
            where: {
                id: Number(noteId)
            }
        });

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Não foi possível capturar a nota" }, { status: 500 })
    }
}