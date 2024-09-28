import { IQuestion } from '@/interfaces/Question'
import { LibraryBig, PenBox } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { NavLink } from 'react-router-dom'
import { AnswerQuestionDialog } from './AnswerQuestionDialog'
import { useMemo } from 'react'
import { useAuth } from '@/context/AuthContext'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Props {
    question: IQuestion
}

export function QuestionsCard({ question }: Props) {
    const auth = useAuth()
    const isAdmin = useMemo(() => auth.user?.roles.some((r) => ['admin', 'manager'].includes(r)), [auth.user])
    return (
        <Card className="border bg-none border-stone-200 dark:border-stone-700">
            <CardHeader className="pb-2">
                <CardTitle className="flex justify-between">
                    <div className="flex gap-1 items-center">
                        <LibraryBig size={18} className="min-w-8" />
                        {question.question}
                    </div>
                    <span className="text-xs text-primary">
                        {format(question.createdAt, 'dd LLL yyyy', { locale: ptBR })}
                    </span>
                </CardTitle>
                <CardDescription className="text-primary dark:text-primary-300">
                    {question.answers.length} Opções
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
                <span className="text-sm text-foreground/60">Categorias</span>
                <div className="flex flex-wrap mt-1 gap-1">
                    {question.categories?.map((category, i) => (
                        <NavLink key={i} to={`/categorias/${category.id}`}>
                            <Badge variant={'outline'}>{category.title}</Badge>
                        </NavLink>
                    ))}
                    {(!question.categories || question.categories?.length <= 0) && (
                        <Badge variant={'outline'}>Sem categoria</Badge>
                    )}
                </div>
            </CardContent>
            <CardFooter className="border-t py-3 border-stone-200 dark:border-stone-700 space-x-3">
                {isAdmin && (
                    <NavLink to={`/admin?question=${question.id}`}>
                        <Button variant={'secondary'} size={'sm'}>
                            Editar <PenBox size={14} className="ms-3" />
                        </Button>
                    </NavLink>
                )}
                <AnswerQuestionDialog question={question} />
            </CardFooter>
        </Card>
    )
}
