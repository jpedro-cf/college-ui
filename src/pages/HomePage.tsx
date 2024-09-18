import { DashboardPerformance } from '@/components/dashboard/Performance'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAnswersPerformance } from '@/services/answers'

export function HomePage() {
    return (
        <>
            <h2 className="font-semibold text-xl">Dashboard</h2>
            <span className="text-sm">
                Acompanhe métricas como acertos, erros, tempo de resposta e evolução, obtendo insights valiosos para
                melhorar a eficiência e o aprendizado.
            </span>
            <Tabs defaultValue="dashboard" className="w-full mt-5">
                <TabsList>
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="answers">Questões respondidas</TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard">
                    <DashboardPerformance />{' '}
                </TabsContent>
                <TabsContent value="answers">Answers</TabsContent>
            </Tabs>
        </>
    )
}
