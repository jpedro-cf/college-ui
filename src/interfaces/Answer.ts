import { IQuestion } from './Question'

export interface IAnswer {
    id: string
    user: string
    question: IQuestion
    answer_id: number
    correct: boolean
    createdAt: Date
}
