import { Link, useParams } from 'react-router-dom'
import AttendanceListHeader from './AttendanceListHeader'
import { Button, Typography } from '@mui/material'
import { TitleWrapper } from './AttendanceList.styled'
import AttendanceTable from './components/AttendanceTable'
import { AttendanceListResponseDto } from '~/data/teaching-timesheet/attendance.dto'
import { useEffect, useState } from 'react'
import { useAttendanceApi } from '~/hooks/api/useAttendanceApi'
import { notifyError, notifySuccess } from '~/utils/toastify'
import Loading from '~/components/loading/Loading'
import { AttendanceStatus } from '~/global/constants'
import { APP_MESSAGE } from '~/global/app-message'

const AttendanceList = () => {
  const params = useParams()
  const slotId = params.slotId
  const [data, setData] = useState<AttendanceListResponseDto | null>(null)
  const { getAttendanceList, takeAttendance } = useAttendanceApi()

  useEffect(() => {
    if (slotId) {
      ;(async () => {
        const { data: slotData, error: apiError } = await getAttendanceList(slotId)
        setData(slotData)

        if (apiError) {
          notifyError(apiError.message)
        }
      })()
    }
  }, [getAttendanceList, slotId])

  const handleReloadData = async () => {
    if (slotId) {
      const { data: slotData, error: apiError } = await getAttendanceList(slotId)
      setData(slotData)

      if (apiError) {
        notifyError(apiError.message)
      }
    }
  }

  const handleTakeAttendance = async (attendance: { status: AttendanceStatus; note: string; learnerId: string }) => {
    if (slotId) {
      const { data: takeAttendanceData, error: apiError } = await takeAttendance(slotId, [attendance])

      if (takeAttendanceData) {
        handleReloadData()
        notifySuccess(APP_MESSAGE.ACTION_DID_SUCCESSFULLY('Điểm danh'))
        return true
      }

      if (apiError) {
        notifyError(apiError.message)
        return false
      }
    }
    return false
  }

  return data ? (
    <>
      <TitleWrapper>
        <AttendanceListHeader
          title={`${data.slot.metadata?.title} - Buổi học ${data.slot.metadata?.sessionNumber}`}
          slotId={slotId!}
        />
        {new Date() >= new Date(data.slot.start) &&
          new Date().toLocaleString('sv').split(' ')[0] ===
            new Date(data.slot.start).toLocaleString('sv').split(' ')[0] &&
          (!data.slot.hasTakenAttendance ? (
            <Button color='secondary' component={Link} to={'edit'}>
              Điểm danh
            </Button>
          ) : (
            <Button color='warning' component={Link} to={'edit'}>
              Sửa điểm danh
            </Button>
          ))}
      </TitleWrapper>

      {new Date() >= new Date(data.slot.start) ? (
        <AttendanceTable
          attendance={data}
          hasTakenAttendance={data.slot.hasTakenAttendance!}
          takeAttendance={handleTakeAttendance}
        />
      ) : (
        <Typography color={'error'}>{APP_MESSAGE.NOT_TIME_TO_TAKE_ATTENDANCE}</Typography>
      )}
    </>
  ) : (
    <Loading />
  )
}

export default AttendanceList
