import { CategoriesForm } from '@/components/forms/CategoriesForm'
import { QuestionForm } from '@/components/forms/QuestionForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UsersList } from '@/components/users/UsersList'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export function AdminPage() {
    const [params] = useSearchParams()
    const [tab, setTab] = useState(() => {
        const firstParam = Array.from(params.entries())[0] ?? ['question'] // Converte o iterador em um array
        return firstParam[0]
    })

    return (
        <>
            <h2 className="font-semibold text-xl">Administração</h2>
            <span className="text-sm">
                Organize, edite e controle todas as questões, categorias de conteúdo e usuários da plataforma.
            </span>
            <Tabs defaultValue={tab} className="w-full mt-5">
                <TabsList>
                    <TabsTrigger value="question">Questões</TabsTrigger>
                    <TabsTrigger value="category">Categorias</TabsTrigger>
                    <TabsTrigger value="user">Usuários</TabsTrigger>
                </TabsList>
                <TabsContent value="question">
                    <QuestionForm />
                </TabsContent>
                <TabsContent value="category">
                    <CategoriesForm />
                </TabsContent>
                <TabsContent value="user">
                    <UsersList />
                </TabsContent>
            </Tabs>
        </>
    )
}
