import { env } from '@/config/env'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useQuestions = () => {
    const submit = async () => {
        const res = await axios.get(env.base_url + '/questions', {
            params: {
                search: ''
            },
            withCredentials: true
        })
        return res.data
    }
    return useQuery({
        queryKey: ['questions'],
        queryFn: submit
    })
}
