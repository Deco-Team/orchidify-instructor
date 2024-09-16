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
    <Box sx={{ ...sx, display: 'flex', flexDirection: 'column' }}>
      <InputLabel sx={{ color: '#000000' }}>{label}</InputLabel>
      <Box>
        <OutlinedInput error={!!error} {...field} {...props} />
        {error ? <FormHelperText error>{error.message}</FormHelperText> : null}
      </Box>
    </Box>
  )
}

export default ControlledOutlinedInput
