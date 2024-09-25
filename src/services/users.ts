import { toast } from '@/components/ui/use-toast'
import { env } from '@/config/env'
import { UserForm } from '@/pages/ProfilePage'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'

export const useUsers = () => {
    const submit = async () => {
        const res = await axios.get(env.base_url + '/users', {
            // params: {
            //     per_page:
            // },
            withCredentials: true
        })
        return res.data
    }
    return useQuery({
        queryKey: ['users'],
        queryFn: submit,
        refetchOnWindowFocus: false,
        retry: false
    })
}

export const useUser = (id: string) => {
    const submit = async () => {
        const res = await axios.get(env.base_url + '/users/' + id, {
            // params: {
            //     per_page:
            // },
            withCredentials: true
        })
        return res.data
    }
    return useQuery({
        queryKey: ['user'],
        queryFn: submit,
        refetchOnWindowFocus: false,
        retry: 0
    })
}

export const useUpdateUser = () => {
    const submit = async (data: z.infer<typeof UserForm>) => {
        const res = await axios.put(env.base_url + '/users/' + data.id, data, { withCredentials: true })
        return res.data
    }
    return useMutation({
        mutationFn: submit,
        mutationKey: ['users'],
        onSuccess: () => {
            toast({
                title: 'Editado!',
                variant: 'success',
                description: 'Perfil do usuário editado com sucesso.'
            })
        },
        onError: (error: any) => {
            toast({
                variant: 'destructive',
                title: 'Erro!',
                description: error.response?.data?.message ?? 'Erro ao realizar operação.'
            })
        }
    })
}
