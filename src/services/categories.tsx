import { env } from '@/config/env'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useCategories = (search: string) => {
    const submit = async () => {
        const res = await axios.get(env.base_url + '/categories', {
            params: {
                search: search ?? '',
                per_page: 50
            },
            withCredentials: true
        })
        return res.data
    }
    return useQuery({
        queryKey: ['categories', search],
        queryFn: submit,
        refetchOnWindowFocus: false,
        retry: false
    })
}
