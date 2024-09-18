import { useEffect, useState } from 'react'
import {
  Box,
  FormHelperText,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme
} from '@mui/material'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { Cloud, Delete, InsertDriveFile } from '@mui/icons-material'
import CloudinaryUploadWidget from '../cloudinary/CloudinaryUploadWidget'
import { CloudinaryFileUploadedInfo } from '../cloudinary/cloudinary-type'
import { APP_MESSAGE } from '~/global/app-message'

interface ControlledFileInputProps<TFieldValues extends FieldValues> {
  controller: UseControllerProps<TFieldValues>
  label: string
  multiple?: boolean
  minFile: number
  maxFiles?: number
  clientAllowedFormats?: string[]
  maxFileSize?: { text: string; size: number }
  onUploadSuccess?: (files: CloudinaryFileUploadedInfo[]) => void
}

export const ControlledFileFieldUpload = <TFieldValues extends FieldValues>({
  controller,
  label,
  multiple,
  minFile,
  maxFiles = 20,
  clientAllowedFormats,
  maxFileSize,
  onUploadSuccess
}: ControlledFileInputProps<TFieldValues>) => {
  const theme = useTheme()
  const {
    field: { onChange, ...field },
    fieldState: { error }
  } = useController(controller)
  const [selectedFiles, setSelectedFiles] = useState<CloudinaryFileUploadedInfo[]>([])

  useEffect(() => {
    onChange(selectedFiles)
    if (onUploadSuccess) onUploadSuccess(selectedFiles)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiles])

  const handleUploadSuccess = (info: CloudinaryFileUploadedInfo) => {
    if (multiple) {
      setSelectedFiles((prev) => [...prev, info])
    } else {
      setSelectedFiles([info])
    }
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <InputLabel sx={{ color: '#000000' }}>{label}</InputLabel>
      <Box display='flex' alignItems={'center'}>
        <CloudinaryUploadWidget
          buttonStyle={{ marginRight: '8px' }}
          onSuccess={handleUploadSuccess}
          minFile={minFile}
          maxFiles={maxFiles - selectedFiles.length}
          clientAllowedFormats={clientAllowedFormats}
          maxFileSize={maxFileSize}
          multiple={multiple}
          disabled={maxFiles - selectedFiles.length === 0}
        />
        <OutlinedInput
          {...field}
          size='small'
          value={selectedFiles.map((file: CloudinaryFileUploadedInfo) => file.original_filename).join(', ')}
          disabled={!error}
          readOnly={!!error}
          error={!!error}
          sx={{
            flexGrow: 1
          }}
        />
      </Box>
      {error ? <FormHelperText error>{error.message}</FormHelperText> : null}
      {selectedFiles.length ? (
        <Box maxWidth='100%' overflow={'auto'}>
          <ImageList sx={{ width: 'fit-content', display: 'flex', m: 0, gap: '8px !important' }}>
            {selectedFiles.map((image, index) => (
              <ImageListItem key={image.public_id} sx={{ width: '200px', height: '200px !important' }}>
                <img src={image.url} alt={image.display_name} style={{ height: '100%', borderRadius: 4 }} />
                <ImageListItemBar
                  sx={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
                  }}
                  position='top'
                  actionIcon={
                    <IconButton sx={{ color: theme.palette.error.main }} onClick={() => handleRemoveFile(index)}>
                      <Delete />
                    </IconButton>
                  }
                  actionPosition='right'
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      ) : null}
    </Box>
  )
}

export const ControlledFileAreaUpload = <TFieldValues extends FieldValues>({
  controller,
  label,
  multiple,
  minFile,
  maxFiles = 20,
  clientAllowedFormats,
  maxFileSize,
  onUploadSuccess
}: ControlledFileInputProps<TFieldValues>) => {
  const theme = useTheme()
  const {
    field: { onChange },
    fieldState: { error }
  } = useController(controller)
  const [selectedFiles, setSelectedFiles] = useState<CloudinaryFileUploadedInfo[]>([])

  useEffect(() => {
    onChange(selectedFiles)
    if (onUploadSuccess) onUploadSuccess(selectedFiles)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiles])

  const handleUploadSuccess = (info: CloudinaryFileUploadedInfo) => {
    if (multiple) {
      setSelectedFiles((prev) => [...prev, info])
    } else {
      setSelectedFiles([info])
    }
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <InputLabel sx={{ color: '#000000' }}>{label}</InputLabel>
      {selectedFiles.length ? (
        <Box maxWidth='100%' overflow={'auto'}>
          <ImageList sx={{ width: 'fit-content', display: 'flex', m: 0, gap: '8px !important' }}>
            {selectedFiles.map((file, index) => (
              <ImageListItem key={file.public_id} sx={{ width: '200px', height: '200px !important' }}>
                {file.resource_type === 'video' ? (
                  <video width='200' height='200' controls>
                    <source src={file.url} type='video/mp4' />
                    {APP_MESSAGE.LOAD_DATA_FAILED('video')}
                  </video>
                ) : file.resource_type === 'image' ? (
                  <img src={file.url} alt={file.display_name} style={{ height: '100%' }} />
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexGrow: 1
                    }}
                  >
                    <InsertDriveFile sx={{ width: 150, height: 150 }} />
                    <Typography variant='subtitle2'>{file.original_filename}</Typography>
                  </Box>
                )}

                <ImageListItemBar
                  sx={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
                  }}
                  position='top'
                  actionIcon={
                    <IconButton sx={{ color: theme.palette.error.main }} onClick={() => handleRemoveFile(index)}>
                      <Delete />
                    </IconButton>
                  }
                  actionPosition='right'
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      ) : null}
      {maxFiles - selectedFiles.length ? (
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          minHeight={200}
          border={`1px solid ${error ? theme.palette.error.main : '#0000001F'}`}
        >
          <Box display='flex' flexDirection='column' alignItems='center' paddingBottom={2}>
            <Cloud sx={{ width: 35, height: 35 }} color='primary' />
            <Typography variant='caption' margin='10px 0'>
              Bấm tải lên
            </Typography>
            <CloudinaryUploadWidget
              buttonStyle={{ width: 'fit-content' }}
              onSuccess={handleUploadSuccess}
              minFile={minFile}
              maxFiles={maxFiles - selectedFiles.length}
              clientAllowedFormats={clientAllowedFormats}
              maxFileSize={maxFileSize}
              multiple={multiple}
              disabled={maxFiles - selectedFiles.length === 0}
            />
          </Box>
        </Box>
      ) : null}
      {error ? <FormHelperText error>{error.message}</FormHelperText> : null}
    </Box>
  )
}
