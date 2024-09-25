import { cva } from 'class-variance-authority'
import { GalleryVerticalEnd, Home, List, ShieldCheck } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { ThemeToggler } from './ThemeToggler'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { useAuth } from '@/context/AuthContext'
import { Button } from '../ui/button'

const linksProperties = cva('flex items-center text-sm gap-2 font-semibold py-1  px-3 rounded-md', {
    variants: {
        active: {
            true: 'bg-[#fff] dark:bg-stone-700 text-gray-900 dark:text-slate-100',
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

export const Sidebar = () => {
    const auth = useAuth()
    return (
        <aside className="sidebar fixed top-0 left-0 hidden lg:flex flex-col p-5 w-[225px] min-h-screen">
            <div className="flex justify-between mb-5 border-b border-dashed border-stone-300 dark:border-stone-600">
                {auth.user && (
                    <div className="flex gap-3 text-xs">
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

                <ThemeToggler />
            </div>
            <nav>
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
        </aside>
    )
}
