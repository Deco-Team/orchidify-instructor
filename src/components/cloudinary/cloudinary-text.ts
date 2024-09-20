export const text = {
  vi: {
    or: 'Hoặc',
    back: 'Quay lại',
    advanced: 'Nâng cao',
    close: 'Đóng',
    menu: {
      files: 'Tệp của tôi '
    },
    notifications: {
      limit_reached: 'No more files can be selected.'
    },
    queue: {
      title: 'Hàng đợi tải lên',
      title_uploading_with_counter: 'Đang tải lên {{num}} tệp',
      title_processing_with_counter: 'Đang xử lý {{num}} tệp',
      title_uploading_processing_with_counters: 'Đang tải lên {{uploading}} tệp, đang xử lý {{processing}} tệp',
      title_uploading: 'Đang tải lên tệp',
      mini_title: 'Đã tải lên',
      mini_title_uploading: 'Đang tải lên',
      mini_title_processing: 'Đang xử lý',
      show_completed: 'Hiển thị đã hoàn thành',
      retry_failed: 'Thử lại tệp thất bại',
      abort_all: 'Hủy tất cả',
      upload_more: 'Tải lên thêm',
      done: 'Xong',
      mini_upload_count: '{{num}} đã tải lên',
      mini_failed: '{{num}} thất bại',
      statuses: {
        uploading: 'Đang tải lên...',
        processing: 'Đang xử lý...',
        timeout: 'Một tệp lớn đang được tải lên. Có thể sẽ mất một lúc để hiển thị trong môi trường sản phẩm của bạn.',
        error: 'Lỗi',
        uploaded: 'Hoàn thành',
        aborted: 'Đã hủy'
      }
    },
    uploader: {
      filesize: {
        na: 'Không có sẵn',
        b: '{{size}} Bytes',
        k: '{{size}} KB',
        m: '{{size}} MB',
        g: '{{size}} GB',
        t: '{{size}} TB'
      },
      errors: {
        file_too_large: 'Phương tiện phải có định dạng hỗ trợ và kích thước không vượt quá {{size}}', //Customize to be suitable for the application
        max_dimensions_validation:
          'Kích thước hình ảnh ({{width}}X{{height}}) lớn hơn kích thước tối đa cho phép: ({{maxWidth}}X{{maxHeight}})',
        min_dimensions_validation:
          'Kích thước hình ảnh ({{width}}X{{height}}) nhỏ hơn kích thước tối thiểu yêu cầu: ({{minWidth}}X{{minHeight}})',
        unavailable: 'Không có sẵn',
        max_number_of_files: 'Số lượng tệp vượt quá giới hạn',
        allowed_formats: 'Định dạng tệp không được phép',
        max_file_size: 'Tệp quá lớn',
        min_file_size: 'Tệp quá nhỏ'
      },
      close_mid_upload: 'Có các tải lên đang chạy. Nhấn OK để hủy.'
    },
    local: {
      browse: 'Duyệt',
      dd_title_single: 'Kéo và thả một tệp tại đây',
      dd_title_multi: 'Kéo và thả các tệp tại đây',
      drop_title_single: 'Thả tệp để tải lên',
      drop_title_multiple: 'Thả các tệp để tải lên'
    }
  }
}
