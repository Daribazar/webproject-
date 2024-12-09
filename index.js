// Бүтээгдэхүүний мэдээллийг JSON-оос татаж авах функц
async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        renderProducts(products);

        // Ангиллын шүүлтүүрт үйлдэл нэмж оруулах
        const categorySelect = document.getElementById('category');
        categorySelect.addEventListener('change', () => {
            const selectedCategory = categorySelect.value;
            filterProducts(products, selectedCategory);
        });

        // URL-аас ангиллын параметрийг авах ба бүтээгдэхүүнүүдийг шүүх
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFromUrl = urlParams.get('category') || 'all';
        categorySelect.value = categoryFromUrl;
        filterProducts(products, categoryFromUrl);
    } catch (error) {
        console.error('Мэдээлэл татахад алдаа гарлаа:', error);
    }
}

// Бүтээгдэхүүний жагсаалтыг харуулах функц
function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Үнэ: ${product.price}</p>
        `;
        productDiv.addEventListener('click', () => showProductDetails(product));
        productList.appendChild(productDiv);
    });
}

// Бүтээгдэхүүнийг ангилаар нь шүүх функц
function filterProducts(products, selectedCategory = 'all') {
    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory);
    renderProducts(filteredProducts);

    // URL-ыг сонгосон ангиллын дагуу шинэчлэх
    const url = new URL(window.location);
    url.searchParams.set('category', selectedCategory);
    window.history.pushState({}, '', url);
}

// Бүтээгдэхүүний дэлгэрэнгүй мэдээллийг modal-д харуулах функц
function showProductDetails(product) {
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-price').textContent = `Үнэ: ${product.price}`;
    document.getElementById('modal-description').textContent = product.description;

    const modal = document.getElementById('product-modal');
    modal.style.display = 'block';
}

// Modal-ыг хаах функц
function closeModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none';
}

// Хуудас ачааллах үед бүтээгдэхүүнийг татаж авах
fetchProducts();

// Шоппинг картын функцууд
const cartIcon = document.querySelector('.iconcard');
const cartTab = document.querySelector('.cardtab');
const closeButton = document.querySelector('.closee');

function openCart() {
    cartTab.style.display = 'grid';
}

function closeCart() {
    cartTab.style.display = 'none';
}

cartIcon.addEventListener('click', openCart);
closeButton.addEventListener('click', closeCart);

// Картын удирдлагын хувьсагчид
let cartItems = [];
let cartTotal = 0;

function addToCart(event) {
    event.preventDefault();

    const name = document.getElementById('modal-title').textContent;
    const priceText = document.getElementById('modal-price').textContent;
    const price = parseFloat(priceText.replace(/[^0-9]/g, ''));

    const item = { name, price };
    cartItems.push(item);
    cartTotal += item.price;

    const counter = document.getElementById('cart-counter');
    counter.textContent = cartItems.length;

    updateCartDisplay();
    closeModal();
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');

    cartItemsDiv.innerHTML = '';

    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price}</span>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    cartTotalDiv.textContent = `Нийт: $${cartTotal}`;
}
