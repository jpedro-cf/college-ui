import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IQuestion } from '@/interfaces/Question'
import { PenBox } from 'lucide-react'
import { AnswerQuestionForm } from '../forms/AnswerQuestionForm'

interface Props {
    question: IQuestion
}

export function AnswerQuestionDialog({ question }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'sm'} variant={'primary'}>
                    Responder
                    <PenBox size={14} className="ms-2" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader className="me-2">
                    <DialogTitle>{question.question}</DialogTitle>
                    <DialogDescription>{question.answers.length} Opções</DialogDescription>
                </DialogHeader>
                <AnswerQuestionForm question={question} />
            </DialogContent>
        </Dialog>
    )
}
