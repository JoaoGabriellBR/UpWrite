import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { useState, useEffect } from 'react'

export default function AlertDeleteNote({ handleClickDelete }: any) {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <>
            {isClient ? (
                <AlertDialog>
                    <AlertDialogTrigger>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant="outline">
                                    <Icons.moreHorizontal className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem className="cursor-pointer">
                                    <Icons.trash className="mr-2 h-4 w-4" />
                                    <p>Excluir nota</p>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Essa ação não pode ser desfeita. Isso excluirá permanentemente sua nota.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleClickDelete}>Excluir</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            ) : null}
        </>
    )
}