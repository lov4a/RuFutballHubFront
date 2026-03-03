import { api } from '../../../shared/api/axios'

export async function uploadNewsImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await api.post('/uploads/news', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data as {
    imageId: string
    originalUrl: string
    largeUrl?: string
    mediumUrl?: string
    smallUrl?: string
  }
}

