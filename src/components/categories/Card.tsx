import { ICategory } from '@/interfaces/Category'
import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { GalleryVerticalEnd, Layers3, PenBox } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../ui/button'

interface Props {
    category: ICategory
}
export function CategoryCard({ category }: Props) {
    const auth = useAuth()
    const isAdmin = useMemo(() => auth.user?.roles.some((r) => ['admin', 'manager'].includes(r)), [auth.user])
    return (
        <Card className="border bg-none border-stone-200 dark:border-stone-700">
            <CardHeader className="pb-3">
                <CardTitle>
                    <div className="flex gap-1 items-center">
                        <Layers3 size={18} className="min-w-8" />
                        {category.title}
                    </div>
                </CardTitle>
            </CardHeader>

            <CardFooter className="border-t py-3 border-stone-200 dark:border-stone-700 space-x-3">
                {isAdmin && (
                    <NavLink to={`/admin?category=${category.id}`}>
                        <Button variant={'secondary'} size={'sm'}>
                            Editar <PenBox size={14} className="ms-3" />
                        </Button>
                    </NavLink>
                )}
                <NavLink to={`/?category=${category.id}`}>
                    <Button variant={'primary'} size={'sm'}>
                        Ver questões <GalleryVerticalEnd size={14} className="ms-3" />
                    </Button>
                </NavLink>
            </CardFooter>
        </Card>
    )
}
