import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'
import { useEffect, useState } from 'react'

interface PaginationDemoProps {
    current: number
    total: number
    siblings: number
    onPageChange: (selected: number) => void
}

export function PaginationControlled({ ...props }: PaginationDemoProps) {
    const [isMobile, setIsMobile] = useState(false)

    // Detecta a largura da página para saber se é mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600) // Define o limite de largura para mobile
        }

        handleResize() // Executa a primeira vez que o componente monta
        window.addEventListener('resize', handleResize) // Escuta alterações de tamanho da janela

        return () => window.removeEventListener('resize', handleResize) // Remove o listener quando desmontar
    }, [])

    const generatePages = (current: number, total: number, siblings: number) => {
        // current = 10
        // siblings = 1
        // total = 40

        // siblins = 1 then totalNumbers = 5
        const totalNumbers = siblings * 2 + 3
        // totalBlocks = 7
        const totalBlocks = totalNumbers + 2

        // Show all pages if total is less or equal than 7
        if (total <= totalBlocks) {
            return Array.from({ length: total }, (_, i) => i + 1)
        }

        // current = 10, so 9 is the max
        const startPage = Math.max(current - siblings, 1)
        // current + siblings = 11, total is 20, so 11 is the minimum
        const endPage = Math.min(current + siblings, total)

        // Array of pages ( considering siblings is 1 )
        const pages = [
            //startPage = 9, so starts with [1,'...']
            ...(startPage > 2 ? [1, '...'] : startPage === 1 ? [] : [1]),
            ...Array.from(
                // startPage = 9 endPage = 11 then [3 items]
                { length: endPage - startPage + 1 },
                // [9,10,11]
                (_, i) => startPage + i
            ),
            // total - 1 = 19, and endPage is 11
            ...(endPage < total - 1
                ? // show ['...', 20]
                  ['...', total]
                : // if endPage is 20, show nothing at the end
                endPage === total
                ? []
                : // show total after all that
                  [total])
        ]

        return pages
    }

    const items = generatePages(props.current, props.total, props.siblings)

    return (
        <Pagination>
            <PaginationContent className="flex">
                <PaginationItem onClick={() => (props.current != 1 ? props.onPageChange((props.current -= 1)) : {})}>
                    <PaginationPrevious className="cursor-pointer" />
                </PaginationItem>
                {/* Condição para exibir a página atual apenas se for mobile */}
                {isMobile ? (
                    <PaginationItem>
                        <PaginationLink className="cursor-pointer" isActive>
                            {props.current}
                        </PaginationLink>
                    </PaginationItem>
                ) : (
                    // Renderiza todos os itens quando não estiver no modo mobile
                    items.map((item, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                className="cursor-pointer"
                                isActive={item == props.current}
                                onClick={() => (item != '...' ? props.onPageChange(item as number) : {})}
                            >
                                {item}
                            </PaginationLink>
                        </PaginationItem>
                    ))
                )}

                <PaginationItem
                    onClick={() => (props.current != props.total ? props.onPageChange((props.current += 1)) : {})}
                >
                    <PaginationNext className="cursor-pointer" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
