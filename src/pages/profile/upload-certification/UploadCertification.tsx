import { useEffect, useState } from 'react'
import PageHeader from '~/components/header/PageHeader'
import Loading from '~/components/loading/Loading'
import { InstructorCertificationDto } from '~/data/profile/instructor.dto'
import { useProfileApi } from '~/hooks/api/useProfileApi'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import UploadCertificationForm from './components/UploadCertificationForm'

const UploadCertification = () => {
  const { getInstructorCertifications } = useProfileApi()
  const [data, setData] = useState<InstructorCertificationDto[] | null>(null)

  useEffect(() => {
    ;(async () => {
      const { data: certifications, error } = await getInstructorCertifications()

      if (certifications) {
        setData(certifications)
      }

      if (error) {
        notifyError(error.message)
      }
    })()
  }, [getInstructorCertifications])

  return data ? (
    <>
      <PageHeader
        title={data.length > 0 ? 'Cập nhật chứng chỉ' : 'Thêm chứng chỉ'}
        breadcrumbsItems={[
          protectedRoute.profile,
          protectedRoute.certifications,
          { ...protectedRoute.uploadCertification, name: data.length > 0 ? 'Cập nhật chứng chỉ' : 'Thêm chứng chỉ' }
        ]}
      />
      <UploadCertificationForm certificationdata={data} />
    </>
  ) : (
    <Loading />
  )
}
export default UploadCertification
