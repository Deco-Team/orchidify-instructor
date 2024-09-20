import { useCallback } from 'react'
import { useProtectedApi } from './useProtectedApi'
import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { IdResponseDto, ListResponseDto } from '~/data/common.dto'
import { CloudinaryFileUploadedInfo } from '~/components/cloudinary/cloudinary-type'
import { CourseListItemResponseDto } from '~/data/course/course.dto'

const ROOT_ENDPOINT = '/courses/instructor'

interface CreateCourse {
  title: string
  description: string
  price: number
  level: string
  type: string
  thumbnail: string
  media: CloudinaryFileUploadedInfo[]
  learnerLimit: number
  lessons: {
    title: string
    description: string
    media: CloudinaryFileUploadedInfo[]
  }[]
  assignments: {
    title: string
    description: string
    attachment: CloudinaryFileUploadedInfo[]
  }[]
}

export const useCourseApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getAllCourses = useCallback(
    async (
      page = 1,
      pageSize = 10,
      sorting: { field: string; desc: boolean }[] = [],
      filters: { field: string; value: unknown }[] = []
    ) => {
      const endpoint = `${ROOT_ENDPOINT}`
      const sortingFormat = sorting.map((sort) => `${sort.field}.${sort.desc ? 'desc' : 'asc'}`).join('_')
      let filtersFormat = {}
      filters.forEach((filter) => {
        filtersFormat = Object.assign({ [filter.field]: filter.value }, filtersFormat)
      })
      const result = await callAppProtectedApi<ListResponseDto<CourseListItemResponseDto>>(
        endpoint,
        'GET',
        {},
        {
          page,
          limit: pageSize,
          sort: sortingFormat,
          ...filtersFormat
        },
        {}
      )

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('danh sách khóa học/combo khóa học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const createCourse = useCallback(
    async (course: CreateCourse) => {
      console.log(course)
      const endpoint = `${ROOT_ENDPOINT}`
      const result = await callAppProtectedApi<IdResponseDto>(endpoint, 'POST', {}, {}, course)

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.ACTION_DID_FAILED('Tạo khóa học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return { getAllCourses, createCourse }
}
