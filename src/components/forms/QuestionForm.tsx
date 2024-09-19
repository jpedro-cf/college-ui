import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { ComboBox } from '../ui/combo-box'
import { useState } from 'react'
import { useCategories } from '@/services/categories'
import { ICategory } from '@/interfaces/Category'
import { Button } from '../ui/button'
import { Check, CheckCircle } from 'lucide-react'
import { QuestionAnswersField } from './QuestionAnswersField'

export const QuestionFormSchema = z
    .object({
        question: z.string(),
        material: z.string().optional().nullable(),
        category_id: z.string().optional().nullable(),
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
            return data.correct || data.answers.some((answer) => answer.id === data.correct)
        },
        {
            path: ['answers'], // Aponta o erro para o campo "answers"
            message: 'Selecione uma resposta válida.'
        }
    )

export function QuestionForm() {
    const [category, setCategory] = useState('')
    const categories = useCategories(category)

    const form = useForm<z.infer<typeof QuestionFormSchema>>({
        resolver: zodResolver(QuestionFormSchema)
    })

    function create(values: z.infer<typeof QuestionFormSchema>) {
        console.log(values)
    }

    function searchCategories(value: string) {
        setCategory(value)
    }

    const categoryItems = categories.isSuccess
        ? categories.data.categories.map((category: ICategory) => ({
              value: category.id, // Use o campo "id" como chave
              label: category.title // Use o campo "title" como valor
          }))
        : []

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(create)} className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
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
                    name="category_id"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categoria</FormLabel>
                            <FormControl>
                                <ComboBox
                                    label="Selecionar categoria"
                                    items={categoryItems}
                                    onSearchChange={searchCategories}
                                    onSelect={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <QuestionAnswersField
                    form={form}
                    name="answers"
                    onCorrectSelect={(selected: number) => form.setValue('correct', selected)}
                />
                <div className="col-span-3">
                    <Button variant={'primary'} type="submit">
                        Enviar <CheckCircle size={16} className="ms-3" />{' '}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
