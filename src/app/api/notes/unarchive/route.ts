import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {

  const { searchParams } = new URL(request.url);
  const noteId = searchParams.get("id");

  try {
    await prisma.notes.update({
      where: { id: String(noteId) },
      data: { deleted_at: null },
    });

    return NextResponse.json(
      { success: "Sua nota foi restaurada com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Não foi possível restaurar a nota." },
      { status: 500 }
    );
  }
}