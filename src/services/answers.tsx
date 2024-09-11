import { AnswerQuestionFormSchema } from '@/components/forms/AnswerQuestionForm'
import { env } from '@/config/env'
import axios from 'axios'
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
