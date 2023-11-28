import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const noteId = searchParams.get('id');

    try {
        const response = await prisma.notes.findFirst({
            where: {
                id: String(noteId)
            }
        });

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Não foi possível capturar a nota" }, { status: 500 })
    }
}

export async function PATCH(request: Request){

    const { searchParams } = new URL(request.url);
    const noteId = searchParams.get('id');

    const { title, content } = await request.json();

    try {
        const response = await prisma.notes.update({
            where: {
                id: String(noteId)
            },
            data: {
                title,
                content,
            }
        });

        return NextResponse.json({ response });
    } catch (error) {
        return NextResponse.json({ message: "Não foi possível atualizar a nota." }, { status: 500 })
    }
}

export async function DELETE(request: Request) {

    const { searchParams } = new URL(request.url);
    const noteId = searchParams.get('id');

    try {
        await prisma.notes.delete({
            where: {
                id: String(noteId)
            }
        });

        return NextResponse.json({ success: "Nota excluida com sucesso." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Não foi possível excluir a nota." }, { status: 500 })
    }
}