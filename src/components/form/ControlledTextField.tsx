import { InputLabel, TextField, TextFieldProps } from '@mui/material'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

interface ControlledTextFieldProps<TFieldValues extends FieldValues> {
  controller: UseControllerProps<TFieldValues>
  label: string
}

const ControlledTextField = <TFieldValues extends FieldValues>({
  controller,
  label,
  ...props
}: ControlledTextFieldProps<TFieldValues> & TextFieldProps) => {
  const {
    field,
    fieldState: { error }
  } = useController(controller)

  return (
    <>
      <InputLabel sx={{ marginBottom: '0.7rem', color: '#000000' }}>{label}</InputLabel>
      <TextField error={!!error} helperText={error?.message} {...field} {...props} />
    </>
  )
}

export default ControlledTextField
