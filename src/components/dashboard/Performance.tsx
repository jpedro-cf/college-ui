import { useAnswersPerformance } from '@/services/answers'
import { SkeletonList } from '../skeletons/SkeletonList'
import { Skeleton } from '../ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { InfoIcon, SquareKanban } from 'lucide-react'
import { PerformanceChart } from './Chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useState } from 'react'
import { subDays, subYears } from 'date-fns'
import { Badge } from '../ui/badge'
import { NavLink } from 'react-router-dom'

export const description = 'An interactive area chart'

export function DashboardPerformance() {
    const [timeRange, setTimeRange] = useState('1y')
    const [date, setDate] = useState(subYears(new Date(), 1))
    const performance = useAnswersPerformance(date)

    if (performance.isError) {
        return (
            <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Não foi possível realizar essa operação!</AlertTitle>
                <AlertDescription>
                    Recarregue a página, verifique se está autenticado ou tente novamente mais tarde.
                </AlertDescription>
            </Alert>
        )
    }

    function handleDateChange(date: Date) {
        setDate(date)
    }

    return (
        <>
            {(performance.isLoading || performance.isRefetching) && (
                <div className="grid grid-cols-1 lg:grid-cols-3  mt-5 gap-5">
                    <Skeleton className="h-full w-full lg:col-span-2" />

                    <SkeletonList />
                </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3  mt-5 gap-5">
                {performance.isSuccess && (
                    <>
                        <PerformanceChart
                            performance={performance.data}
                            timeRange={timeRange}
                            setTimeRange={setTimeRange}
                            onTimeRangeChange={(date: Date) => handleDateChange(date)}
                        />
                        <Card className={'dark:border-stone-600'}>
                            <CardHeader className=" border-b dark:border-stone-600 py-5">
                                <div className="grid flex-1 gap-1 text-center sm:text-left">
                                    <CardTitle>Por categoria</CardTitle>
                                    <CardDescription>Análise feita por categoria</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="py-3">
                                <ul className="space-y-3">
                                    {performance.data.categories.map((category) => (
                                        <li className="flex items-center justify-between text-sm">
                                            <NavLink
                                                to={`/categorias/${category.id}`}
                                                className="flex gap-1 leading-0 font-semibold text-foreground/80"
                                            >
                                                <SquareKanban size={18} />
                                                <div>
                                                    <span className="block leading-3">{category.title}</span>
                                                    <span className="text-xs leading-3 text-foreground/60 font-normal">
                                                        Total: {category.total}
                                                    </span>
                                                </div>
                                            </NavLink>
                                            <div className="flex items-center gap-1">
                                                <Badge variant={'light_destructive'} className="p-0.5 px-1.5 text-xs">
                                                    {category.total - category.correct}
                                                </Badge>
                                                <Badge variant={'success'} className="p-0.5 px-1.5 text-xs">
                                                    {category.correct}
                                                </Badge>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </>
    )
}
