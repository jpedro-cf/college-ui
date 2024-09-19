import { useState } from 'react'
import { Input } from '../ui/input'
import { FormControl, FormItem, FormLabel } from '../ui/form'
import { Button } from '../ui/button'
import { PlusCircle, XCircle } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { cva } from 'class-variance-authority'
import { Control, useFieldArray, UseFormReturn } from 'react-hook-form'

const optionProperties = cva(
    'flex gap-3 items-center border cursor-pointer p-3 rounded-md w-full rounded-e-none transition-colors',
    {
        variants: {
            active: {
                true: 'bg-primary-200 dark:bg-primary-200 border border-primary-500 text-primary-600',
                false: 'bg-slate-200 dark:bg-stone-700 border-primary-300 dark:border-stone-700'
            }
        },
        defaultVariants: {
            active: false
        }
    }
)

interface IAnswer {
    id: number
    title: string
}

interface Props {
    onCorrectSelect: (id: number) => void
    form: UseFormReturn<any>
    name: string
}

export function QuestionAnswersField({ onCorrectSelect, form, name }: Props) {
    const [input, setInput] = useState('')
    const [selected, setSelected] = useState<number>()

    const {
        control,
        watch,
        setValue,
        getValues,
        formState: { errors }
    } = form
    const { fields, append, remove } = useFieldArray({
        control,
        name
    })
    const items = watch(name)

    const addItem = (value: string) => {
        if (value.length > 1) {
            const lastId = items.length > 0 ? items[items.length - 1].id : 0 // Pega o último id
            append({ id: Number(lastId) + 1, title: value })
        }
    }

    const deleteItem = (index: number) => {
        remove(index)
        // Renumera os ids no array
        const updatedAnswers = getValues(name).map((item: IAnswer, idx: number) => ({
            ...item,
            id: idx + 1
        }))
        setValue(name, updatedAnswers)
    }
    return (
        <>
            <div className="flex items-end gap-3 col-span-3">
                <FormItem>
                    <FormLabel>Adicionar questão</FormLabel>
                    <Input
                        placeholder="Digite o nome da questão"
                        value={input}
                        onChange={(field) => setInput(field.currentTarget.value)}
                    />
                </FormItem>
                <Button variant={'primary'} onClick={() => addItem(input)}>
                    Adicionar <PlusCircle className="ms-3" size={16} />
                </Button>
            </div>
            <FormItem className="mb-5">
                {errors[name] && (
                    <span className="text-red-400 text-sm leading-none">{errors?.[name]?.message as any}</span>
                )}
                <RadioGroup
                    onValueChange={(value) => {
                        onCorrectSelect(Number(value))
                        setSelected(Number(value))
                    }}
                    value={selected?.toString()}
                >
                    {items?.map((item: IAnswer, i: number) => (
                        <FormControl key={i}>
                            <div className="flex w-full">
                                <FormLabel
                                    htmlFor={`answer-${item.id}`}
                                    className={optionProperties({
                                        active: selected === i + 1
                                    })}
                                >
                                    <RadioGroupItem
                                        value={item.id.toString()}
                                        id={`answer-${item.id}`}
                                        className="border-white focus:border-primary"
                                    />
                                    <span>{item.title}</span>
                                </FormLabel>
                                <Button
                                    size={'icon'}
                                    variant={'destructive'}
                                    className="w-10 rounded-s-none h-full"
                                    onClick={() => deleteItem(item.id)}
                                >
                                    {' '}
                                    <XCircle size={16} />{' '}
                                </Button>
                            </div>
                        </FormControl>
                    ))}
                </RadioGroup>
            </FormItem>
        </>
    )
}
