import { PropsWithChildren, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'

interface Props {
    children: ReactNode
    roles: string[]
}

export default function ProtectedRoute({ children }: Props) {
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user === null) {
            navigate('/login', { replace: true })
        }
    }, [navigate, user])

    return children
}
