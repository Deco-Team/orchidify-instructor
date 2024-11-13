import { lazy } from 'react'

const Home = lazy(() => import('~/pages/Home'))
const Login = lazy(() => import('~/pages/login/Login'))
const Profile = lazy(() => import('~/pages/profile/Profile'))
const EditProfile = lazy(() => import('~/pages/profile/edit-profile/EditProfile'))
const CourseList = lazy(() => import('~/pages/course/CourseList'))
const CourseDetail = lazy(() => import('~/pages/course/detail/CourseDetail'))
const CreateCourse = lazy(() => import('~/pages/course/create/CreateCourse'))
const UpdateCourse = lazy(() => import('~/pages/course/update/UpdateCourse'))
const CourseSessionDetail = lazy(() => import('~/pages/course/detail/session-detail/SessionDetail'))
const PublishClass = lazy(() => import('~/pages/class-request/publish/PublishClass'))
const ClassRequestList = lazy(() => import('~/pages/class-request/ClassRequestList'))
const ClassRequestDetail = lazy(() => import('~/pages/class-request/detail/ClassRequestDetail'))
const ViewClassList = lazy(() => import('~/pages/class/ViewClassList'))
const ViewClassDetail = lazy(() => import('~/pages/class/detail/ViewClassDetail'))
const ClassSessionDetail = lazy(() => import('~/pages/class/detail/session-detail/SessionDetail'))
const ClassLearnerDetail = lazy(() => import('~/pages/class/detail/learner-detail/LearnerDetail'))
const TeachingTimesheet = lazy(() => import('~/pages/teaching-timesheet/TeachingTimesheet'))
const SlotDetail = lazy(() => import('~/pages/teaching-timesheet/slot-detail/SlotDetail'))
const ClassSubmissionList = lazy(() => import('~/pages/class/detail/session-detail/submissions/SubmissionList'))
const ClassSubmissionDetail = lazy(
  () => import('~/pages/class/detail/session-detail/submissions/detail/SubmissionDetail')
)
const AttendanceList = lazy(() => import('~/pages/teaching-timesheet/slot-detail/attendance/AttendanceList'))
const TakingAttendance = lazy(
  () => import('~/pages/teaching-timesheet/slot-detail/attendance/taking-attendance/TakingAttendance')
)
const UploadResources = lazy(() => import('~/pages/class/detail/session-detail/upload-resources/UploadResources'))
const Certifications = lazy(() => import('~/pages/profile/certifications/Certifications'))
const PayoutRequestList = lazy(() => import('~/pages/payout-request/PayoutRequestList'))
const PayoutRequestDetail = lazy(() => import('~/pages/payout-request/detail/PayoutRequestDetail'))
const CreatePayoutRequest = lazy(() => import('~/pages/payout-request/create-payout-request/CreatePayoutRequestForm'))
const ViewCourseComboList = lazy(() => import('~/pages/course-combo/list/ViewCourseComboList'))
const ViewCourseComboDetail = lazy(() => import('~/pages/course-combo/detail/ViewCourseComboDetail'))
const CreateCourseCombo = lazy(() => import('~/pages/course-combo/create/CreateCourseCombo'))
const UpdateCourseCombo = lazy(() => import('~/pages/course-combo/update/UpdateCourseCombo'))

export const publicRoute = {
  login: {
    path: '/',
    Component: Login
  }
}

export const protectedRoute = {
  dashboard: {
    name: 'Trang chủ',
    path: '/dashboard',
    Component: Home
  },
  profile: {
    name: 'Trang cá nhân',
    path: '/profile',
    Component: Profile
  },
  editProfile: {
    name: 'Cập nhật trang cá nhân ',
    path: '/profile/edit',
    Component: EditProfile
  },
  courseList: {
    name: 'Khóa học',
    path: '/courses',
    Component: CourseList
  },
  courseDetail: {
    name: 'Chi tiết khóa học',
    path: '/courses/:id',
    Component: CourseDetail
  },
  createCourse: {
    name: 'Tạo khóa học',
    path: '/courses/create',
    Component: CreateCourse
  },
  updateCourse: {
    name: 'Cập nhật khóa học',
    path: '/courses/:id/update',
    Component: UpdateCourse
  },
  publishClass: {
    name: 'Yêu cầu mở lớp học',
    path: '/courses/:courseId/publish-class',
    Component: PublishClass
  },
  courseSessionDetail: {
    name: 'Chi tiết bài học',
    path: '/courses/:courseId/sessions/:sessionId',
    Component: CourseSessionDetail
  },
  classRequestList: {
    name: 'Yêu cầu lớp học',
    path: '/class-requests',
    Component: ClassRequestList
  },
  classRequestDetail: {
    name: 'Chi tiết yêu cầu lớp học',
    path: '/class-requests/:id',
    Component: ClassRequestDetail
  },
  classList: {
    name: 'Lớp học',
    path: '/classes',
    Component: ViewClassList
  },
  classDetail: {
    name: 'Chi tiết lớp học',
    path: '/classes/:id',
    Component: ViewClassDetail
  },
  classSessionDetail: {
    name: 'Chi tiết buổi học',
    path: '/classes/:classId/sessions/:sessionId',
    Component: ClassSessionDetail
  },
  classLearnerDetail: {
    name: 'Thông tin học viên',
    path: '/classes/:classId/learners/:learnerId',
    Component: ClassLearnerDetail
  },
  teachingTimesheet: {
    name: 'Lịch dạy',
    path: '/teaching-timesheet',
    Component: TeachingTimesheet
  },
  slotDetail: {
    name: 'Chi tiết tiết học',
    path: '/teaching-timesheet/slots/:slotId',
    Component: SlotDetail
  },
  classSubmissionList: {
    name: 'Danh sách bài làm',
    path: '/classes/:classId/sessions/:sessionId/assignments/:assignmentId/submissions',
    Component: ClassSubmissionList
  },
  classSubmissionDetail: {
    name: 'Chi tiết bài làm',
    path: '/classes/:classId/sessions/:sessionId/assignments/:assignmentId/submissions/:submissionId',
    Component: ClassSubmissionDetail
  },
  attendanceList: {
    name: 'Danh sách điểm danh',
    path: '/teaching-timesheet/slots/:slotId/attendance',
    Component: AttendanceList
  },
  takingAttendance: {
    name: 'Điểm danh',
    path: '/teaching-timesheet/slots/:slotId/attendance/edit',
    Component: TakingAttendance
  },
  uploadResources: {
    name: 'Tải lên tài nguyên',
    path: '/classes/:classId/sessions/:sessionId/upload-resources',
    Component: UploadResources
  },
  certifications: {
    name: 'Chứng chỉ của tôi',
    path: '/profile/certifications',
    Component: Certifications
  },
  payoutRequestList: {
    name: 'Yêu cầu rút tiền',
    path: '/payout-requests',
    Component: PayoutRequestList
  },
  payoutRequestDetail: {
    name: 'Chi tiết yêu cầu rút tiền',
    path: '/payout-requests/:id',
    Component: PayoutRequestDetail
  },
  createPayoutRequest: {
    name: 'Tạo yêu cầu rút tiền',
    path: '/payout-requests/create',
    Component: CreatePayoutRequest
  },
  courseComboList: {
    name: 'Combo khóa học',
    path: '/course-combos',
    Component: ViewCourseComboList
  },
  courseComboDetail: {
    name: 'Chi tiết Combo khóa học',
    path: '/course-combos/:id',
    Component: ViewCourseComboDetail
  },
  createCourseCombo: {
    name: 'Tạo combo khóa học',
    path: '/course-combos/create',
    Component: CreateCourseCombo
  },
  updateCourseCombo: {
    name: 'Cập nhật combo khóa học',
    path: '/course-combos/:id/update',
    Component: UpdateCourseCombo
  }
}
