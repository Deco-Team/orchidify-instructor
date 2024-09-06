import { FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

interface ControlledSelectProps<TFieldValues extends FieldValues> {
  controller: UseControllerProps<TFieldValues>
  label: string
  labelId: string
  items: { name: string; value: string | number }[]
}

const ControlledSelect = <TFieldValues extends FieldValues>({
  controller,
  label,
  labelId,
  items,
  ...props
}: ControlledSelectProps<TFieldValues> & SelectProps) => {
  const {
    field,
    fieldState: { error }
  } = useController(controller)

  return (
    <>
      <InputLabel id={labelId} sx={{ marginBottom: '0.7rem', color: '#000000' }}>
        {label}
      </InputLabel>
      <Select labelId={labelId} error={!!error} {...field} {...props}>
        {items.map((item) => (
          <MenuItem key={item.name} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {error ? <FormHelperText>{error.message}</FormHelperText> : null}
    </>
  )
}

export default ControlledSelect
