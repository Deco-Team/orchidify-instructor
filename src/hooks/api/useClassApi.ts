import { useCallback } from 'react'
import { BaseMediaDto, ListResponseDto, SuccessResponseDto } from '~/data/common.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { useProtectedApi } from './useProtectedApi'
import {
  ClassListItemResponseDto,
  ClassDetailResponseDto,
  BaseAssignmentSubmissionDto,
  AssignmentSubmissionItemResponseDto
} from '~/data/class/class.dto'
import { AssignmentDto, SessionDto } from '~/data/course/course.dto'

const ROOT_ENDPOINT = '/classes/instructor'

interface UpdateClassAssignmentRequest {
  deadline: string
}

export const useClassApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getClassList = useCallback(
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
      const result = await callAppProtectedApi<ListResponseDto<ClassListItemResponseDto>>(
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
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('danh sách lớp học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getClassById = useCallback(
    async (classId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${classId}`
      const result = await callAppProtectedApi<ClassDetailResponseDto>(endpoint, 'GET', {}, {}, {})

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('thông tin lớp học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getSessionById = useCallback(
    async (classId: string, sessionId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${classId}/sessions/${sessionId}`
      const result = await callAppProtectedApi<SessionDto>(endpoint, 'GET')

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('chi tiết buổi học') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getAssignmentById = useCallback(
    async (classId: string, assignmentId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${classId}/assignments/${assignmentId}`
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

  const getSubmissionList = useCallback(
    async (classId: string, assignmentId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${classId}/assignments/${assignmentId}/submissions`
      const result = await callAppProtectedApi<{ docs: AssignmentSubmissionItemResponseDto[] }>(endpoint, 'GET')

      if (result) {
        const { data, error } = result
        if (data) return { data: data.docs, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('danh sách bài làm') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getSubmissionById = useCallback(
    async (classId: string, submissionId: string) => {
      const endpoint = `${ROOT_ENDPOINT}/${classId}/assignment-submissions/${submissionId}`
      const result = await callAppProtectedApi<BaseAssignmentSubmissionDto>(endpoint, 'GET')

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('chi tiết bài làm') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const gradeSubmission = useCallback(
    async (classId: string, submissionId: string, grade: { point: number; feedback: string }) => {
      const endpoint = `${ROOT_ENDPOINT}/${classId}/assignment-submissions/${submissionId}/grade`
      const result = await callAppProtectedApi<SuccessResponseDto>(endpoint, 'POST', {}, {}, grade)

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.ACTION_DID_FAILED('Chấm điểm') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const uploadResourses = useCallback(
    async (classId: string, sessionId: string, media: BaseMediaDto[]) => {
      const endpoint = `${ROOT_ENDPOINT}/${classId}/sessions/${sessionId}/upload-resources`
      const result = await callAppProtectedApi<SuccessResponseDto>(endpoint, 'PATCH', {}, {}, { media })

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.ACTION_DID_FAILED('Tải lên tài nguyên') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const updateClassAssignment = useCallback(
    async (classId: string, assignmentId: string, request: UpdateClassAssignmentRequest) => {
      const endpoint = `${ROOT_ENDPOINT}/${classId}/assignments/${assignmentId}`

      const result = await callAppProtectedApi<SuccessResponseDto>(endpoint, 'PATCH', {}, {}, request)

      if (result) {
        const { data, error } = result
        if (data) return { data: data, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.ACTION_DID_FAILED('Cập nhật bài tập của lớp') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return {
    getClassList,
    getClassById,
    getSessionById,
    getAssignmentById,
    getSubmissionList,
    getSubmissionById,
    gradeSubmission,
    uploadResourses,
    updateClassAssignment
  }
}
