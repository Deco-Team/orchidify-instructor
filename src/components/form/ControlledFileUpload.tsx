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
import { Cloud, Delete, InsertDriveFileOutlined } from '@mui/icons-material'
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
              <ImageListItem key={image.public_id} sx={{ width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                <img src={image.url} alt={image.display_name} style={{ width: '200px', height: '200px' }} />
                <ImageListItemBar
                  sx={{
                    height: '58px',
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, ' + 'rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 100%)',
                    '.MuiImageListItemBar-actionIcon': {
                      mr: 1
                    }
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
              <ImageListItem key={file.public_id} sx={{ width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                {file.resource_type === 'video' ? (
                  <video width='100%' height='250' controls>
                    <source src={file.url} type='video/mp4' />
                    {APP_MESSAGE.LOAD_DATA_FAILED('video')}
                  </video>
                ) : file.resource_type === 'image' ? (
                  <img src={file.url} alt={file.display_name} style={{ width: '200px', height: '200px' }} />
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      width: '250px',
                      border: '1px solid #0000001F',
                      borderRadius: 1,
                      p: 2
                    }}
                  >
                    <InsertDriveFileOutlined sx={{ width: 24, height: 24 }} />
                    <Typography
                      variant='subtitle2'
                      sx={{ width: '100%', mr: 3, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                    >
                      {file.original_filename}
                    </Typography>
                  </Box>
                )}

                <ImageListItemBar
                  sx={{
                    height: '58px',
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, ' + 'rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 100%)',
                    '.MuiImageListItemBar-actionIcon': {
                      mr: 1
                    }
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
