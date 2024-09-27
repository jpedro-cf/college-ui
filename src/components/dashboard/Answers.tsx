import { useAnswers } from '@/services/answers'
import { InfoIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { SkeletonList } from '../skeletons/SkeletonList'
import { IAnswer } from '@/interfaces/Answer'
import { AnswerCard } from '../answers/Card'

export function UserAnswers() {
    const answers = useAnswers()
    if (answers.isError) {
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
    return (
        <>
            {(answers.isLoading || answers.isRefetching) && <SkeletonList />}
            {answers.isSuccess && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                    {answers.data.answers.map((answer: IAnswer) => (
                        <AnswerCard answer={answer} />
                    ))}
                </div>
            )}
        </>
    )
}
