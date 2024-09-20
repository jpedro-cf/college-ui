import { useAuth } from '@/context/AuthContext'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AtSign, Key, SendHorizonal, SquareLibrary, User } from 'lucide-react'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PulseLoader } from 'react-spinners'
import { IUser } from '@/interfaces/User'
import { useRegisterMutation } from '@/services/auth'

export const RegisterFormSchema = z
    .object({
        name: z.string({
            required_error: 'Nome é obrigatório.'
        }),
        email: z.string({
            required_error: 'E-mail é obrigatório.'
        }),
        password: z.string({
            required_error: 'Senha é obrigatória.'
        }),
        password_confirmation: z.string({
            required_error: 'Confirmação de senha é obrigatória.'
        })
    })
    .refine((data) => data.password === data.password_confirmation, {
        path: ['password_confirmation'], // caminho do erro
        message: 'As senhas não coincidem.' // mensagem de erro
    })

export function RegisterPage() {
    const { mutate, isPending } = useRegisterMutation()
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/', { replace: true })
        }
    }, [])

    const handleLogin = (values: z.infer<typeof RegisterFormSchema>) => {
        mutate(values, {
            onSuccess: (data: IUser | string) => {
                navigate('/', { replace: true })
            }
        })
    }

    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema)
    })

    return (
        <div className="flex min-h-screen flex-wrap justify-center block">
            <div className="w-full lg:w-2/3  p-5 px-10 flex items-center justify-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLogin)} className="w-full xl:w-4/6">
                        <NavLink to={'/login'} className={'text-primary underline mb-3 block font-semibold'}>
                            {' '}
                            Voltar para o login{' '}
                        </NavLink>
                        <h1 className="text-2xl flex items-center gap-3 relative left-[-3px] font-semibold mb-2">
                            <SquareLibrary size={32} className="text-primary inline" />
                            Bem-vindo(a)!
                        </h1>
                        <h2 className="mb-5 text-sm">
                            Realize o registro abaixo para ter acesso a uma ampla gama de desafios e questões. Junte-se
                            a nós e amplie seus horizontes enquanto expande suas habilidades!
                        </h2>
                        <span className="text-2xl font-bold mb-3 block">Cadastro</span>
                        <div className="grid sm:grid-cols-2 gap-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Seu nome</FormLabel>
                                        <div className="flex">
                                            <Input
                                                value={field.value}
                                                onChange={field.onChange}
                                                type="text"
                                                placeholder="Nome"
                                                className="rounded-e-none h-11"
                                            />
                                            <span className="border border-stone-300 dark:border-stone-600 w-12 h-11 border-s-0 rounded-e-md px-1 flex items-center justify-center">
                                                <User size={14} />
                                            </span>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Seu e-mail</FormLabel>
                                        <div className="flex">
                                            <Input
                                                value={field.value}
                                                onChange={field.onChange}
                                                type="email"
                                                placeholder="E-mail"
                                                className="rounded-e-none h-11"
                                            />
                                            <span className="border border-stone-300 dark:border-stone-600 w-12 h-11 border-s-0 rounded-e-md px-1 flex items-center justify-center">
                                                <AtSign size={14} />
                                            </span>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sua senha</FormLabel>
                                        <div className="flex">
                                            <Input
                                                value={field.value}
                                                onChange={field.onChange}
                                                type="password"
                                                placeholder="******"
                                                className="rounded-e-none h-11"
                                            />
                                            <span className="border border-stone-300 dark:border-stone-600 w-12 h-11 border-s-0 rounded-e-md px-1 flex items-center justify-center">
                                                <Key size={14} />
                                            </span>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password_confirmation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Repita sua senha</FormLabel>
                                        <div className="flex">
                                            <Input
                                                value={field.value}
                                                onChange={field.onChange}
                                                type="password"
                                                placeholder="******"
                                                className="rounded-e-none h-11"
                                            />
                                            <span className="border border-stone-300 dark:border-stone-600 w-12 h-11 border-s-0 rounded-e-md px-1 flex items-center justify-center">
                                                <Key size={14} />
                                            </span>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button variant={'primary'} size={'lg'} className="mt-6 w-full">
                            {!isPending && (
                                <span className="flex items-center">
                                    Registrar-se <SendHorizonal className="ms-5" size={20} />
                                </span>
                            )}
                            {isPending && <PulseLoader color="#fff" size={8} />}
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="w-1/3 hidden lg:block min-h-screen bg-[linear-gradient(to_right_bottom,rgba(62,44,84,0.8),rgba(177,31,203,0.8)),url('/login-bg.jpg')]"></div>
        </div>
    )
}
