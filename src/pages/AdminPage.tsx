import { QuestionForm } from '@/components/forms/QuestionForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function AdminPage() {
    return (
        <>
            <h2 className="font-semibold text-xl">Administração</h2>
            <span className="text-sm">
                Organize, edite e controle todas as questões, categorias de conteúdo e usuários da plataforma.
            </span>
            <Tabs defaultValue="questions" className="w-full mt-5">
                <TabsList>
                    <TabsTrigger value="questions">Questões</TabsTrigger>
                    <TabsTrigger value="categories">Categorias</TabsTrigger>
                    <TabsTrigger value="users">Usuários</TabsTrigger>
                </TabsList>
                <TabsContent value="questions">
                    <QuestionForm />
                </TabsContent>
                <TabsContent value="categories"></TabsContent>
                <TabsContent value="users"></TabsContent>
            </Tabs>
        </>
    )
}
