import Link from 'next/link';
import { ModeToggle } from "@/contexts/mode-toggle";
import { Button } from '@/components/ui/button';
import { Icons } from "@/components/icons";

export default function Header() {
    return (
        <header className=" w-full py-7">
            <div className="max-w-7xl mx-auto px-4 flex flex-row justify-between items-center">
                <div className="flex flex-row justify-between items-center gap-1">
                    <Icons.logo className='w-6 h-6 text-primary font-bold'/>
                    <h1 className="font-heading text-xl font-extrabold">UpWrite</h1>
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