import { useCallback } from 'react'
import { IdResponseDto, ListResponseDto, SuccessResponseDto } from '~/data/common.dto'
import { useProtectedApi } from './useProtectedApi'
import {
  AssignmentDto,
  CourseTemplateDetailResponseDto,
  CourseTemplateListItemResponseDto,
  LessonDto
} from '~/data/course-template/course-template.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { CloudinaryFileUploadedInfo } from '~/components/cloudinary/cloudinary-type'

const ROOT_ENDPOINT = '/course-templates/instructor'

interface CreateCourseTemplate {
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

export const useCourseTemplateApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getCourseTemplateList = useCallback(
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
      const result = await callAppProtectedApi<ListResponseDto<CourseTemplateListItemResponseDto>>(
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
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('danh sách mẫu khóa học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getCourseTemplateById = useCallback(
    async (courseTemplateId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${courseTemplateId}`
      const result = await callAppProtectedApi<CourseTemplateDetailResponseDto>(endpoint, 'GET')

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.ACTION_DID_FAILED('Tạo mẫu khóa học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const createCourseTemplate = useCallback(
    async (course: CreateCourseTemplate) => {
      const endpoint = `${ROOT_ENDPOINT}`
      const result = await callAppProtectedApi<IdResponseDto>(endpoint, 'POST', {}, {}, course)

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('chi tiết mẫu khóa học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const deleteCourseTemplate = useCallback(
    async (courseTemplateId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${courseTemplateId}`
      const result = await callAppProtectedApi<SuccessResponseDto>(endpoint, 'DELETE')

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.ACTION_DID_FAILED('Xóa mẫu khóa học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getLessonById = useCallback(
    async (courseTemplatesId: string, lessonId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${courseTemplatesId}/lessons/${lessonId}`
      const result = await callAppProtectedApi<LessonDto>(endpoint, 'GET')

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('chi tiết bài học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getAssignmentById = useCallback(
    async (courseId: string, lessonId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${courseId}/assignments/${lessonId}`
      const result = await callAppProtectedApi<AssignmentDto>(endpoint, 'GET')

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('chi tiết bài tập') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return {
    getCourseTemplateList,
    getCourseTemplateById,
    createCourseTemplate,
    deleteCourseTemplate,
    getLessonById,
    getAssignmentById
  }
}
