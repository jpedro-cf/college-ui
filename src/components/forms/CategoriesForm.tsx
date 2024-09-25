import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCategory, useCreateCategory, useDeleteCategory, useUpdateCategory } from '@/services/categories'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { CheckCircle, XCircle } from 'lucide-react'
import { useEffect } from 'react'
import { ConfirmationDialog } from '../global/ConfirmationDialog'

export const CategoriesFormSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string()
})

export function CategoriesForm() {
    const [params] = useSearchParams()
    const categoryParam = params.get('category')

    const navigate = useNavigate()
    const category = useCategory(categoryParam ?? '')

    const createCategory = useCreateCategory()
    const updateCategory = useUpdateCategory()
    const deleteCategory = useDeleteCategory()

    const form = useForm<z.infer<typeof CategoriesFormSchema>>({
        resolver: zodResolver(CategoriesFormSchema)
    })

    function create(values: z.infer<typeof CategoriesFormSchema>) {
        createCategory.mutate(values, {
            onSuccess: () => {
                navigate('/categorias', { replace: true })
            }
        })
    }

    function update(values: z.infer<typeof CategoriesFormSchema>) {
        updateCategory.mutate(values, {
            onSuccess: () => {
                navigate('/categorias', { replace: true })
            }
        })
    }

    function handleDelete(id: string) {
        if (id) {
            deleteCategory.mutate(id, {
                onSuccess: () => {
                    navigate('/categorias', { replace: true })
                }
            })
        }
    }

    useEffect(() => {
        if (categoryParam && category.isSuccess && category.data) {
            form.reset({
                id: category.data.id,
                title: category.data.title
            })
        }
    }, [category.isSuccess, category.data, form, categoryParam])

    if (categoryParam && category.isLoading) {
        return 'Carregando...'
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(categoryParam ? update : create)} className="flex items-end gap-3">
                <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título da categoria *:</FormLabel>
                            <FormControl>
                                <Input
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Insira o título da categoria"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button variant={'primary'} disabled={createCategory.isPending || updateCategory.isPending}>
                    Enviar <CheckCircle className="ms-3" size={16} />{' '}
                </Button>
                {categoryParam && category.isSuccess && (
                    <ConfirmationDialog
                        variant={'destructive' as any}
                        label="Deletar"
                        icon={<XCircle className="ms-2" size={16} />}
                        disabled={deleteCategory.isPending}
                        onConfirmation={() => handleDelete(form.getValues('id') ?? '')}
                    />
                )}
            </form>
        </Form>
    )
}
