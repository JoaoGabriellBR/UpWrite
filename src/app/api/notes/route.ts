import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { Session } from "@/lib/types";
import { getServerSession } from "next-auth";

export async function POST(request: Request): Promise<Response | void> {
    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
        return new Response('Unauthorized', { status: 401 });
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

    return new Response(JSON.stringify(response), { status: 201, headers: { 'Content-Type': 'application/json' } });
}

export async function GET(request: Request): Promise<Response | void> {

    const session: Session | null = await getServerSession(authOptions);

    if (!session) {
        return new Response('Unauthorized', { status: 401 });
    }

    const response = await prisma.notes.findMany({
        where: {
            id_author: session.user?.id
        },
        orderBy: {
            updated_at: 'desc'
        }
    });

    return new Response(JSON.stringify(response), { status: 200, headers: { 'Content-Type': 'application/json' } });
}