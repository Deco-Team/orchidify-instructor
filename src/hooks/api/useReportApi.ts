import { useCallback } from 'react'
import { useProtectedApi } from './useProtectedApi'
import {
  ClassByStatusDto,
  LearnerEnrolledByMonthDto,
  RevenueSumByMonthDto,
  TotalSummaryDto
} from '~/data/report/report.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { APP_MESSAGE } from '~/global/app-message'

const ROOT_ENDPOINT = '/reports/instructor'

export const useReportApi = () => {
  const { callAppProtectedApi } = useProtectedApi()

  const getTotalSumary = useCallback(async () => {
    const endpoint = `${ROOT_ENDPOINT}/total-summary`
    const result = await callAppProtectedApi<{ docs: TotalSummaryDto[] }>(endpoint, 'GET', {}, {}, {})

    if (result) {
      const { data, error } = result
      if (data) return { data: data.docs, error: null }
      if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
    }

    return {
      data: null,
      error: { message: APP_MESSAGE.LOAD_DATA_FAILED('tổng kết') } as ErrorResponseDto
    }
  }, [callAppProtectedApi])

  const getClassByStatus = useCallback(async () => {
    const endpoint = `${ROOT_ENDPOINT}/class-by-status`
    const result = await callAppProtectedApi<ClassByStatusDto>(endpoint, 'GET', {}, {}, {})

    if (result) {
      const { data, error } = result
      if (data) return { data: data, error: null }
      if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
    }

    return {
      data: null,
      error: { message: APP_MESSAGE.LOAD_DATA_FAILED('tổng quan số lớp học') } as ErrorResponseDto
    }
  }, [callAppProtectedApi])

  const getLeanerEnrolledByMonth = useCallback(
    async (year: string) => {
      const endpoint = `${ROOT_ENDPOINT}/learner-enrolled-by-month`
      const result = await callAppProtectedApi<{ docs: LearnerEnrolledByMonthDto[] }>(endpoint, 'GET', {}, { year }, {})

      if (result) {
        const { data, error } = result
        if (data) return { data: data.docs, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('tổng quan số học viên') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  const getRevenueSumByMonth = useCallback(
    async (year: number) => {
      const endpoint = `${ROOT_ENDPOINT}/revenue-by-month`
      const result = await callAppProtectedApi<{ docs: RevenueSumByMonthDto[] }>(endpoint, 'GET', {}, { year }, {})

      if (result) {
        const { data, error } = result
        if (data) return { data: data.docs, error: null }
        if (error.response) return { data: null, error: error.response.data as ErrorResponseDto }
      }

      return {
        data: null,
        error: { message: APP_MESSAGE.LOAD_DATA_FAILED('doanh thu') } as ErrorResponseDto
      }
    },
    [callAppProtectedApi]
  )

  return { getTotalSumary, getClassByStatus, getLeanerEnrolledByMonth, getRevenueSumByMonth }
}
