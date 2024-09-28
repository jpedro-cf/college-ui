import { Filter } from '@/components/global/Filter'
import { Pagination } from '@/components/global/Pagination'
import { QuestionsCard } from '@/components/questions/Card'
import { SkeletonCard } from '@/components/skeletons/SkeletonCard'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import useDebounce from '@/hooks/useDebounce'
import { ICategory } from '@/interfaces/Category'
import { IQuestion } from '@/interfaces/Question'
import { useCategories } from '@/services/categories'
import { useQuestions } from '@/services/questions'
import { InfoIcon } from 'lucide-react'
import { useState } from 'react'

export function QuestionsPage() {
    const questions = useQuestions()

    const [search, setSearch] = useState<string | null>(null)
    const debounce = useDebounce(search, 700)

    const categories = useCategories(debounce ?? '')

    const groupOptions =
        categories.data?.categories?.map((c: ICategory) => {
            return {
                label: c.title,
                value: c.id
            }
        }) ?? []

    const filterGroups = [
        {
            name: 'Categorias',
            key: 'category',
            groupSearch: (value: string) => setSearch(value),
            options: groupOptions
        },
        {
            name: 'Data',
            key: 'date',
            options: [
                {
                    label: 'Mais recentes',
                    value: 'desc'
                },
                {
                    label: 'Mais antigos',
                    value: 'asc'
                }
            ]
        }
    ]

    return (
        <>
            <h2 className="font-semibold text-xl">Todas as questões</h2>
            <span className="text-sm">Responda questões, teste suas habilidades e aprimore seu aprendizado.</span>
            <Filter search={true} toParams={true} groups={filterGroups} />
            {(questions.isLoading || questions.isRefetching) && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-9 mt-3">
                    {Array.from({ length: 3 }, (_, i) => i + 1).map((item) => (
                        <SkeletonCard key={item} />
                    ))}
                </div>
            )}
            {(questions.data?.questions?.length <= 0 || questions.isError) && (
                <Alert className="mt-3">
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Oops!</AlertTitle>
                    <AlertDescription>
                        Infelizmente nenhuma questão foi encontrada, recarregue a página ou tente novamente mais tarde.
                    </AlertDescription>
                </Alert>
            )}
            {questions.isSuccess && questions.data?.questions?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-9 mt-5">
                    {questions.data.questions.map((question: IQuestion, index: number) => (
                        <QuestionsCard question={question} key={index} />
                    ))}
                </div>
            )}
            <Pagination />
        </>
    )
}
