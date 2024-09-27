import { useState } from 'react'
import { Input } from '../ui/input'
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Button } from '../ui/button'
import { PlusCircle, XCircle } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { cva } from 'class-variance-authority'
import { Control, useFieldArray, UseFormReturn } from 'react-hook-form'

const optionProperties = cva(
    'flex gap-3 items-center border cursor-pointer p-3 rounded-md w-auto rounded-e-none transition-colors',
    {
        variants: {
            active: {
                true: 'bg-primary-200 dark:bg-primary-100 border border-primary-500 text-primary-600',
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
    disabled?: boolean
}

export function QuestionAnswersField({ onCorrectSelect, form, name, disabled }: Props) {
    const [input, setInput] = useState('')

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

    const items = watch(name)
    const selected = watch('correct')

    return (
        <>
            <div className="flex items-end gap-3 lg:col-span-3">
                <FormItem>
                    <FormLabel>Adicionar respostas *</FormLabel>
                    <Input
                        placeholder="Digite o nome da resposta"
                        value={input}
                        onChange={(field) => setInput(field.currentTarget.value)}
                    />
                </FormItem>
                <Button type="button" variant={'primary'} onClick={() => addItem(input)}>
                    Adicionar <PlusCircle className="ms-3" size={16} />
                </Button>
            </div>
            {errors[name] && (
                <span className="text-red-400 text-sm leading-none block col-span-3">
                    {errors?.[name]?.message as any}
                </span>
            )}
            <RadioGroup
                onValueChange={(value) => {
                    const selectedValue = Number(value)
                    onCorrectSelect(selectedValue)
                }}
                value={selected?.toString()}
                className="w-full"
            >
                {items?.map((item: IAnswer, i: number) => (
                    <div className="flex w-full" key={item.id}>
                        <FormLabel
                            htmlFor={`answer-${item.id}`}
                            className={optionProperties({
                                active: selected == item.id
                            })}
                        >
                            <RadioGroupItem
                                disabled={disabled}
                                value={item.id.toString()}
                                id={`answer-${item.id}`}
                                className="border-primary-300 focus:border-primary-800"
                            />
                        </FormLabel>
                        <Input
                            value={item.title}
                            onChange={(event) => {
                                const updatedItems = [...items]
                                updatedItems[i].title = event.currentTarget.value
                                setValue(name, updatedItems)
                            }}
                            placeholder="Resposta"
                            className="h-full rounded-e-none rounded-s-none"
                        />
                        <Button
                            size="icon"
                            variant="destructive"
                            className="w-10 rounded-s-none h-full"
                            onClick={() => deleteItem(i)}
                        >
                            <XCircle size={16} />
                        </Button>
                    </div>
                ))}
            </RadioGroup>
        </>
    )
}
