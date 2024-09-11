import { ICategory } from './Category'

export interface IQuestionAnswer {
    id: number
    title: string
}

export interface IQuestion {
    id: string
    question: string
    material?: string
    categories: ICategory[]
    answers: IQuestionAnswer[]
    correct_answer_id: number
    createdAt: Date
    updatedAt: Date
}
