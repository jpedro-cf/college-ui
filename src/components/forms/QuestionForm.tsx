import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { useEffect, useState } from 'react'
import { useCategories } from '@/services/categories'
import { ICategory } from '@/interfaces/Category'
import { Button } from '../ui/button'
import { CheckCircle } from 'lucide-react'
import { QuestionAnswersField } from './QuestionAnswersField'
import useDebounce from '@/hooks/useDebounce'
import { useCreateQuestion, useQuestion, useUpdateQuestion } from '@/services/questions'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MultiSelect } from '../ui/multi-select'

export const QuestionFormSchema = z
    .object({
        id: z.string().uuid().optional().nullable(),
        question: z.string(),
        material: z.string().optional().nullable(),
        categories: z.array(z.string()).nullable(),
        answers: z.array(
            z.object({
                id: z.number(),
                title: z.string()
            })
        ),
        correct: z.number().optional().nullable()
    })
    .refine(
        (data) => {
            // Valida se o campo correct está vazio ou corresponde a algum ID em answers
            return data.answers.some((answer) => answer.id == data.correct) && data.correct
        },
        {
            path: ['answers'], // Aponta o erro para o campo "answers"
            message: 'Selecione uma resposta válida.'
        }
    )

export function QuestionForm() {
    const navigate = useNavigate()

    const [params] = useSearchParams()
    const questionParam = params.get('question')
    const question = useQuestion(questionParam ?? '')

    const [category, setCategory] = useState('')
    const debouncedCategory = useDebounce(category, 700)
    const categories = useCategories(debouncedCategory)

    const createQuestion = useCreateQuestion()
    const updateQuestion = useUpdateQuestion()

    const form = useForm<z.infer<typeof QuestionFormSchema>>({
        resolver: zodResolver(QuestionFormSchema)
    })

    function create(values: z.infer<typeof QuestionFormSchema>) {
        createQuestion.mutate(values, {
            onSuccess: () => {
                navigate('/', { replace: true })
            }
        })
    }

    function update(values: z.infer<typeof QuestionFormSchema>) {
        updateQuestion.mutate(values, {
            onSuccess: () => {
                navigate('/', { replace: true })
            }
        })
    }

    function searchCategories(value: string) {
        setCategory(value)
    }

    const mapCategories = (data: Array<any>) => {
        return data.map((category: ICategory) => ({
            value: category.id, // Use o campo "id" como chave
            label: category.title // Use o campo "title" como valor
        }))
    }

    const categoryItems = categories.isSuccess ? mapCategories(categories.data.categories) : []

    useEffect(() => {
        if (question.isSuccess && question.data) {
            form.reset({
                id: question.data.id,
                question: question.data.question,
                material: question.data.material,
                categories: question.data.categories.map((c: ICategory) => c.id),
                answers: question.data.answers,
                correct: question.data.correct_answer_id
            })
        }
    }, [question.isSuccess, question.data, form])

    if (questionParam && question.isLoading) {
        return 'Carregando...'
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(questionParam ? update : create)}
                className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5"
            >
                <FormField
                    name="question"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título da questão *</FormLabel>
                            <FormControl>
                                <Input
                                    value={field.value}
                                    onChange={field.onChange}
                                    type="text"
                                    placeholder="Insira o título da questão"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="material"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Material para leitura</FormLabel>
                            <FormControl>
                                <Input
                                    value={field.value ?? ''}
                                    onChange={field.onChange}
                                    type="text"
                                    placeholder="Insira uma URL para leitura (Blog, artigos, etc)"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="categories"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categoria</FormLabel>
                            <FormControl>
                                <MultiSelect
                                    multiple={true}
                                    onSearchChange={searchCategories}
                                    emptyText="Nenhuma categoria encontrada"
                                    searchPlaceholder="Pesquisar"
                                    selectPlaceholder="Selecionar categorias"
                                    options={categoryItems}
                                    value={field.value ?? undefined}
                                    onValueChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <QuestionAnswersField
                    disabled={questionParam ? true : false}
                    form={form}
                    name="answers"
                    onCorrectSelect={(selected: number) => {
                        form.setValue('correct', selected)
                    }}
                />
                <div className="col-span-3">
                    <Button variant={'primary'} type="submit" disabled={createQuestion.isPending}>
                        Enviar <CheckCircle size={16} className="ms-3" />{' '}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
