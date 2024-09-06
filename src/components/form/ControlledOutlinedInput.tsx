import { Box, FormHelperText, InputLabel, OutlinedInput, OutlinedInputProps } from '@mui/material'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

interface ControlledOutlinedInputProps<TFieldValues extends FieldValues> {
  controller: UseControllerProps<TFieldValues>
  label: string
}

const ControlledOutlinedInput = <TFieldValues extends FieldValues>({
  controller,
  label,
  sx,
  ...props
}: ControlledOutlinedInputProps<TFieldValues> & OutlinedInputProps) => {
  const {
    field,
    fieldState: { error }
  } = useController(controller)

  return (
    <Box sx={sx}>
      <InputLabel sx={{ marginBottom: '0.7rem', color: '#000000' }}>{label}</InputLabel>
      <OutlinedInput error={!!error} {...field} {...props} />
      {error ? <FormHelperText error>{error.message}</FormHelperText> : null}
    </Box>
  )
}

export default ControlledOutlinedInput
