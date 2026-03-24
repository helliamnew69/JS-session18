// LocalStorage key
const STORAGE_KEY = 'products_data';

// Mảng lưu trữ danh sách sản phẩm
let products = [];
let productIdCounter = 1;
let editingProductId = null;

// Lấy các phần tử DOM
const productForm = document.getElementById('productForm');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const clearAllBtn = document.getElementById('clearAllBtn');

const productName = document.getElementById('productName');
const productCategory = document.getElementById('productCategory');
const productPrice = document.getElementById('productPrice');
const productQuantity = document.getElementById('productQuantity');
const productDescription = document.getElementById('productDescription');

const searchInput = document.getElementById('searchInput');
const filterCategory = document.getElementById('filterCategory');

const productTableBody = document.getElementById('productTableBody');
const emptyState = document.getElementById('emptyState');
const totalProducts = document.getElementById('totalProducts');
const totalValue = document.getElementById('totalValue');
const totalQuantity = document.getElementById('totalQuantity');

// ===== LOCALSTORAGE FUNCTIONS =====

// Lưu dữ liệu vào localStorage
function saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        products: products,
        idCounter: productIdCounter
    }));
}

// Load dữ liệu từ localStorage
function loadFromLocalStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        try {
            const parsed = JSON.parse(data);
            products = parsed.products || [];
            productIdCounter = parsed.idCounter || 1;
        } catch (e) {
            console.error('Error loading data from localStorage:', e);
            products = [];
            productIdCounter = 1;
        }
    }
}

// Xóa tất cả dữ liệu
function clearAllData() {
    const confirm = window.confirm('Bạn có chắc chắn muốn xóa TẤT CẢ sản phẩm? Hành động này không thể hoàn tác!');
    if (confirm) {
        products = [];
        productIdCounter = 1;
        saveToLocalStorage();
        renderProducts();
        updateStats();
        alert('Đã xóa tất cả sản phẩm!');
    }
}

// ===== KHỞI TẠO ỨNG DỤNG =====

function init() {
    loadFromLocalStorage();
    renderProducts();
    updateStats();
    
    // Event listeners
    productForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', cancelEdit);
    clearAllBtn.addEventListener('click', clearAllData);
    searchInput.addEventListener('input', handleSearch);
    filterCategory.addEventListener('change', handleFilter);
}

// ===== FORM HANDLING =====

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Lấy dữ liệu từ form
    const name = productName.value.trim();
    const category = productCategory.value;
    const price = parseFloat(productPrice.value);
    const quantity = parseInt(productQuantity.value);
    const description = productDescription.value.trim();
    
    // Validate
    if (!name || !category || isNaN(price) || isNaN(quantity)) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }
    
    if (price < 0) {
        alert('Giá không được âm!');
        return;
    }
    
    if (quantity < 0) {
        alert('Số lượng không được âm!');
        return;
    }
    
    if (editingProductId) {
        // Cập nhật sản phẩm
        updateProduct(editingProductId, name, category, price, quantity, description);
    } else {
        // Thêm sản phẩm mới
        addProduct(name, category, price, quantity, description);
    }
    
    // Reset form
    resetForm();
}

// ===== CRUD OPERATIONS =====

// Thêm sản phẩm mới
function addProduct(name, category, price, quantity, description) {
    const newProduct = {
        id: productIdCounter++,
        name: name,
        category: category,
        price: price,
        quantity: quantity,
        description: description,
        createdAt: new Date().toISOString()
    };
    
    products.push(newProduct);
    saveToLocalStorage();
    renderProducts();
    updateStats();
}

// Cập nhật sản phẩm
function updateProduct(id, name, category, price, quantity, description) {
    const product = products.find(p => p.id === id);
    if (product) {
        product.name = name;
        product.category = category;
        product.price = price;
        product.quantity = quantity;
        product.description = description;
        product.updatedAt = new Date().toISOString();
        
        saveToLocalStorage();
        renderProducts();
        updateStats();
    }
}

// Xóa sản phẩm
function deleteProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"?`);
    
    if (confirmDelete) {
        products = products.filter(p => p.id !== id);
        saveToLocalStorage();
        renderProducts();
        updateStats();
        
        // Nếu đang sửa sản phẩm này thì reset form
        if (editingProductId === id) {
            resetForm();
        }
    }
}

// Sửa sản phẩm
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    // Điền dữ liệu vào form
    productName.value = product.name;
    productCategory.value = product.category;
    productPrice.value = product.price;
    productQuantity.value = product.quantity;
    productDescription.value = product.description || '';
    
    // Cập nhật UI
    formTitle.textContent = 'Chỉnh Sửa Sản Phẩm';
    submitBtn.innerHTML = '💾 Cập Nhật';
    cancelBtn.style.display = 'block';
    
    // Lưu ID đang chỉnh sửa
    editingProductId = id;
    
    // Scroll to form
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    productName.focus();
}

// Hủy chỉnh sửa
function cancelEdit() {
    resetForm();
}

// Reset form
function resetForm() {
    productForm.reset();
    formTitle.textContent = 'Thêm Sản Phẩm Mới';
    submitBtn.innerHTML = '➕ Thêm Sản Phẩm';
    cancelBtn.style.display = 'none';
    editingProductId = null;
}

// ===== RENDER & DISPLAY =====

// Render danh sách sản phẩm
function renderProducts(filteredProducts = null) {
    const productsToRender = filteredProducts || products;
    
    productTableBody.innerHTML = '';
    
    if (productsToRender.length === 0) {
        emptyState.classList.add('show');
        return;
    }
    
    emptyState.classList.remove('show');
    
    productsToRender.forEach(product => {
        const row = createProductRow(product);
        productTableBody.appendChild(row);
    });
}

// Tạo hàng trong bảng cho sản phẩm
function createProductRow(product) {
    const tr = document.createElement('tr');
    
    const priceFormatted = formatPrice(product.price);
    const quantityClass = product.quantity < 10 ? 'low-stock' : '';
    
    tr.innerHTML = `
        <td>${product.id}</td>
        <td><strong>${product.name}</strong></td>
        <td>${product.category}</td>
        <td class="price">${priceFormatted}</td>
        <td class="quantity ${quantityClass}">${product.quantity}</td>
        <td class="description">${product.description || 'Không có mô tả'}</td>
        <td>
            <div class="action-buttons">
                <button class="btn-edit" onclick="editProduct(${product.id})">
                    ✏️ Sửa
                </button>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">
                    🗑️ Xóa
                </button>
            </div>
        </td>
    `;
    
    return tr;
}

// Format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// ===== SEARCH & FILTER =====

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const categoryFilter = filterCategory.value;
    
    let filtered = products;
    
    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filter by category
    if (categoryFilter) {
        filtered = filtered.filter(p => p.category === categoryFilter);
    }
    
    renderProducts(filtered);
}

function handleFilter() {
    handleSearch(); // Sử dụng lại logic search
}

// ===== STATISTICS =====

function updateStats() {
    // Tổng số sản phẩm
    totalProducts.textContent = products.length;
    
    // Tổng giá trị
    const total = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    totalValue.textContent = formatPrice(total);
    
    // Tổng số lượng
    const quantity = products.reduce((sum, p) => sum + p.quantity, 0);
    totalQuantity.textContent = quantity;
}

// ===== KHỞI CHẠY ỨNG DỤNG =====
init();
