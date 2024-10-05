import { Box, Chip, FormHelperText, InputLabel, ListSubheader, MenuItem, Select, SelectProps } from '@mui/material'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

interface ControlledSelectProps<TFieldValues extends FieldValues> {
  controller: UseControllerProps<TFieldValues>
  label: string
  labelId: string
  items: { groupName?: string; groupItems: string[] }[]
  placeholder?: string
}

const ControlledSelectGrouping = <TFieldValues extends FieldValues>({
  controller,
  label,
  labelId,
  placeholder,
  items,
  ...props
}: ControlledSelectProps<TFieldValues> & SelectProps) => {
  const {
    field,
    fieldState: { error }
  } = useController(controller)

  const renderGroupedItems = () => {
    return items.reduce((acc, group) => {
      acc.push(
        <ListSubheader key={group.groupName} sx={{ color: '#000000', fontWeight: '500' }}>
          {group.groupName}
        </ListSubheader>
      )
      group.groupItems.forEach((item) => {
        acc.push(
          <MenuItem key={item} value={item}>
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
