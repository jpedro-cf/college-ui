import { PropsWithChildren, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'

interface Props {
    children: ReactNode
    roles: string[]
}

export default function ProtectedRoute({ children, roles }: Props) {
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user === null) {
            navigate('/', { replace: true })
        }
        if (!user?.roles.every((r) => roles.includes(r))) {
            navigate('/', { replace: true })
        }
    }, [navigate, user])

    return children
}
