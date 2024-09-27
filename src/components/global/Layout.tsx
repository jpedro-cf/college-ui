import { PropsWithChildren } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

type Props = PropsWithChildren

export const Layout = ({ children }: Props) => {
    return (
        <div className="block xl:flex w-full bg-slate-200/50 dark:bg-stone-900 min-h-screen">
            <Sidebar />
            <Header />
            <main className="ml-0 xl:ml-[250px] w-full m-5 bg-[#fff] dark:bg-stone-800 rounded-md p-5 me-0 mb-0">
                {children}
            </main>
        </div>
    )
}
