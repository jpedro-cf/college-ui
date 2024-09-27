import { useAuth } from '@/context/AuthContext'
import { cva } from 'class-variance-authority'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { NavLink } from 'react-router-dom'
import { Button } from '../ui/button'
import { GalleryVerticalEnd, Home, List } from 'lucide-react'
import { SheetSidebar } from './SheetSidebar'
import { ThemeToggler } from './ThemeToggler'

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

export function Header() {
    const auth = useAuth()
    return (
        <header className="flex justify-between xl:hidden bg-[#fff] z-50 shadow-md dark:bg-stone-800 p-3 sticky top-0">
            <SheetSidebar />
            <nav>
                <ul className="hidden sm:flex">
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
                </ul>
            </nav>
            {auth.user && (
                <div className="flex gap-3 items-center text-xs">
                    <ThemeToggler />
                    <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-slate-100">
                            {auth.user.name.split('')[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <span className="block max-w-[80px] truncate text-ellipsis whitespace-nowrap font-semibold">
                            {auth.user.name}
                        </span>
                        <span className="block max-w-[100px] truncate text-ellipsis whitespace-nowrap">
                            {auth.user.points} Pontos
                        </span>
                    </div>
                </div>
            )}
            {!auth.user && (
                <NavLink to={'/login'}>
                    <Button size={'sm'} variant={'primary'}>
                        Login
                    </Button>
                </NavLink>
            )}
        </header>
    )
}
