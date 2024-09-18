import { IQuestion } from '@/interfaces/Question'
import { answerQuestion } from '@/services/answers'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from '../ui/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Button } from '../ui/button'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { cva } from 'class-variance-authority'

const optionProperties = cva('flex gap-3 cursor-pointer p-3 rounded-md transition-colors', {
    variants: {
        active: {
            true: 'bg-primary-100 dark:bg-primary-200 border border-primary-500 text-primary-600',
            false: 'bg-none border'
        }
    },
    defaultVariants: {
        active: false
    }
})

export const AnswerQuestionFormSchema = z.object({
    question_id: z.string(),
    answer_id: z.string()
})

interface Props {
    question: IQuestion
}

export function AnswerQuestionForm({ question }: Props) {
    const form = useForm<z.infer<typeof AnswerQuestionFormSchema>>({
        resolver: zodResolver(AnswerQuestionFormSchema),
        defaultValues: {
            question_id: question.id
        }
    })

    const mutation = useMutation({
        mutationFn: answerQuestion,
        onSuccess: () => {
            toast({
                title: 'Respondido!',
                variant: 'success',
                description: <div>Veja o seu resultado na página de respostas.</div>
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
    function onSubmit(values: z.infer<typeof AnswerQuestionFormSchema>) {
        mutation.mutate(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name="answer_id"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="mb-5">
                            <RadioGroup onValueChange={field.onChange} value={field.value}>
                                {question.answers.map((answer) => (
                                    <FormControl key={answer.id}>
                                        <FormLabel
                                            htmlFor={`answer-${answer.id}`}
                                            className={optionProperties({
                                                active: field.value === answer.id.toString()
                                            })}
                                        >
                                            <RadioGroupItem value={answer.id.toString()} id={`answer-${answer.id}`} />
                                            <span>{answer.title}</span>
                                        </FormLabel>
                                    </FormControl>
                                ))}
                            </RadioGroup>
                        </FormItem>
                    )}
                />
                <Button type="submit" variant={'primary'} disabled={mutation.isPending}>
                    Responder
                </Button>
            </form>
        </Form>
    )
}
