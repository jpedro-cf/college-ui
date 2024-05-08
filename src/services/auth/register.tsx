import { toast } from '@/components/ui/use-toast'
import { env } from '@/config/env'
import { useAuth } from '@/context/AuthContext'
import { IUser } from '@/interfaces/entities/User'
import { RegisterFormSchema } from '@/pages/RegisterPage'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { z } from 'zod'

export const useRegisterMutation = () => {
    const { setUserFunction } = useAuth()
    const submit = async (values: z.infer<typeof RegisterFormSchema>) => {
        const res = await axios.post(
            env.base_url + '/register',
            {
                name: values.name,
                email: values.email,
                password: values.password,
                password_confirmation: values.password_confirmation,
                discord_username: values.discord_username
            },
            {
                withCredentials: true
            }
        )
        return res.data
    }
    const mutate = useMutation({
        mutationFn: submit,
        onSuccess: (data: IUser | string) => {
            toast({
                variant: 'success',
                title: 'Sucesso!',
                description: 'Registro realizado com sucesso.'
            })
            if (typeof data === 'object' && data !== null && !('length' in data)) {
                setUserFunction(data as IUser)
            }
        },
        onError: (error: AxiosError) => {
            toast({
                variant: 'destructive',
                title: 'Erro!',
                description: error.response?.data
            })
        }
    })
    return mutate
}
