import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/contexts/mode-toggle";

export function SettingsDialog({ isOpen, setIsOpened }: any) {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpened(false)}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">Minhas configurações</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Aparência</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Personalize a aparência do UpWrite no seu dispositivo
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
}
