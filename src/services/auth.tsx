import { toast } from '@/components/ui/use-toast'
import { env } from '@/config/env'
import { useAuth } from '@/context/AuthContext'
import { IUser } from '@/interfaces/User'
import { LoginFormSchema } from '@/pages/LoginPage'
import { RegisterFormSchema } from '@/pages/RegisterPage'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { z } from 'zod'

export const useLoginMutation = () => {
    const { setUserFunction } = useAuth()
    const submit = async (values: z.infer<typeof LoginFormSchema>) => {
        const res = await axios.post(
            env.base_url + '/auth/login',
            {
                email: values.email,
                password: values.password
            },
            {
                withCredentials: true
            }
        )
        return res.data
    }
    const mutate = useMutation({
        mutationFn: submit,
        onSuccess: (data: IUser) => {
            setUserFunction(data)
        },
        onError: (error: AxiosError) => {
            setUserFunction(null)
        }
    })
    return mutate
}

export const useRegisterMutation = () => {
    const { setUserFunction } = useAuth()
    const submit = async (values: z.infer<typeof RegisterFormSchema>) => {
        const res = await axios.post(
            env.base_url + '/auth/register',
            {
                name: values.name,
                email: values.email,
                password: values.password
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
        onError: (error: any) => {
            toast({
                variant: 'destructive',
                title: 'Erro!',
                description: error.response?.data?.message ?? 'Erro ao realizar operação.'
            })
        }
    })
    return mutate
}
