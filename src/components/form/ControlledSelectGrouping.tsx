import {
  Box,
  Chip,
  FormHelperText,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps
} from '@mui/material'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

interface ControlledSelectProps<TFieldValues extends FieldValues> {
  controller: UseControllerProps<TFieldValues>
  label: string
  labelId: string
  items: { groupName?: string; groupItems: string[] }[]
  placeholder?: string
  maxItems?: number
}

const ControlledSelectGrouping = <TFieldValues extends FieldValues>({
  controller,
  label,
  labelId,
  placeholder,
  items,
  maxItems,
  ...props
}: ControlledSelectProps<TFieldValues> & SelectProps) => {
  const {
    field,
    fieldState: { error }
  } = useController(controller)

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string[]
    if (maxItems && value.length > maxItems) {
      return
    }
    field.onChange(value)
  }

  const renderGroupedItems = () => {
    const selectedValues = field.value as string[] // current selected values
    return items.reduce((acc, group) => {
      acc.push(
        <ListSubheader key={group.groupName} sx={{ color: '#000000', fontWeight: '500' }}>
          {group.groupName}
        </ListSubheader>
      )
      group.groupItems.forEach((item) => {
        const isDisabled = !!(maxItems && selectedValues.length >= maxItems && !selectedValues.includes(item))
        acc.push(
          <MenuItem key={item} value={item} disabled={isDisabled}>
            {item}
          </MenuItem>
        )
      })
      return acc
    }, [] as JSX.Element[])
  }

  return (
    <>
      <InputLabel id={labelId} sx={{ marginBottom: '0.7rem', color: '#000000' }}>
        {label}
      </InputLabel>
      <Select
        {...props}
        {...field}
        error={!!error}
        labelId={labelId}
        onChange={handleChange}
        renderValue={(selected) =>
          (selected as string[]).length === 0 ? (
            placeholder
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )
        }
      >
        {renderGroupedItems()}
      </Select>
      {error ? <FormHelperText error>{error.message}</FormHelperText> : null}
    </>
  )
}

export default ControlledSelectGrouping
