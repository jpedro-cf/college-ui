import { env } from '@/config/env'
import { IUser } from '@/interfaces/User'
import { LoadingPage } from '@/pages/LoadingPage'
import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextsTypes {
    user: IUser | null
    setUserFunction: (user: IUser | null) => void
}

const AuthContext = createContext<AuthContextsTypes | undefined>(undefined)

type Props = {
    children: string | JSX.Element | JSX.Element[]
}
export default function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(true)

    const setUserFunction = (user: IUser | null) => {
        setUser(user)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(env.base_url + '/auth/me', { withCredentials: true })
                setUser(response.data)
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [user])

    if (loading) {
        return <LoadingPage />
    }

    return <AuthContext.Provider value={{ user, setUserFunction }}> {children} </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
