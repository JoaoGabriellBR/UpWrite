import { Icons } from "@/components/icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
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
} from "@/components/ui/alert-dialog"

export default function Editor() {
    return (
        <>
            <div className="flex flex-row justify-start items-center flex-wrap gap-2 py-3">
                <Toggle variant="outline" aria-label="Toggle Bold">
                    <Icons.bold className="h-4 w-4" />
                </Toggle>
                <Toggle variant="outline" aria-label="Toggle italic">
                    <Icons.italic className="h-4 w-4" />
                </Toggle>
                <Toggle aria-label="Toggle Underline">
                    <Icons.underline className="h-4 w-4" />
                </Toggle>
                <Toggle aria-label="Toggle Strike Through">
                    <Icons.strikethrough className="h-4 w-4" />
                </Toggle>


                <Select>
                    <SelectTrigger className="w-[180px] border-none">
                        <SelectValue placeholder="Arial" />
                    </SelectTrigger>
                    <SelectContent className="border-none">
                        <SelectItem value="8pt">Arial</SelectItem>
                        <SelectItem value="10pt">Arial Black</SelectItem>
                        <SelectItem value="12pt">Inter</SelectItem>
                        <SelectItem value="14pt">Raleway</SelectItem>
                        <SelectItem value="16pt">Open Sans</SelectItem>
                        <SelectItem value="18pt">Helvetica</SelectItem>
                        <SelectItem value="18pt">Georgia</SelectItem>
                        <SelectItem value="24pt">Impact</SelectItem>
                        <SelectItem value="36pt">Comic Sans MS</SelectItem>
                        <SelectItem value="36pt">Verdana</SelectItem>
                        <SelectItem value="36pt">Tahoma</SelectItem>
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="w-[180px] border-none">
                        <SelectValue placeholder="Titulo" />
                    </SelectTrigger>
                    <SelectContent className="border-none">
                        <SelectItem className="text-[24px]" value="titulo1">Título 1</SelectItem>
                        <SelectItem className="text-[20px]" value="titulo2">Título 2</SelectItem>
                        <SelectItem className="text-[18px]" value="titulo3">Título 3</SelectItem>
                        <SelectItem className="text-[16px]" value="titulo4">Título 4</SelectItem>
                        <SelectItem className="text-[12px]" value="titulo5">Título 5</SelectItem>
                        <SelectItem className="text-[8px]" value="titulo6">Título 6</SelectItem>
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="w-[180px] border-none">
                        <SelectValue placeholder="28px" />
                    </SelectTrigger>
                    <SelectContent className="border-none">
                        <SelectItem value="8pt">8px</SelectItem>
                        <SelectItem value="10pt">10px</SelectItem>
                        <SelectItem value="12pt">12px</SelectItem>
                        <SelectItem value="14pt">14px</SelectItem>
                        <SelectItem value="16pt">16px</SelectItem>
                        <SelectItem value="18pt">18px</SelectItem>
                        <SelectItem value="24pt">24px</SelectItem>
                        <SelectItem value="36pt">36px</SelectItem>
                    </SelectContent>
                </Select>

                <Toggle variant="outline" aria-label="Align Left">
                    <Icons.alignLeft className="h-4 w-4" />
                </Toggle>

                <Toggle variant="outline" aria-label="Align Center">
                    <Icons.alignCenter className="h-4 w-4" />
                </Toggle>

                <Toggle variant="outline" aria-label="Align Right">
                    <Icons.alignRight className="h-4 w-4" />
                </Toggle>

                <Toggle variant="outline" aria-label="Align Justify">
                    <Icons.alignJustify className="h-4 w-4" />
                </Toggle>

                <Toggle variant="outline" aria-label="Text Color">
                    <Icons.baseline className="h-4 w-4" />
                </Toggle>

                <Toggle variant="outline" aria-label="Image">
                    <Icons.image className="h-4 w-4" />
                </Toggle>

                <Toggle variant="outline" aria-label="Code">
                    <Icons.code className="h-4 w-4" />
                </Toggle>

                <Toggle variant="outline" aria-label="List Unordered">
                    <Icons.list className="h-4 w-4" />
                </Toggle>

                <Toggle variant="outline" aria-label="List Ordered">
                    <Icons.listOrdered className="h-4 w-4" />
                </Toggle>

                <AlertDialog>
                    <AlertDialogTrigger>
                        <DropdownMenu>
                            <DropdownMenuTrigger><Icons.moreHorizontal className="w-7 h-7" /></DropdownMenuTrigger>
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
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction>Excluir</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </>
    )
}