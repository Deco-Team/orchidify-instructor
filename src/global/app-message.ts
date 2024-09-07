export const APP_MESSAGE = {
  REQUIRED_FIELD: (name: string = '') => `${name} là bắt buộc`,
  FIELD_TOO_LONG: (name: string = '', maxLength: number = 0) => `${name} không được vượt quá ${maxLength} kí tự`,
  WRONG_EMAIL_FORMAT: 'Vui lòng nhập địa chỉ email hợp lệ.',
  LOGIN_SUCCESS: 'Đăng nhập thành công',
  LOGIN_FAIL: 'Đăng nhập không thành công. Vui lòng thử lại',
  CONFIRM_ACTION: (action: string = '', object: string = '') => `Bạn có chắc chắn muốn ${action} ${object} không?`
}
