import { CategoryCard } from '@/components/categories/Card'
import { SkeletonCard } from '@/components/skeletons/SkeletonCard'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ICategory } from '@/interfaces/Category'
import { useCategories } from '@/services/categories'
import { InfoIcon } from 'lucide-react'

export function CategoriesPage() {
    const categories = useCategories('')

    return (
        <>
            <h2 className="font-semibold text-xl">Todas as categorias</h2>
            <span className="text-sm">Veja todas as categorias que fazem parte do nosso sistema.</span>

            {(categories.isLoading || categories.isRefetching) && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-9 mt-3">
                    {Array.from({ length: 6 }, (_, i) => i + 1).map((item) => (
                        <SkeletonCard key={item} />
                    ))}
                </div>
            )}
            {(categories.data?.categories?.length <= 0 || categories.isError) && (
                <Alert className="mt-3">
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Oops!</AlertTitle>
                    <AlertDescription>
                        Infelizmente nenhuma categoria foi encontrada, recarregue a página ou tente novamente mais
                        tarde.
                    </AlertDescription>
                </Alert>
            )}
            {categories.isSuccess && categories.data?.categories?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-9 mt-5">
                    {categories.data.categories.map((category: ICategory, index: number) => (
                        <CategoryCard category={category} key={index} />
                    ))}
                </div>
            )}
        </>
    )
}
