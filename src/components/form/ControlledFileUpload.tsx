import React, { useEffect, useState } from 'react'
import {
  Avatar,
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
    fieldState: { error },
    formState: { defaultValues }
  } = useController(controller)
  const [selectedFiles, setSelectedFiles] = useState<CloudinaryFileUploadedInfo[]>(
    (controller.name
      .split('.')
      .reduce((acc, cur) => acc && acc[cur], defaultValues) as unknown as CloudinaryFileUploadedInfo[]) || []
  )

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
    fieldState: { error },
    formState: { defaultValues }
  } = useController(controller)
  const [selectedFiles, setSelectedFiles] = useState<CloudinaryFileUploadedInfo[]>(
    (controller.name
      .split('.')
      .reduce((acc, cur) => acc && acc[cur], defaultValues) as unknown as CloudinaryFileUploadedInfo[]) || []
  )

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
        <Box maxWidth='100%' overflow={'auto'} position={'relative'}>
          {selectedFiles.map((file, index) =>
            file.resource_type === 'video' ? (
              <React.Fragment key={file.public_id}>
                <video
                  controls
                  style={{ width: '100%', height: '408px', borderRadius: 4, backgroundColor: '#00000025' }}
                >
                  <source src={file.url} type='video/mp4' />
                  {APP_MESSAGE.LOAD_DATA_FAILED('video')}
                </video>
                <IconButton
                  sx={{ color: theme.palette.error.main, position: 'absolute', right: 8, top: 8 }}
                  onClick={() => handleRemoveFile(index)}
                >
                  <Delete />
                </IconButton>
              </React.Fragment>
            ) : (
              (file.resource_type === 'raw' || (file.resource_type === 'image' && file.format === 'pdf')) && (
                <Box
                  key={file.public_id}
                  sx={{
                    display: 'flex',
                    background: '#f4f4f4',
                    p: 2,
                    borderRadius: 2,
                    border: '2px solid #d7d7d7',
                    alignItems: 'center',
                    width: '250px'
                  }}
                >
                  <InsertDriveFileOutlined />
                  <Typography
                    variant='subtitle1'
                    sx={{ width: '100%', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', ml: 1 }}
                  >
                    {file.original_filename}
                  </Typography>
                  <IconButton
                    size='small'
                    sx={{ color: theme.palette.error.main }}
                    onClick={() => handleRemoveFile(index)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              )
            )
          )}
          <ImageList sx={{ width: 'fit-content', display: 'flex', m: 0, gap: '8px !important' }}>
            {selectedFiles.map(
              (file, index) =>
                file.resource_type === 'image' &&
                file.format !== 'pdf' && (
                  <ImageListItem key={file.public_id} sx={{ width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                    <img src={file.url} alt={file.display_name} style={{ width: '200px', height: '200px' }} />
                    <ImageListItemBar
                      sx={{
                        height: '58px',
                        background:
                          'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, ' +
                          'rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 100%)',
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
                )
            )}
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

//For upload avatar image
export const ControlledAvatarImageUpload = <TFieldValues extends FieldValues>({
  controller,
  clientAllowedFormats,
  maxFileSize,
  onUploadSuccess
}: ControlledFileInputProps<TFieldValues>) => {
  const theme = useTheme()
  const {
    field: { onChange, ...field },
    fieldState: { error },
    formState: { defaultValues }
  } = useController(controller)
  const [selectedFiles, setSelectedFiles] = useState<CloudinaryFileUploadedInfo[]>(
    (controller.name
      .split('.')
      .reduce((acc, cur) => acc && acc[cur], defaultValues) as unknown as CloudinaryFileUploadedInfo[]) || []
  )

  useEffect(() => {
    onChange(selectedFiles)
    if (onUploadSuccess) onUploadSuccess(selectedFiles)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiles])

  const handleUploadSuccess = (info: CloudinaryFileUploadedInfo) => {
    setSelectedFiles([info])
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box display='flex' flexDirection={'column'} gap={2} alignItems={'center'}>
        <Box position={'relative'}>
          <Avatar
            src={selectedFiles.length > 0 ? selectedFiles[0].url : ''}
            alt='avatar'
            variant='circular'
            sx={{ width: 160, height: 160, objectFit: 'cover' }}
          />
          {selectedFiles.length > 0 && (
            <IconButton
              size='large'
              sx={{
                color: theme.palette.error.main,
                width: '160px',
                height: '160px',
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translate(-50%, 0)',
                opacity: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                transition: 'opacity 0.3s',
                '&:hover': {
                  opacity: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)'
                }
              }}
              onClick={() => handleRemoveFile(0)}
            >
              <Delete fontSize='large' />
            </IconButton>
          )}
          {error ? (
            <FormHelperText
              error
              sx={{
                maxWidth: '160px'
              }}
            >
              {error.message}
            </FormHelperText>
          ) : null}
        </Box>

        <CloudinaryUploadWidget
          buttonStyle={{ width: 'fit-content' }}
          onSuccess={handleUploadSuccess}
          minFile={1}
          maxFiles={1 - selectedFiles.length}
          clientAllowedFormats={clientAllowedFormats}
          maxFileSize={maxFileSize}
          multiple={false}
          disabled={1 - selectedFiles.length === 0}
        />
        <OutlinedInput
          {...field}
          size='small'
          value={selectedFiles.map((file: CloudinaryFileUploadedInfo) => file.original_filename).join(', ')}
          disabled={!error}
          readOnly={!!error}
          error={!!error}
          sx={{
            flexGrow: 1,
            display: 'none'
          }}
        />
      </Box>
    </Box>
  )
}
