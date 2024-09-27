import { QuestionFormSchema } from '@/components/forms/QuestionForm'
import { toast } from '@/components/ui/use-toast'
import { env } from '@/config/env'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

export const useQuestions = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const submit = async () => {
        const res = await axios.get(env.base_url + '/questions', {
            params: {
                search: searchParams.get('search') ?? '',
                order: searchParams.get('date') ?? 'desc',
                category: searchParams.get('category') ?? null
            },
            withCredentials: true
        })
        return res.data
    }
    return useQuery({
        queryFn: submit,
        queryKey: ['questions', searchParams.get('search'), searchParams.get('date'), searchParams.get('category')],
        retry: 2,
        refetchOnWindowFocus: false
    })
}

export const useCreateQuestion = () => {
    const createQuestion = async (data: z.infer<typeof QuestionFormSchema>) => {
        const res = await axios.post(env.base_url + '/questions', data, { withCredentials: true })
        return res.data
    }
    return useMutation({
        mutationFn: createQuestion,
        mutationKey: ['questions'],
        onSuccess: () => {
            toast({
                title: 'Criado!',
                variant: 'success',
                description: 'Questão criada com sucesso.'
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

export const useDeleteQuestion = () => {
    const submit = async (id: string) => {
        const res = await axios.delete(env.base_url + '/questions/' + id, { withCredentials: true })
        return res.data
    }
    return useMutation({
        mutationFn: submit,
        mutationKey: ['questions'],
        onSuccess: () => {
            toast({
                title: 'Deletado!',
                variant: 'success',
                description: 'Questão deletada com sucesso.'
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

export const useUpdateQuestion = () => {
    const updatedQuestion = async (data: z.infer<typeof QuestionFormSchema>) => {
        const res = await axios.put(env.base_url + '/questions/' + data.id, data, { withCredentials: true })
        return res.data
    }
    return useMutation({
        mutationFn: updatedQuestion,
        mutationKey: ['questions'],
        onSuccess: () => {
            toast({
                title: 'Atualizado!',
                variant: 'success',
                description: 'Questão atualizada com sucesso.'
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

export const useQuestion = (id: string) => {
    return useQuery({
        queryKey: ['question', id],
        queryFn: async () => {
            const res = await axios.get(`${env.base_url}/questions/${id}`, {
                withCredentials: true
            })
            return res.data
        },
        enabled: !!id, // Apenas ativa a consulta se id estiver definido
        refetchOnWindowFocus: false
    })
}
