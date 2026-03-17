# BÀI TẬP: ỨNG DỤNG QUẢN LÝ DANH BẠ

## 1. MỤC TIÊU

- Nắm vững kiến thức về **DOM Manipulation** trong JavaScript
- Thực hành xử lý **Event Handling** (click, submit, input)
- Áp dụng kỹ thuật **CRUD** (Create, Read, Update, Delete) với JavaScript thuần
- Rèn luyện kỹ năng **Form Validation** và hiển thị thông báo
- Làm quen với **Regular Expression** để validate email và số điện thoại

## 2. MÔ TẢ

Xây dựng ứng dụng **Quản lý danh bạ** với các chức năng cơ bản:
- Thêm liên hệ mới vào danh bạ
- Hiển thị danh sách liên hệ
- Sửa thông tin liên hệ
- Xóa liên hệ khỏi danh bạ

**Giao diện mẫu:** Dựa trên cấu trúc giao diện quản lý sản phẩm

## 3. YÊU CẦU CHỨC NĂNG

### 3.1. CREATE - Thêm liên hệ mới

**Yêu cầu:**
- Khi người dùng nhấn nút **"Thêm"** hoặc nhấn phím **Enter** trong form:
  - Lấy giá trị từ 3 input: Họ tên, Số điện thoại, Email
  - **Validate** dữ liệu trước khi thêm (xem phần Validation)
  - Thêm liên hệ mới vào bảng danh sách
  - Reset form sau khi thêm thành công
  - Hiển thị **alert** thông báo "Thêm liên hệ thành công!"
  - Cập nhật lại STT tự động

**Gợi ý:**
```javascript
// Lắng nghe sự kiện submit form
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Ngăn form submit mặc định
  
  // Lấy giá trị từ input
  const name = document.getElementById('contact-name').value.trim();
  const phone = document.getElementById('contact-phone').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  
  // Validate
  if (!validateContact(name, phone, email)) {
    return;
  }
  
  // Thêm vào mảng và hiển thị
  // Reset form
  // Hiển thị alert
});
```

### 3.2. READ - Hiển thị danh sách liên hệ

**Yêu cầu:**
- Hiển thị tất cả liên hệ trong bảng với đầy đủ thông tin:
  - **STT**: Số thứ tự tự động (1, 2, 3, ...)
  - **Họ tên**: Tên đầy đủ của liên hệ
  - **Số điện thoại**: Số điện thoại (format: 0901234567)
  - **Email**: Địa chỉ email
  - **Hành động**: 2 nút Sửa và Xóa
- Cập nhật STT tự động khi thêm/xóa/sửa

**Gợi ý:**
```javascript
// Tạo dòng trong bảng
function createTableRow(contact, index) {
  const tr = document.createElement('tr');
  
  // Tạo các cột
  const sttCell = document.createElement('td');
  sttCell.textContent = index + 1;
  
  const nameCell = document.createElement('td');
  nameCell.textContent = contact.name;
  
  const phoneCell = document.createElement('td');
  phoneCell.textContent = contact.phone;
  
  const emailCell = document.createElement('td');
  emailCell.textContent = contact.email;
  
  // Tạo nút Sửa và Xóa
  const actionCell = document.createElement('td');
  // ... tạo buttons
  
  tr.appendChild(sttCell);
  // ... append các cell khác
  
  return tr;
}
```

### 3.3. UPDATE - Sửa liên hệ

**Yêu cầu:**
- Khi click nút **"Sửa"** của một liên hệ:
  - Điền dữ liệu liên hệ vào form (Họ tên, Số điện thoại, Email)
  - Đổi text nút **"Thêm"** thành **"Cập nhật"**
  - Lưu index/id của liên hệ đang sửa
- Khi nhấn nút **"Cập nhật"**:
  - **Validate** dữ liệu
  - Cập nhật thông tin liên hệ trong danh sách
  - Reset form và đổi lại nút thành **"Thêm"**
  - Hiển thị **alert** thông báo "Cập nhật liên hệ thành công!"
  - Cập nhật lại bảng

**Gợi ý:**
```javascript
// Lưu trạng thái đang sửa
let editingIndex = null;

// Khi click Sửa
function editContact(index) {
  editingIndex = index;
  const contact = contacts[index];
  
  // Điền dữ liệu vào form
  document.getElementById('contact-name').value = contact.name;
  document.getElementById('contact-phone').value = contact.phone;
  document.getElementById('contact-email').value = contact.email;
  
  // Đổi text nút
  const submitBtn = document.querySelector('.btn-add');
  submitBtn.textContent = 'Cập nhật';
}

// Khi submit form
if (editingIndex !== null) {
  // Cập nhật liên hệ
  contacts[editingIndex] = { name, phone, email };
  renderTable();
  editingIndex = null;
  submitBtn.textContent = 'Thêm';
  alert('Cập nhật liên hệ thành công!');
} else {
  // Thêm liên hệ mới
}
```

### 3.4. DELETE - Xóa liên hệ

**Yêu cầu:**
- Khi click nút **"Xóa"** của một liên hệ:
  - Hiển thị **alert** xác nhận: "Bạn có chắc chắn muốn xóa liên hệ này?"
  - Nếu người dùng chọn **OK**: Xóa liên hệ khỏi danh sách
  - Nếu người dùng chọn **Cancel**: Không làm gì
  - Sau khi xóa thành công, hiển thị **alert** "Xóa liên hệ thành công!"
  - Cập nhật lại STT

**Gợi ý:**
```javascript
function deleteContact(index) {
  if (confirm('Bạn có chắc chắn muốn xóa liên hệ này?')) {
    // Xóa liên hệ khỏi mảng
    contacts.splice(index, 1);
    
    // Cập nhật lại bảng
    renderTable();
    
    // Hiển thị alert thành công
    alert('Xóa liên hệ thành công!');
  }
}
```

## 4. VALIDATION - KIỂM TRA DỮ LIỆU

### 4.1. Validation cho Họ tên

- **Không được để trống**
- **Độ dài tối thiểu**: 2 ký tự
- **Chỉ chứa chữ cái, khoảng trắng và dấu tiếng Việt** (không chứa số hoặc ký tự đặc biệt)
- Hiển thị **alert** lỗi: "Họ tên không được để trống!" hoặc "Họ tên phải có ít nhất 2 ký tự!" hoặc "Họ tên không được chứa số hoặc ký tự đặc biệt!"

### 4.2. Validation cho Số điện thoại

- **Không được để trống**
- **Định dạng**: Phải là số điện thoại Việt Nam hợp lệ
  - Bắt đầu bằng 0
  - Có 10 chữ số (ví dụ: 0901234567, 0912345678)
  - Hoặc bắt đầu bằng +84 và có 9 chữ số sau (ví dụ: +84901234567)
- Hiển thị **alert** lỗi: "Số điện thoại không được để trống!" hoặc "Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại 10 chữ số (bắt đầu bằng 0) hoặc định dạng quốc tế (+84...)"

### 4.3. Validation cho Email

- **Không được để trống**
- **Định dạng**: Phải là email hợp lệ
  - Có ký tự @
  - Có phần trước @ (local part)
  - Có phần sau @ (domain) với ít nhất một dấu chấm
  - Ví dụ hợp lệ: `user@example.com`, `test.email@domain.co.uk`
- **Không được trùng** với email đã tồn tại (khi thêm mới)
- Hiển thị **alert** lỗi: "Email không được để trống!" hoặc "Email không hợp lệ!" hoặc "Email đã tồn tại trong danh bạ!"

**Gợi ý sử dụng Regular Expression:**
```javascript
function validateContact(name, phone, email, address) {
  // Validate họ tên
  if (!name || name.trim() === '') {
    alert('Họ tên không được để trống!');
    return false;
  }
  
  if (name.trim().length < 2) {
    alert('Họ tên phải có ít nhất 2 ký tự!');
    return false;
  }
  
  // Kiểm tra họ tên chỉ chứa chữ cái, khoảng trắng và dấu tiếng Việt
  const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
  if (!nameRegex.test(name.trim())) {
    alert('Họ tên không được chứa số hoặc ký tự đặc biệt!');
    return false;
  }
  
  // Validate số điện thoại
  if (!phone || phone.trim() === '') {
    alert('Số điện thoại không được để trống!');
    return false;
  }
  
  // Regex cho số điện thoại Việt Nam: 0xxxxxxxxx (10 số) hoặc +84xxxxxxxxx
  const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
  if (!phoneRegex.test(phone.trim())) {
    alert('Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại 10 chữ số (bắt đầu bằng 0) hoặc định dạng quốc tế (+84...)');
    return false;
  }
  
  // Validate email
  if (!email || email.trim() === '') {
    alert('Email không được để trống!');
    return false;
  }
  
  // Regex cho email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    alert('Email không hợp lệ!');
    return false;
  }
  
  // Kiểm tra trùng email (khi thêm mới)
  if (isAdding && contacts.some(c => c.email.toLowerCase() === email.trim().toLowerCase())) {
    alert('Email đã tồn tại trong danh bạ!');
    return false;
  }
  
  // Validate địa chỉ (nếu có)
  if (address && address.trim() !== '' && address.trim().length < 5) {
    alert('Địa chỉ phải có ít nhất 5 ký tự!');
    return false;
  }
  
  return true;
}
```

## 5. ALERT - THÔNG BÁO

Sử dụng `alert()` của JavaScript để hiển thị thông báo:

### 5.1. Thông báo thành công

- **Thêm liên hệ**: "Thêm liên hệ thành công!"
- **Sửa liên hệ**: "Cập nhật liên hệ thành công!"
- **Xóa liên hệ**: "Xóa liên hệ thành công!"

### 5.2. Thông báo lỗi (Validation)

- Các thông báo lỗi đã được liệt kê trong phần **Validation** (mục 4)

### 5.3. Thông báo xác nhận

- **Xóa liên hệ**: Sử dụng `confirm()` để xác nhận trước khi xóa

**Gợi ý:**
```javascript
// Thông báo thành công
alert('Thêm liên hệ thành công!');

// Thông báo lỗi
alert('Email không hợp lệ!');

// Xác nhận xóa
if (confirm('Bạn có chắc chắn muốn xóa liên hệ này?')) {
  // Xóa liên hệ
}
```

## 6. CẤU TRÚC DỮ LIỆU

**Lưu trữ danh sách liên hệ trong mảng JavaScript:**

```javascript
let contacts = [
  {
    name: 'Nguyễn Văn An',
    phone: '0901234567',
    email: 'nguyenvanan@email.com',
    address: '123 Đường ABC, Quận 1, TP.HCM'
  },
  {
    name: 'Trần Thị Bình',
    phone: '0912345678',
    email: 'tranthibinh@email.com',
    address: '456 Đường XYZ, Quận 2, TP.HCM'
  },
  // ... các liên hệ khác
];
```

## 7. YÊU CẦU KỸ THUẬT

- **Chỉ sử dụng JavaScript thuần** (Vanilla JavaScript), không dùng thư viện như jQuery, React, Vue...
- **Không được sửa đổi HTML và CSS** (trừ khi cần thiết để thêm id/class cho JavaScript)
- Code phải **rõ ràng, có comment** giải thích các đoạn code quan trọng
- **Xử lý lỗi** đầy đủ, không để ứng dụng bị crash
- **Sử dụng Regular Expression** để validate email và số điện thoại

## 8. ĐÁNH GIÁ

### 8.1. Tiêu chí chấm điểm

| Tiêu chí | Điểm | Mô tả |
|----------|------|-------|
| **CRUD đầy đủ** | 4 điểm | Thêm, Sửa, Xóa, Hiển thị hoạt động đúng |
| **Validation** | 3 điểm | Validate đầy đủ các trường (tên, phone, email, địa chỉ), sử dụng Regex cho email và phone |
| **Code quality** | 1.5 điểm | Code rõ ràng, có comment, không lỗi, sử dụng Regex đúng cách |
| **Alert thông báo** | 1.5 điểm | Hiển thị alert đầy đủ cho các thao tác và validation |

**Tổng điểm: 10 điểm**

### 8.2. Yêu cầu nộp bài

Để hoàn thành bài tập, học viên cần:

1. **Đưa mã nguồn lên GitHub**
   - Tạo repository mới trên GitHub
   - Push toàn bộ mã nguồn (HTML, CSS, JavaScript) lên repository
   - Đảm bảo repository là **public** hoặc cấp quyền truy cập cho giảng viên

2. **Dán link repository lên phần nộp bài**
   - Copy link repository (ví dụ: `https://github.com/username/contact-manager`)
   - Dán vào phần nộp bài trên hệ thống

3. **File README.md** (khuyến khích)
   - Mô tả ngắn gọn về dự án
   - Hướng dẫn chạy ứng dụng
   - Screenshot giao diện (nếu có)

## 9. HƯỚNG DẪN BẮT ĐẦU

1. **Mở file `contact.html`** trong trình duyệt để xem giao diện

2. **Mở file `contact.js`** và bắt đầu viết code

3. **Test từng chức năng:**
   - Test thêm liên hệ với các trường hợp validation
   - Test sửa liên hệ
   - Test xóa liên hệ
   - Test các trường hợp lỗi validation

4. **Kiểm tra lại:**
   - Tất cả chức năng hoạt động đúng
   - Validation đầy đủ (đặc biệt là Regex cho email và phone)
   - Alert hiển thị đúng
   - Không có lỗi trong Console

5. **Push lên GitHub và nộp bài**

## 10. LƯU Ý

- **Không copy code** từ bạn bè hoặc các nguồn khác
- **Nộp bài đúng hạn** theo quy định của lớp học
- **Liên hệ giảng viên** nếu có thắc mắc trong quá trình làm bài
- **Test kỹ** trước khi nộp bài để tránh lỗi không đáng có
- **Chú ý sử dụng Regex** đúng cách cho validation email và số điện thoại

## 11. TÀI LIỆU THAM KHẢO

### Regular Expression cho Email:
```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

### Regular Expression cho Số điện thoại Việt Nam:
```javascript
/^(0|\+84)[0-9]{9,10}$/
```

### Regular Expression cho Họ tên (chỉ chữ cái, khoảng trắng, dấu tiếng Việt):
```javascript
/^[a-zA-ZÀ-ỹ\s]+$/
```

---

**Chúc các bạn làm bài tốt! 🚀**
