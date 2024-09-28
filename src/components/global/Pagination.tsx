import { usePagination } from '@/hooks/usePagination'

export function Pagination() {
    const pagination = usePagination({
        count: 30,
        defaultPage: 1,
        onChange: () => {},
        page: 28,
        siblingCount: 1
    })
    return <></>
}
