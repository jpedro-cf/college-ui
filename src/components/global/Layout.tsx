import { PropsWithChildren } from 'react'
import { Sidebar } from './Sidebar'

type Props = PropsWithChildren

export const Layout = ({ children }: Props) => {
    return (
        <div className="flex bg-slate-200/50 dark:bg-stone-900 min-h-screen">
            <Sidebar />
            <main className="lg:ml-[250px] w-full m-5 bg-[#fff] dark:bg-stone-800 rounded-md p-5 me-0 mb-0">
                {children}
            </main>
        </div>
    )
}
