import { IAnswer } from '@/interfaces/Answer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { LibraryBig } from 'lucide-react'
import { Badge } from '../ui/badge'

interface Props {
    answer: IAnswer
}

export function AnswerCard({ answer }: Props) {
    return (
        <Card className="border bg-none border-stone-200 dark:border-stone-700">
            <CardHeader className="py-3 border-b border-stone-200 dark:border-stone-700">
                <CardTitle className="flex justify-between">
                    <div className="flex gap-1 items-center">
                        <LibraryBig size={18} />
                        {answer.question.question}
                    </div>
                    <Badge variant={answer.correct ? 'success' : 'light_destructive'}>
                        {answer.correct ? 'Correta' : 'Incorreta'}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="py-3 text-sm ">
                {answer.question.answers
                    .filter((question) => question.id == answer.question.correct_answer_id)
                    .map((answer) => (
                        <div>
                            <span className="text-green-600 dark:text-green-200 font-semibold">Correta: </span>
                            {answer.title}
                        </div>
                    ))}
                {!answer.correct && (
                    <div>
                        <span className="text-red-600 dark:text-red-300 font-semibold">Respondeu: </span>
                        {answer.question.answers.filter((question) => question.id == answer.answer_id)[0].title}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
