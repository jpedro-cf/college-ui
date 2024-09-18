import { useAnswersPerformance } from '@/services/answers'
import { SkeletonList } from '../skeletons/SkeletonList'
import { Skeleton } from '../ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { InfoIcon } from 'lucide-react'
import { PerformanceChart } from './Chart'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useState } from 'react'
import { subDays } from 'date-fns'

export const description = 'An interactive area chart'

export function DashboardPerformance() {
    const [timeRange, setTimeRange] = useState('1y')
    const [date, setDate] = useState(subDays(new Date(), 6))
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
            <div className="grid grid-cols-3  mt-5 gap-5">
                {performance.isLoading ||
                    (performance.isRefetching && (
                        <div className="grid grid-cols-3  mt-5 gap-5">
                            <Skeleton className="h-full w-full col-span-2" />

                            <SkeletonList />
                        </div>
                    ))}
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
                        </Card>
                    </>
                )}
            </div>
        </>
    )
}
