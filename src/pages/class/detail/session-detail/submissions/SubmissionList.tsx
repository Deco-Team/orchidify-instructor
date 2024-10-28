import { useParams } from 'react-router-dom'
import AssignmentDetailInformation from '../components/AssignmentDetailInformation'
import { AssignmentDto } from '~/data/course/course.dto'
import SubmissionTable from './components/SubmissionTable'
import { LearnerStatus, SubmissionStatus } from '~/global/constants'
import { SubmissionDto } from '~/data/class/class.dto'
import { protectedRoute } from '~/routes/routes'
import PageHeader from '~/components/header/PageHeader'

const SubmissionList = () => {
  const params = useParams()
  const classId = params.classId
  const sessionId = params.sessionId

  const breadcrumbsItems = [
    protectedRoute.classList,
    {
      ...protectedRoute.classDetail,
      path: protectedRoute.classDetail.path.replace(':id', classId!)
    },
    {
      ...protectedRoute.classSessionDetail,
      path: protectedRoute.classSessionDetail.path.replace(':classId', classId!).replace(':sessionId', sessionId!)
    },
    protectedRoute.classSubmissionList
  ]

  const dataAssignments: AssignmentDto = {
    title: 'Tên bài tập',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed purus nibh, fermentum vel viverra in, feugiat at neque. Donec lobortis massa vitae dolor pretium, vitae venenatis est efficitur. Aenean luctus metus quis neque congue porttitor. Aenean tincidunt metus sed nisi rhoncus, eu aliquam augue dapibus. Curabitur sed sem volutpat, convallis dolor id, vehicula augue. In iaculis leo eu elit volutpat varius. Cras maximus ligula porta, feugiat velit quis, congue arcu. Praesent bibendum sapien mau',
    attachments: [
      {
        asset_id: 'b8bd0c3f61cf7cc5259ea69d61579b6b',
        public_id: 'jln13nxr5lbzqgqcz1rg',
        format: 'pdf',
        resource_type: 'image',
        created_at: '2024-10-23T12:52:43Z',
        type: 'upload',
        url: 'http://res.cloudinary.com/orchidify/image/upload/v1729687963/jln13nxr5lbzqgqcz1rg.pdf',
        asset_folder: '',
        original_filename: 'Best Blooket hacks for answers and scripts',
        original_extension: 'pdf'
      }
    ],
    _id: '6718f1a6fda39ad3aa9eef71'
  }

  const submissions: SubmissionDto[] = [
    {
      _id: 'sub1',
      attachment: {
        asset_id: 'asset1',
        public_id: 'public1',
        format: 'jpg',
        resource_type: 'image',
        created_at: '2024-10-01T10:00:00Z',
        type: 'upload',
        url: 'https://example.com/image1.jpg',
        asset_folder: 'folder1',
        original_filename: 'submission1',
        original_extension: 'jpg'
      },
      point: 8,
      feedback: 'Well done, but room for improvement.',
      status: SubmissionStatus.GRADED,
      examiner: { _id: 'exam1', name: 'Dr. Smith' },
      assignments: [],
      learner: {
        _id: 'learner1',
        email: 'learner1@example.com',
        name: 'Alice',
        avatar: 'https://res.cloudinary.com/orchidify/image/upload/v1729687639/qtl8ze5om09vbafkybmv.jpg',
        dateOfBirth: '2000-01-01',
        phone: '1234567890',
        status: LearnerStatus.ACTIVE,
        createdAt: '2023-01-01T12:00:00Z',
        updatedAt: '2023-06-01T12:00:00Z'
      },
      createdAt: new Date('2024-10-01T10:00:00Z'),
      updatedAt: new Date('2024-10-02T12:00:00Z')
    },
    {
      _id: 'sub2',
      // attachment: {
      //   asset_id: 'asset2',
      //   public_id: 'public2',
      //   format: 'pdf',
      //   resource_type: 'image',
      //   created_at: '2024-10-02T09:00:00Z',
      //   type: 'upload',
      //   url: 'https://example.com/file2.pdf',
      //   asset_folder: 'folder2',
      //   original_filename: 'submission2',
      //   original_extension: 'pdf'
      // },
      // point: 7,
      // feedback: 'Good effort. Focus on clarity.',
      status: SubmissionStatus.NOT_YET,
      examiner: { _id: 'exam2', name: 'Ms. Taylor' },
      assignments: [],
      learner: {
        _id: 'learner2',
        email: 'learner2@example.com',
        name: 'Bob',
        avatar: 'https://res.cloudinary.com/orchidify/image/upload/v1729687591/ahq6bzdi3chtirol8guf.jpg',
        dateOfBirth: '1999-05-15',
        phone: '0987654321',
        status: LearnerStatus.ACTIVE,
        createdAt: '2023-02-01T10:00:00Z',
        updatedAt: '2023-07-01T11:00:00Z'
      }
      // createdAt: new Date('2024-10-02T09:00:00Z'),
      // updatedAt: new Date('2024-10-03T10:30:00Z')
    },
    {
      _id: 'sub3',
      attachment: {
        asset_id: 'asset3',
        public_id: 'public3',
        format: 'mp4',
        resource_type: 'video',
        created_at: '2024-10-03T08:30:00Z',
        type: 'authenticated',
        url: 'https://example.com/video3.mp4',
        asset_folder: 'folder3',
        original_filename: 'submission3',
        original_extension: 'mp4'
      },
      // point: 9,
      // feedback: 'Excellent work.',
      status: SubmissionStatus.SUBMITTED,
      examiner: { _id: 'exam3', name: 'Dr. Green' },
      assignments: [],
      learner: {
        _id: 'learner3',
        email: 'learner3@example.com',
        name: 'Carol',
        avatar: 'https://res.cloudinary.com/orchidify/image/upload/v1729687861/cz5ejpuhzcojp0q90e5c.jpg',
        dateOfBirth: '1998-03-22',
        phone: '0123456789',
        status: LearnerStatus.ACTIVE,
        createdAt: '2023-03-01T09:30:00Z',
        updatedAt: '2023-08-01T12:00:00Z'
      },
      createdAt: new Date('2024-10-03T08:30:00Z'),
      updatedAt: new Date('2024-10-03T08:30:00Z')
    },
    {
      _id: 'sub4',
      attachment: {
        asset_id: 'asset4',
        public_id: 'public4',
        format: 'docx',
        resource_type: 'image',
        created_at: '2024-10-04T10:45:00Z',
        type: 'upload',
        url: 'https://example.com/file4.docx',
        asset_folder: 'folder4',
        original_filename: 'submission4',
        original_extension: 'docx'
      },
      point: 6,
      feedback: 'Needs improvement on structure.',
      status: SubmissionStatus.GRADED,
      examiner: { _id: 'exam4', name: 'Mr. Brown' },
      assignments: [],
      learner: {
        _id: 'learner4',
        email: 'learner4@example.com',
        name: 'David',
        avatar: 'https://res.cloudinary.com/orchidify/image/upload/v1729687861/cz5ejpuhzcojp0q90e5c.jpg',
        dateOfBirth: '2001-06-11',
        phone: '0981122334',
        status: LearnerStatus.INACTIVE,
        createdAt: '2023-04-11T11:00:00Z',
        updatedAt: '2023-09-01T12:30:00Z'
      },
      createdAt: new Date('2024-10-04T10:45:00Z'),
      updatedAt: new Date('2024-10-04T11:00:00Z')
    },
    {
      _id: 'sub5',
      attachment: {
        asset_id: 'asset5',
        public_id: 'public5',
        format: 'pdf',
        resource_type: 'image',
        created_at: '2024-10-05T09:10:00Z',
        type: 'upload',
        url: 'https://example.com/file5.pdf',
        asset_folder: 'folder5',
        original_filename: 'submission5',
        original_extension: 'pdf'
      },
      point: 8,
      feedback: 'Great analysis.',
      status: SubmissionStatus.GRADED,
      examiner: { _id: 'exam5', name: 'Ms. White' },
      assignments: [],
      learner: {
        _id: 'learner5',
        email: 'learner5@example.com',
        name: 'Emily',
        avatar: 'https://res.cloudinary.com/orchidify/image/upload/v1729687861/cz5ejpuhzcojp0q90e5c.jpg',
        dateOfBirth: '1997-08-15',
        phone: '0998877665',
        status: LearnerStatus.ACTIVE,
        createdAt: '2023-05-10T12:00:00Z',
        updatedAt: '2023-10-10T12:30:00Z'
      },
      createdAt: new Date('2024-10-05T09:10:00Z'),
      updatedAt: new Date('2024-10-06T10:10:00Z')
    },
    {
      _id: 'sub6',
      attachment: {
        asset_id: 'asset6',
        public_id: 'public6',
        format: 'pptx',
        resource_type: 'image',
        created_at: '2024-10-06T13:30:00Z',
        type: 'upload',
        url: 'https://example.com/file6.pptx',
        asset_folder: 'folder6',
        original_filename: 'submission6',
        original_extension: 'pptx'
      },
      point: 9,
      feedback: 'Excellent presentation skills.',
      status: SubmissionStatus.GRADED,
      examiner: { _id: 'exam6', name: 'Dr. Wilson' },
      assignments: [],
      learner: {
        _id: 'learner6',
        email: 'learner6@example.com',
        name: 'Frank',
        avatar: 'https://res.cloudinary.com/orchidify/image/upload/v1729687861/cz5ejpuhzcojp0q90e5c.jpg',
        dateOfBirth: '2002-07-20',
        phone: '0991123344',
        status: LearnerStatus.ACTIVE,
        createdAt: '2023-06-10T10:00:00Z',
        updatedAt: '2023-11-10T11:00:00Z'
      },
      createdAt: new Date('2024-10-06T13:30:00Z'),
      updatedAt: new Date('2024-10-07T13:30:00Z')
    },
    {
      _id: 'sub7',
      attachment: {
        asset_id: 'asset7',
        public_id: 'public7',
        format: 'jpg',
        resource_type: 'image',
        created_at: '2024-10-07T08:00:00Z',
        type: 'upload',
        url: 'https://example.com/image7.jpg',
        asset_folder: 'folder7',
        original_filename: 'submission7',
        original_extension: 'jpg'
      },
      point: 7,
      feedback: 'Creative ideas, needs refining.',
      status: SubmissionStatus.GRADED,
      examiner: { _id: 'exam7', name: 'Mr. Black' },
      assignments: [],
      learner: {
        _id: 'learner7',
        email: 'learner7@example.com',
        name: 'Gina',
        avatar: 'https://res.cloudinary.com/orchidify/image/upload/v1729687861/cz5ejpuhzcojp0q90e5c.jpg',
        dateOfBirth: '1996-12-10',
        phone: '0779988555',
        status: LearnerStatus.ACTIVE,
        createdAt: '2023-06-15T09:00:00Z',
        updatedAt: '2023-11-15T09:00:00Z'
      },
      createdAt: new Date('2024-10-07T08:00:00Z'),
      updatedAt: new Date('2024-10-08T10:00:00Z')
    },
    {
      _id: 'sub8',
      attachment: {
        asset_id: 'asset8',
        public_id: 'public8',
        format: 'pdf',
        resource_type: 'image',
        created_at: '2024-10-08T14:00:00Z',
        type: 'authenticated',
        url: 'https://example.com/file8.pdf',
        asset_folder: 'folder8',
        original_filename: 'submission8',
        original_extension: 'pdf'
      },
      point: 6,
      feedback: 'Review the research sections.',
      status: SubmissionStatus.GRADED,
      examiner: { _id: 'exam8', name: 'Dr. Violet' },
      assignments: [],
      learner: {
        _id: 'learner8',
        email: 'learner8@example.com',
        name: 'Harry',
        avatar: 'https://res.cloudinary.com/orchidify/image/upload/v1729687861/cz5ejpuhzcojp0q90e5c.jpg',
        dateOfBirth: '2003-09-09',
        phone: '0557788665',
        status: LearnerStatus.INACTIVE,
        createdAt: '2023-07-20T08:00:00Z',
        updatedAt: '2023-12-20T10:30:00Z'
      },
      createdAt: new Date('2024-10-08T14:00:00Z'),
      updatedAt: new Date('2024-10-09T14:10:00Z')
    },
    {
      _id: 'sub9',
      attachment: {
        asset_id: 'asset9',
        public_id: 'public9',
        format: 'docx',
        resource_type: 'image',
        created_at: '2024-10-09T08:30:00Z',
        type: 'upload',
        url: 'https://example.com/file9.docx',
        asset_folder: 'folder9',
        original_filename: 'submission9',
        original_extension: 'docx'
      },
      point: 8,
      feedback: 'Solid analysis.',
      status: SubmissionStatus.GRADED,
      examiner: { _id: 'exam9', name: 'Ms. Olive' },
      assignments: [],
      learner: {
        _id: 'learner9',
        email: 'learner9@example.com',
        name: 'Ivy',
        avatar: 'https://res.cloudinary.com/orchidify/image/upload/v1729687861/cz5ejpuhzcojp0q90e5c.jpg',
        dateOfBirth: '2000-10-05',
        phone: '0775544331',
        status: LearnerStatus.ACTIVE,
        createdAt: '2023-08-25T08:00:00Z',
        updatedAt: '2023-12-15T11:00:00Z'
      },
      createdAt: new Date('2024-10-09T08:30:00Z'),
      updatedAt: new Date('2024-10-10T09:30:00Z')
    },
    {
      _id: 'sub10',
      attachment: {
        asset_id: 'asset10',
        public_id: 'public10',
        format: 'jpg',
        resource_type: 'image',
        created_at: '2024-10-10T08:00:00Z',
        type: 'upload',
        url: 'https://example.com/image10.jpg',
        asset_folder: 'folder10',
        original_filename: 'submission10',
        original_extension: 'jpg'
      },
      // point: 7,
      // feedback: 'Well organized.',
      status: SubmissionStatus.SUBMITTED,
      examiner: { _id: 'exam10', name: 'Mr. Plum' },
      assignments: [],
      learner: {
        _id: 'learner10',
        email: 'learner10@example.com',
        name: 'Jack',
        avatar: 'https://res.cloudinary.com/orchidify/image/upload/v1729687861/cz5ejpuhzcojp0q90e5c.jpg',
        dateOfBirth: '1999-11-25',
        phone: '0661122334',
        status: LearnerStatus.ACTIVE,
        createdAt: '2023-09-01T09:00:00Z',
        updatedAt: '2023-12-31T10:00:00Z'
      },
      createdAt: new Date('2024-10-10T08:00:00Z'),
      updatedAt: new Date('2024-10-11T09:00:00Z')
    }
  ]

  return (
    <>
      <PageHeader title='Danh sách bài làm' breadcrumbsItems={breadcrumbsItems} />
      <AssignmentDetailInformation assignment={dataAssignments} />
      <SubmissionTable classId={classId!} sessionId={sessionId!} submissions={submissions} />
    </>
  )
}

export default SubmissionList
