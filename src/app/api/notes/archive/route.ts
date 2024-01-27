import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const noteId = searchParams.get("id");

  try {
    await prisma.notes.update({
      where: { id: String(noteId) },
      data: { deleted_at: new Date() },
    });

    return NextResponse.json(
      { success: "Sua nota foi arquivada com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Não foi possível arquivar a nota." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await prisma.notes.findMany({
      where: {
        deleted_at: { not: null },
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Não foi possível capturar as notas arquivadas." },
      { status: 500 }
    );
  }
}
