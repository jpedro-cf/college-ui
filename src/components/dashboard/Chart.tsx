import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SkeletonCard } from '../skeletons/SkeletonCard'
import { IPerformance } from '@/interfaces/Performance'
import { subDays, subMonths, subYears } from 'date-fns'
import { date } from 'zod'

export const description = 'An interactive area chart'

const chartConfig = {
    visitors: {
        label: 'Corretas'
    },
    correct: {
        label: 'Corretas',
        color: 'hsl(var(--primary))'
    },
    incorrect: {
        label: 'Incorretas',
        color: 'hsl(var(--chart-5))'
    }
} satisfies ChartConfig

interface Props {
    performance: IPerformance
    timeRange: string
    setTimeRange: (data: string) => void
    onTimeRangeChange: (date: Date) => void
}
export function PerformanceChart({ performance, timeRange, setTimeRange, onTimeRangeChange }: Props) {
    const dateMap: { [key: string]: Date } = {
        '1y': subYears(new Date(), 1),
        '6m': subMonths(new Date(), 6),
        '3m': subMonths(new Date(), 3),
        '30d': subDays(new Date(), 30)
    }

    function timeRangeChange(selected: string) {
        setTimeRange(selected)
        onTimeRangeChange(dateMap[selected] ?? '1y')
    }

    return (
        <Card className="dark:border-stone-600 col-span-2">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b dark:border-stone-600 py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Performance geral</CardTitle>
                    <CardDescription>Veja sua performance abaixo</CardDescription>
                </div>
                <Select value={timeRange} onValueChange={timeRangeChange}>
                    <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Filtrar por data">
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="1y" className="rounded-lg">
                            Último ano
                        </SelectItem>
                        <SelectItem value="6m" className="rounded-lg">
                            Últimos 6 meses
                        </SelectItem>
                        <SelectItem value="3m" className="rounded-lg">
                            Últimos 3 meses
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Últimos 30 dias
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                    <AreaChart data={performance.performance}>
                        <defs>
                            <linearGradient id="fillCorrect" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-correct)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-correct)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillIncorrect" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-incorrect)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-incorrect)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="correct"
                            type="natural"
                            fill="url(#fillCorrect)"
                            stroke="var(--color-correct)"
                            stackId="a"
                        />
                        <Area
                            dataKey="incorrect"
                            type="natural"
                            fill="url(#fillIncorrect)"
                            stroke="var(--color-incorrect)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
