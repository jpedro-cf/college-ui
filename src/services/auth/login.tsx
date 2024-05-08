import { env } from '@/config/env'
import { useAuth } from '@/context/AuthContext'
import { IUser } from '@/interfaces/entities/User'
import { LoginFormSchema } from '@/pages/LoginPage'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { z } from 'zod'

export const useLoginMutation = () => {
    const { setUserFunction } = useAuth()
    const submit = async (values: z.infer<typeof LoginFormSchema>) => {
        const res = await axios.post(
            env.base_url + '/login',
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
