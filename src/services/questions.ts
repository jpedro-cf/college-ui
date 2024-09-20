import { CreateQuestionFormSchema } from '@/components/forms/QuestionForm'
import { toast } from '@/components/ui/use-toast'
import { env } from '@/config/env'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'

export const useQuestions = () => {
    const submit = async () => {
        const res = await axios.get(env.base_url + '/questions', {
            params: {
                search: ''
            },
            withCredentials: true
        })
        return res.data
    }
    return useQuery({
        queryKey: ['questions'],
        refetchOnWindowFocus: false,
        queryFn: submit
    })
}

export const useCreateQuestion = () => {
    const createQuestion = async (data: z.infer<typeof CreateQuestionFormSchema>) => {
        const res = await axios.post(env.base_url + '/questions', data, { withCredentials: true })
        return res.data
    }
    return useMutation({
        mutationFn: createQuestion,
        mutationKey: ['questions'],
        onSuccess: () => {
            toast({
                title: 'Respondido!',
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
