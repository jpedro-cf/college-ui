import { useUsers } from '@/services/users'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { InfoIcon } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'
import { IUser } from '@/interfaces/User'
import { UserCard } from './Card'

export function UsersList() {
    const users = useUsers()

    if (users.isError) {
        return (
            <Alert className="mt-3">
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Não foi possível carregar os usuários!</AlertTitle>
                <AlertDescription>Verifique se está autenticado, ou então tente novamente mais tarde.</AlertDescription>
            </Alert>
        )
    }
    return (
        <>
            {(users.isLoading || users.isRefetching) && (
                <div className="grid grid-cols-1 lg:grid-cols-3  mt-5 gap-5 w-full">
                    <Skeleton className="h-[200px]" />
                    <Skeleton className="h-[200px]" />
                    <Skeleton className="h-[200px]" />
                </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3  mt-5 gap-5 w-full">
                {users.isSuccess && users.data?.users?.map((user: IUser) => <UserCard user={user} />)}
            </div>
        </>
    )
}
