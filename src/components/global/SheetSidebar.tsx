import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import { useAuth } from '@/context/AuthContext'
import { cva } from 'class-variance-authority'
import { AlignJustify, GalleryVerticalEnd, Home, List, ShieldCheck } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const linksProperties = cva('flex items-center text-sm gap-2 font-semibold py-2  px-3 rounded-md', {
    variants: {
        active: {
            true: 'bg-slate-200 dark:bg-stone-700 text-gray-900 dark:text-slate-100',
            false: 'text-slate-600 dark:text-slate-300'
        },
        pending: {
            true: '',
            false: ''
        }
    },
    defaultVariants: {
        active: false,
        pending: false
    }
})

export function SheetSidebar() {
    const auth = useAuth()
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size={'icon'}>
                    <AlignJustify />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="m-0">
                    <SheetTitle></SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <nav className="mt-7">
                    <ul className="flex flex-col gap-3">
                        <li>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive, isPending }) =>
                                    linksProperties({ active: isActive, pending: isPending })
                                }
                            >
                                <Home size={16} />
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    linksProperties({ active: isActive, pending: isPending })
                                }
                            >
                                <GalleryVerticalEnd size={16} />
                                Questões
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/categorias"
                                className={({ isActive, isPending }) =>
                                    linksProperties({ active: isActive, pending: isPending })
                                }
                            >
                                <List size={16} />
                                Categorias
                            </NavLink>
                        </li>
                        {auth.user?.roles.some((r) => ['admin', 'manager'].includes(r)) && (
                            <li>
                                <NavLink
                                    to="/admin"
                                    className={({ isActive, isPending }) =>
                                        linksProperties({ active: isActive, pending: isPending })
                                    }
                                >
                                    <ShieldCheck size={16} />
                                    Admin
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </SheetContent>
        </Sheet>
    )
}
