import { useCallback } from 'react'
import { APP_MESSAGE } from '~/global/app-message'
import { notifyError } from '~/utils/toastify'

const useCloudinaryApi = () => {
  const generateUniqueUploadId = () => {
    return `uqid-${Date.now()}`
  }
  const uploadCloudinary = useCallback(async (files: File[]) => {
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i])
      formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
      const contentRange = `bytes 0-${files[i].size - 1}/${files[i].size}`
      const headers = {
        'X-Unique-Upload-Id': generateUniqueUploadId(),
        'Content-Range': contentRange
      }
      try {
        const response = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_API, {
          method: 'POST',
          body: formData,
          headers: headers
        })
        if (!response.ok) {
          notifyError(APP_MESSAGE.ACTION_DID_FAILED('Upload ảnh'))
          return
        } else {
          return response.json()
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        notifyError(APP_MESSAGE.ACTION_DID_FAILED('Upload ảnh'))
      }
    }
  }, [])

  return { uploadCloudinary }
}

export default useCloudinaryApi
