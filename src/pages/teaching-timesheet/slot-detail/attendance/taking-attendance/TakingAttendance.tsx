import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '~/components/loading/Loading'
import { AttendanceListResponseDto } from '~/data/teaching-timesheet/attendance.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { TakeAttendanceDto, useAttendanceApi } from '~/hooks/api/useAttendanceApi'
import { protectedRoute } from '~/routes/routes'
import { notifyError, notifySuccess } from '~/utils/toastify'
import TakingAttendanceHeader from './TakingAttendanceHeader'
import TakingAttendanceTable from './components/TakingAttendanceTable'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AttendanceStatus } from '~/global/constants'

const TakingAttendance = () => {
  const params = useParams()
  const slotId = params.slotId
  const navigate = useNavigate()
  const [data, setData] = useState<AttendanceListResponseDto | null>(null)
  const { getAttendanceList, takeAttendance } = useAttendanceApi()

  useEffect(() => {
    if (slotId) {
      ;(async () => {
        const { data: slotData, error: apiError } = await getAttendanceList(slotId)

        if (slotData) {
          if (new Date().getTime() < new Date(slotData.slot.start).getTime()) {
            notifyError(APP_MESSAGE.NOT_TIME_TO_TAKE_ATTENDANCE)
            navigate(protectedRoute.attendanceList.path.replace(':slotId', slotId), { replace: true })
            return
          } else if (
            new Date().toLocaleString('sv').split(' ')[0] >
            new Date(slotData.slot.start).toLocaleString('sv').split(' ')[0]
          ) {
            notifyError(APP_MESSAGE.TAKE_ATTENDANCE_IS_OVER)
            navigate(protectedRoute.attendanceList.path.replace(':slotId', slotId), { replace: true })
            return
          }

          setData(slotData)
        }
        if (apiError) {
          notifyError(apiError.message)
          navigate(protectedRoute.attendanceList.path.replace(':slotId', slotId))
        }
      })()
    }
  }, [getAttendanceList, slotId, navigate])

  const defaultFormValues = data?.docs.map((item) => ({
    learnerId: item.learnerId,
    status: item.status,
    note: item.note
  }))

  const takeAttendanceSchema = z.record(
    z.object({
      status: z.enum([AttendanceStatus.PRESENT, AttendanceStatus.ABSENT]),
      learnerId: z.string().min(1, APP_MESSAGE.REQUIRED_FIELD('Học viên')),
      note: z.string().trim().max(100, APP_MESSAGE.FIELD_TOO_LONG('Ghi chú', 100))
    })
  )

  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<TakeAttendanceDto[]>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(takeAttendanceSchema)
  })

  const onSubmit = handleSubmit(async (formData) => {
    const { data: result, error: apiError } = await takeAttendance(slotId!, Object.values(formData))
    if (result) {
      notifySuccess(
        APP_MESSAGE.ACTION_DID_SUCCESSFULLY(data?.slot.hasTakenAttendance ? 'Cập nhật điểm danh' : 'Điểm danh')
      )
      navigate(-1)
    } else if (apiError) {
      notifyError(apiError.message)
    }
  })

  return data ? (
    <>
      <TakingAttendanceHeader slotId={slotId!} />
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmit}>
        <TakingAttendanceTable attendance={data} control={control} />
        <Button type='submit' sx={{ maxWidth: 'fit-content', mx: 'auto', mt: 2.5 }} disabled={isSubmitting}>
          Lưu
        </Button>
      </form>
    </>
  ) : (
    <Loading />
  )
}

export default TakingAttendance
