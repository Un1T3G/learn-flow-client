import { useMemo } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'

interface IProps<T> {
  value: any
  name: string
  placeholder?: string
  className?: string
  setFieldValue: (name: string, value: any) => void
  options: T[]
  keyField: keyof T
  labelField: keyof T
  valueField: keyof T
}

export const FormSelect = <T,>({
  value,
  name,
  placeholder,
  className,
  setFieldValue,
  options,
  keyField,
  labelField,
  valueField,
}: IProps<T>) => {
  const optionElements = useMemo(
    () =>
      options.map((item) => (
        <SelectItem
          key={item[keyField] as any}
          value={item[valueField] as string}
        >
          {item[labelField] as any}
        </SelectItem>
      )),
    [options, keyField, labelField, valueField]
  )

  return (
    <>
      <Select
        value={value}
        onValueChange={(value) => {
          setFieldValue(name, value)
        }}
      >
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{optionElements}</SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
