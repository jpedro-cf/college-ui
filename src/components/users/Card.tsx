import { IUser } from '@/interfaces/User'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { PenBox, User } from 'lucide-react'
import { Badge } from '../ui/badge'
import { NavLink } from 'react-router-dom'
import { Button } from '../ui/button'

interface Props {
    user: IUser
}
export function UserCard({ user }: Props) {
    return (
        <Card className="border bg-none border-stone-200 dark:border-stone-700">
            <CardHeader className="pb-2">
                <CardTitle>
                    <div className="flex gap-1 items-center">
                        <User size={18} className="min-w-8" />
                        {user.name}
                    </div>
                </CardTitle>
                <CardDescription className="text-primary dark:text-primary-300">{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
                <span className="text-sm text-foreground/60">Cargos</span>
                <div className="flex flex-wrap mt-1 gap-1">
                    {user.roles?.map((role, i) => (
                        <Badge key={i} variant={'outline'}>
                            {role}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="border-t py-3 border-stone-200 dark:border-stone-700 space-x-3">
                <NavLink to={`/perfil/${user.id}`}>
                    <Button variant={'secondary'} size={'sm'}>
                        Editar <PenBox size={14} className="ms-3" />
                    </Button>
                </NavLink>
            </CardFooter>
        </Card>
    )
}
