import Link from 'next/link';
import { ModeToggle } from "@/contexts/mode-toggle";
import { Button } from '@/components/ui/button';
import { Icons } from "@/components/icons";

export default function Header() {
    return (
        <header className="py-7 max-w-7xl mx-auto">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row justify-between items-center gap-1">
                    <Icons.logo className='w-6 h-6'/>
                    <h1 className="font-heading text-xl font-extrabold">React Notes</h1>
                </div>

                <div className="flex flex-row items-center space-x-1">
                    <ModeToggle />
                    <Button asChild variant="secondary">
                        <Link href="/login">Login</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}