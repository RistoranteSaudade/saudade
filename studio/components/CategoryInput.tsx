import React from 'react'
import { set, unset, useFormValue, type StringInputProps } from 'sanity'
import { Select } from '@sanity/ui'

const BASE_OPTIONS = ['Accompagnamenti', 'Dolci', 'Vini', 'Cocktails']

export default function CategoryInput(props: StringInputProps) {
  const name = (useFormValue(['name']) as string | undefined) || ''
  const value = props.value || ''
  const options = name === 'Rodizio Saudade' || value === 'Le Carni'
    ? ['Le Carni', ...BASE_OPTIONS]
    : BASE_OPTIONS

  return (
    <Select
      value={value}
      onChange={(event) => props.onChange(event.currentTarget.value ? set(event.currentTarget.value) : unset())}
      fontSize={2}
      padding={3}
    >
      <option value="">Seleziona categoria</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  )
}
