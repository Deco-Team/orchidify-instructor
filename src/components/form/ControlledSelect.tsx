import { Box, Chip, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

interface ControlledSelectProps<TFieldValues extends FieldValues> {
  controller: UseControllerProps<TFieldValues>
  label: string
  labelId: string
  items: { name: string; value: string | number }[]
  multiple?: boolean
  renderChips?: boolean
}

const ControlledSelect = <TFieldValues extends FieldValues>({
  controller,
  label,
  labelId,
  placeholder,
  multiple = false,
  renderChips = true,
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
      <Select
        {...props}
        error={!!error}
        {...field}
        labelId={labelId}
        multiple={multiple}
        renderValue={
          multiple
            ? (selected) =>
                (selected as string[]).length === 0 ? (
                  placeholder
                ) : (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[])
                      // Sort based on the predefined day order
                      .sort(
                        (a, b) =>
                          items.findIndex((item) => item.value === a) - items.findIndex((item) => item.value === b)
                      )
                      .map((value, index) =>
                        renderChips ? (
                          <Chip key={value} label={items.find((item) => item.value === value)?.name} />
                        ) : index === 0 ? (
                          items.find((item) => item.value === value)?.name
                        ) : (
                          ', ' + items.find((item) => item.value === value)?.name
                        )
                      )}
                  </Box>
                )
            : undefined
        }
      >
        {!multiple && typeof field.value === 'string' && <MenuItem value=''>{placeholder}</MenuItem>}
        {!multiple && typeof field.value === 'number' && <MenuItem value={0}>{placeholder}</MenuItem>}
        {items.map((item) => (
          <MenuItem key={item.name} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {error ? <FormHelperText error>{error.message}</FormHelperText> : null}
    </>
  )
}

export default ControlledSelect
