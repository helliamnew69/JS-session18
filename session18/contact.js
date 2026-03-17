const form = document.getElementById("contact-form");
const nameInput = document.getElementById("contact-name");
const phoneInput = document.getElementById("contact-phone");
const emailInput = document.getElementById("contact-email");
const contactTbody = document.getElementById("contact-tbody");

let contacts = [
  { name: "Nguyễn Văn An", phone: "0901234567", email: "nguyenvanan@email.com" },
  { name: "Trần Thị Bình", phone: "0912345678", email: "tranthibinh@email.com" },
  { name: "Lê Văn Cường", phone: "0923456789", email: "levancuong@email.com" },
  { name: "Phạm Thị Dung", phone: "0934567890", email: "phamthidung@email.com" },
  { name: "Hoàng Văn Em", phone: "0945678901", email: "hoangvanem@email.com" },
];

function renderContacts() {
  if (!contactTbody) return;

  contactTbody.innerHTML = "";

  contacts.forEach((contact, index) => {
    const row = document.createElement("tr");   
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${contact.name}</td>
      <td>${contact.phone}</td>
      <td>${contact.email}</td>
      <td>
        <div class="action-buttons">
          <button type="button" class="btn-edit">Sửa</button>
          <button type="button" class="btn-delete">Xóa</button>
        </div>
      </td>
    `;
    contactTbody.appendChild(row);
  });
}

function resetValidation() {
  nameInput.style.borderColor = "";
  phoneInput.style.borderColor = "";
  emailInput.style.borderColor = "";
}

function validateName() {
  const value = nameInput.value.trim();
  if (value.length > 0) {
    nameInput.style.borderColor = "green";
    return true;
  }
  return false;
}

function validatePhone() {
  const value = phoneInput.value.trim();
  const isValid = /^(0|\+84)[0-9]{9,10}$/.test(value);
  phoneInput.style.borderColor = isValid ? "green" : "red";
  return isValid;
}

function validateEmail() {
  const value = emailInput.value.trim();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  emailInput.style.borderColor = isValid ? "green" : "red";
  return isValid;
}

function addContact(event) {
  event.preventDefault();
  resetValidation();

  const nameValue = nameInput.value.trim();
  const phoneValue = phoneInput.value.trim();
  const emailValue = emailInput.value.trim();

  const isNameValid = validateName();
  const isPhoneValid = validatePhone();
  const isEmailValid = validateEmail();

  if (!isNameValid || !isPhoneValid || !isEmailValid) {
    alert("Vui lòng kiểm tra lại dữ liệu: Họ tên, số điện thoại, email.");
    return;
  }

  contacts.push({
    name: nameValue,
    phone: phoneValue,
    email: emailValue,
  });

  renderContacts();
  form.reset();
  resetValidation();
  alert("Thêm liên hệ thành công!");
}


form.addEventListener("submit", addContact);

renderContacts();