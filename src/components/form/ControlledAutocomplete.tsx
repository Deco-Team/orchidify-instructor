import {
  Autocomplete,
  Box,
  createFilterOptions,
  FormHelperText,
  InputLabel,
  TextField,
  TextFieldProps
} from '@mui/material'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { APP_MESSAGE } from '~/global/app-message'

interface ControlledAutocompleteProps<TFieldValues extends FieldValues> {
  controller: UseControllerProps<TFieldValues>
  options: string[]
  label: string
}

const ControlledAutocomplete = <TFieldValues extends FieldValues>({
  controller,
  options,
  label,
  ...props
}: ControlledAutocompleteProps<TFieldValues> & TextFieldProps) => {
  const {
    field,
    fieldState: { error }
  } = useController(controller)

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option: string) => option
  })
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <InputLabel sx={{ color: '#000000' }}>{label}</InputLabel>
      <Box>
        <Autocomplete
          {...field}
          size='small'
          disablePortal
          filterOptions={filterOptions}
          noOptionsText={APP_MESSAGE.THERE_IS_NO_SEARCH_RESULT}
          options={options}
          renderInput={(params) => <TextField {...params} error={!!error} {...props} variant='outlined' />}
          onChange={(_, data) => field.onChange(data)}
        />
        {error && <FormHelperText error>{error.message}</FormHelperText>}
      </Box>
    </Box>
  )
}

export default ControlledAutocomplete
