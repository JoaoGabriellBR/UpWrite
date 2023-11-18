import { ReactNode } from "react"
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactQueryProvider } from "@/contexts/react-query-provider";

interface PrivateLayoutProps {
    children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect('/')
    }

    return <ReactQueryProvider>{children}</ReactQueryProvider>
}