import { QuestionsCard } from '@/components/questions/Card'
import { SkeletonCard } from '@/components/skeletons/SkeletonCard'
import { IQuestion } from '@/interfaces/Question'
import { useQuestions } from '@/services/questions'

export function QuestionsPage() {
    const questions = useQuestions()

    return (
        <>
            <h2 className="font-semibold text-xl">Todas as questões</h2>
            <span className="text-sm">Responda questões, teste suas habilidades e aprimore seu aprendizado.</span>

            {(questions.isLoading ||
                questions.isRefetching ||
                questions.isError ||
                questions.data?.questions?.length <= 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-9 mt-3">
                    {Array.from({ length: 6 }, (_, i) => i + 1).map((item) => (
                        <SkeletonCard key={item} />
                    ))}
                </div>
            )}

            {questions.isSuccess && questions.data?.questions?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-9 mt-5">
                    {questions.data.questions.map((question: IQuestion, index: number) => (
                        <QuestionsCard question={question} key={index} />
                    ))}
                </div>
            )}
        </>
    )
}
