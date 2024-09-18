import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonList() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
        </div>
    )
}
