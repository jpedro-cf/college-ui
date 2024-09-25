import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import { useAuth } from '@/context/AuthContext'
import { useUpdateUser, useUser } from '@/services/users'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, InfoIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'

export const UserForm = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    email: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    roles: z.array(z.string())
})

export function ProfilePage() {
    const navigate = useNavigate()
    const auth = useAuth()
    const { id } = useParams()
    const user = useUser(id!)

    const updateUser = useUpdateUser()

    const form = useForm<z.infer<typeof UserForm>>({
        resolver: zodResolver(UserForm)
    })

    function handleUpdate(values: z.infer<typeof UserForm>) {
        updateUser.mutate(values, {
            onSuccess: () => {
                navigate('/', { replace: true })
            }
        })
    }

    useEffect(() => {
        if (user.isSuccess && user.data.id) {
            form.reset({
                id: user.data.id,
                name: user.data.name,
                roles: user.data.roles
            })
        }
    }, [id, user.data])

    if (user.isError) {
        return (
            <Alert className="mt-3">
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Não foi possível carregar o perfil do usuário!</AlertTitle>
                <AlertDescription>Verifique se está autenticado, ou então tente novamente mais tarde.</AlertDescription>
            </Alert>
        )
    }

    return (
        <>
            <h2 className="font-semibold text-xl">Perfil do Usuário</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleUpdate)} className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome:</FormLabel>
                                <FormControl>
                                    <Input value={field.value} onChange={field.onChange} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email:</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder={user.data?.email}
                                        value={field.value ?? undefined}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nova senha:</FormLabel>
                                <FormControl>
                                    <Input value={field.value ?? undefined} onChange={field.onChange} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {auth.user?.roles.includes('admin') && (
                        <FormField
                            name="roles"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormLabel>Cargos:</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            multiple={true}
                                            shouldFilter={true}
                                            options={[
                                                {
                                                    value: 'admin',
                                                    label: 'Admininistrador'
                                                },
                                                {
                                                    value: 'manager',
                                                    label: 'Moderador'
                                                },
                                                {
                                                    value: 'student',
                                                    label: 'Estudante'
                                                }
                                            ]}
                                            onValueChange={(values) => field.onChange(values)}
                                            value={field.value ?? undefined}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    )}
                    <div className="col-span-3">
                        <Button variant={'primary'} disabled={updateUser.isPending}>
                            Enviar <CheckCircle size={16} className="ms-2" />{' '}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}
