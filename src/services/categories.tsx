import { CategoriesFormSchema } from '@/components/forms/CategoriesForm'
import { toast } from '@/components/ui/use-toast'
import { env } from '@/config/env'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'

export const useCategories = (search: string) => {
    const submit = async () => {
        const res = await axios.get(env.base_url + '/categories', {
            params: {
                search: search ?? '',
                per_page: 50
            },
            withCredentials: true
        })
        return res.data
    }
    return useQuery({
        queryKey: ['categories', search],
        queryFn: submit,
        refetchOnWindowFocus: false,
        retry: false
    })
}

export const useCategory = (id: string) => {
    const submit = async () => {
        const res = await axios.get(env.base_url + '/categories/' + id, {
            withCredentials: true
        })
        return res.data
    }
    return useQuery({
        queryKey: ['category'],
        queryFn: submit,
        enabled: !!id,
        refetchOnWindowFocus: false,
        retry: false
    })
}

export const useCreateCategory = () => {
    const submit = async (data: z.infer<typeof CategoriesFormSchema>) => {
        const res = await axios.post(env.base_url + '/categories', data, { withCredentials: true })
        return res.data
    }
    return useMutation({
        mutationFn: submit,
        mutationKey: ['categories'],
        onSuccess: () => {
            toast({
                title: 'Criado!',
                variant: 'success',
                description: 'Categoria criada com sucesso.'
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

export const useUpdateCategory = () => {
    const submit = async (data: z.infer<typeof CategoriesFormSchema>) => {
        const res = await axios.put(env.base_url + '/categories/' + data.id, data, { withCredentials: true })
        return res.data
    }
    return useMutation({
        mutationFn: submit,
        mutationKey: ['categories', 'category'],
        onSuccess: () => {
            toast({
                title: 'Atualizado!',
                variant: 'success',
                description: 'Categoria atualizada com sucesso.'
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

export const useDeleteCategory = () => {
    const submit = async (id: string) => {
        const res = await axios.delete(env.base_url + '/categories/' + id, { withCredentials: true })
        return res.data
    }
    return useMutation({
        mutationFn: submit,
        mutationKey: ['categories', 'category'],
        onSuccess: () => {
            toast({
                title: 'Deletado!',
                variant: 'success',
                description: 'Categoria deletada com sucesso.'
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
