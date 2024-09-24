import { Button, buttonVariants } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { ReactNode, useState } from 'react'

interface Props {
    label: string
    icon: ReactNode
    variant: string
    disabled: boolean
    onConfirmation: () => void
}

export function ConfirmationDialog({ icon, label, variant, onConfirmation, disabled }: Props) {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={variant as any} type="button">
                    {label}
                    {icon}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader className="me-2">
                    <DialogTitle>Espera aí!!</DialogTitle>
                    <DialogDescription>Tem certeza que deseja realizar essa operação?</DialogDescription>
                </DialogHeader>
                <div className="space-x-3">
                    <DialogClose asChild>
                        <Button variant={'secondary'}>Cancelar</Button>
                    </DialogClose>
                    <Button
                        disabled={disabled}
                        variant={'primary'}
                        onClick={() => {
                            onConfirmation()
                            setOpen(false)
                        }}
                    >
                        Confirmar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
