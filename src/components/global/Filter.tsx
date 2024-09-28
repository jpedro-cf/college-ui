import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useSearchParams } from 'react-router-dom'
import { Input } from '../ui/input'
import useDebounce from '@/hooks/useDebounce'
import { useEffect, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

interface IOption {
    label: string
    value: string
}

interface IOptionGroup {
    name: string
    key: string
    groupSearch?: (value: string) => void
    options: IOption[]
}

interface Props {
    toParams?: boolean
    groups?: IOptionGroup[]
    search?: boolean
    onSearch?: (value: string) => void
    onOptionSelected?: (group: IOptionGroup, option: IOption) => void
}

export function Filter({ search, groups, ...props }: Props) {
    const [searchParams, setSearchParams] = useSearchParams()

    const [searchString, setSearchString] = useState<string | null>(null)
    const searchDebounce = useDebounce(searchString, 700)

    const handleOptionSelected = (group: IOptionGroup, option: IOption) => {
        const selectedValue = isActive(group, option) ? '' : option.value
        props.onOptionSelected?.(group, { ...option, value: selectedValue })

        if (props.toParams) {
            const currentParams = Object.fromEntries(searchParams.entries())
            // Atualiza os parâmetros mantendo os antigos e adicionando o novo
            setSearchParams({ ...currentParams, [group.key]: selectedValue ?? null })
        }
    }

    const handleSearch = () => {
        if (searchDebounce == null) {
            return
        }

        if (props.onSearch) {
            props.onSearch(searchDebounce)
        }

        if (props.toParams) {
            const currentParams = Object.fromEntries(searchParams.entries())
            setSearchParams({ ...currentParams, search: searchDebounce })
        }
    }

    const isActive = (group: IOptionGroup, option: IOption): boolean => {
        const current = searchParams.get(group.key)
        if (current == option.value) {
            return true
        }
        return false
    }

    useEffect(() => {
        handleSearch()
    }, [searchDebounce])

    return (
        <div className="mt-3 flex items-center gap-3 max-w-full">
            {search && (
                <Input
                    placeholder="Pesquisar"
                    className="w-auto max-w-[190px]"
                    onChange={(event) => setSearchString(event.currentTarget.value)}
                />
            )}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size={'sm'} className="h-9">
                        Filtrar <ChevronsUpDown className="ms-2" size={12} />{' '}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 pb-0">
                    {groups?.map((group, i) => (
                        <div key={i}>
                            <DropdownMenuLabel>{group.name}</DropdownMenuLabel>
                            {group.groupSearch && (
                                <Input
                                    className="h-8 mb-2"
                                    placeholder="Pesquisar"
                                    onChange={(event) => group.groupSearch?.(event.currentTarget.value)}
                                />
                            )}
                            <DropdownMenuGroup>
                                {group.options?.map((option, i) => (
                                    <DropdownMenuItem
                                        key={i}
                                        className="cursor-pointer text-sm justify-between text-stone-700"
                                        onClick={() => handleOptionSelected(group, option)}
                                    >
                                        {option.label}
                                        {isActive(group, option) && <Check size={14} />}
                                    </DropdownMenuItem>
                                ))}
                                {group.options.length <= 0 && (
                                    <DropdownMenuItem>Nenhum item encontrado</DropdownMenuItem>
                                )}
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator className="mb-0 bg-stone-200" />
                        </div>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
