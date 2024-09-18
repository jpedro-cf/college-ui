import { AnswerQuestionFormSchema } from '@/components/forms/AnswerQuestionForm'
import { env } from '@/config/env'
import { IPerformance } from '@/interfaces/Performance'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'
import { subMonths } from 'date-fns'
import { z } from 'zod'

export const answerQuestion = async (data: z.infer<typeof AnswerQuestionFormSchema>) => {
    const res = await axios.post(
        env.base_url + '/answers',
        {
            question_id: data.question_id,
            answer_id: Number(data.answer_id)
        },
        {
            withCredentials: true
        }
    )
    return res.data
}

export const useAnswersPerformance = (date: Date) => {
    const submit = async () => {
        const res = await axios.get(env.base_url + '/performance', {
            params: {
                date: date.toISOString()
            },
            withCredentials: true
        })
        return res.data as IPerformance
    }
    return useQuery({
        queryKey: ['performance', date],
        queryFn: submit,
        retry: false
    })
}

export const useAnswers = () => {
    const submit = async () => {
        const res = await axios.get(env.base_url + '/answers', {
            withCredentials: true
        })
        return res.data
    }
    return useQuery({
        queryKey: ['answers'],
        queryFn: submit,
        retry: false
    })
}
