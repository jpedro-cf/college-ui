import { IUser } from '@/interfaces/entities/User'
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext<IUser | null>(null)

type Props = {
    children: string | JSX.Element | JSX.Element[]
}
export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<IUser | null>(null)

    return <AuthContext.Provider value={user}> {children} </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}
