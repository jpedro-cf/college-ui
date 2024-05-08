import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { DiscordLogoIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { NavLink } from 'react-router-dom'

const DiscordConfirmation: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <div {...props}>
            <Alert className="py-5">
                <div>
                    <DiscordLogoIcon className="h-4 w-4 float-left mr-2" />
                    <AlertTitle>Aguardando confirmação!</AlertTitle>
                    <AlertDescription className="mt-3">
                        Cheque sua caixa de mensagens no discord para confirmar o seu registro na nossa plataforma.
                    </AlertDescription>
                    <NavLink to={'/login'}>
                        <Button variant={'primary'} className="mt-3">
                            Já realizei a confirmação.
                        </Button>
                    </NavLink>
                </div>
            </Alert>
        </div>
    )
}

export default DiscordConfirmation
