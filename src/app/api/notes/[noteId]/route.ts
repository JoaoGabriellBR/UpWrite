import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const noteId = searchParams.get("id");

  try {
    const response = await prisma.notes.findFirst({
      where: {
        id: String(noteId),
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Não foi possível capturar a nota" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const noteId = searchParams.get("id");
  const { title, content } = await request.json();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await prisma.notes.update({
      where: {
        id: String(noteId),
      },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        updated_at: new Date(),
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Não foi possível atualizar a nota" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const noteId = searchParams.get("id");

  try {
    await prisma.notes.delete({
      where: {
        id: String(noteId),
      },
    });

    return NextResponse.json(
      { success: "Nota excluida com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Não foi possível excluir a nota." },
      { status: 500 }
    );
  }
}
