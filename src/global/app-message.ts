export const APP_MESSAGE = {
  REQUIRED_FIELD: (name: string = '') => `${name} là bắt buộc`,
  FIELD_TOO_LONG: (name: string = '', maxLength: number = 0) => `${name} không được vượt quá ${maxLength} kí tự`,
  WRONG_EMAIL_FORMAT: 'Vui lòng nhập địa chỉ email hợp lệ.',
  LOGIN_SUCCESS: 'Đăng nhập thành công',
  LOGIN_FAIL: 'Đăng nhập không thành công. Vui lòng thử lại',
  CONFIRM_ACTION: (action: string = '', object: string = '') => `Bạn có chắc chắn muốn ${action} ${object} không?`,
  LOAD_DATA_FAILED: (data: string = '') => `Đã xảy ra lỗi khi tải ${data}. Vui lòng thử lại sau.`,
  INVALID_FILE_FORMAT_OR_SIZE: (format: string = '', size: string = '') =>
    `Phương tiện phải có định dạng hỗ trợ (${format}) và kích thước không vượt quá ${size}`,
  THERE_IS_NO_SEARCH_RESULT: 'Không tìm thấy kết quả mà bạn tìm kiếm.',
  ACTION_DID_SUCCESSFULLY: (asset: string = '') => `${asset} thành công.`,
  ACTION_DID_FAILED: (action: string = '') => `${action} không thành công. Vui lòng thử lại sau.`,
  INCORRECT_NUMBER_OF_FILES: (min: number, max: number) => `Số lượng file phải nằm trong khoảng từ ${min} đến ${max}.`,
  VALUE_OUT_OF_RANGE: (min: string | number, max: string | number) =>
    `Giá trị phải nằm trong khoảng từ ${min} đến ${max}`,
  INVALID_VALUE: (valueList: string[]) =>
    `Chỉ chấp nhận${valueList.length > 1 ? ' các' : ''} giá trị ${valueList.join(', ')}`,
  NOT_TIME_TO_TAKE_ATTENDANCE: 'Chưa tới giờ điểm danh. Vui lòng quay lại sau.',
  TAKE_ATTENDANCE_IS_OVER: 'Đã hết thời gian điểm danh.',
  AMOUNT_OVER_BALANCE: 'Số tiền vượt quá số dư tài khoản',
  NO_PAYMENT_INFO: 'Không tìm thấy thông tin TK ngân hàng. Vui lòng cập nhật trước khi tạo yêu cầu.'
}
