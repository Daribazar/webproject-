// Бүтээгдэхүүний мэдээллийг татаж авах, шүүж харуулах үндсэн функц
async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        renderProducts(products);

        // Category filter-д event listener нэмэх
        const categorySelect = document.getElementById('category');
        categorySelect.addEventListener('change', () => filterProducts(products));
    } catch (error) {
        console.error('Өгөгдөл татахад алдаа гарлаа:', error);
    }
}

// Бүтээгдэхүүний жагсаалтыг гаргах функц
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
        // Бүтээгдэхүүн дээр дарахад showProductDetails функцийг дуудах
        productDiv.addEventListener('click', () => showProductDetails(product));
        
        productList.appendChild(productDiv);
    });
}

// Бүтээгдэхүүнийг ангиллаар шүүж харуулах функц
function filterProducts(products) {
    const categorySelect = document.getElementById('category');
    const selectedCategory = categorySelect.value;

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory);

    renderProducts(filteredProducts);
}

// Бүтээгдэхүүний дэлгэрэнгүй мэдээллийг modal-д харуулах функц

function showProductDetails(product) {
    // Modal-ийн элементийн контентыг шинэчлэх
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-price').textContent = `Үнэ: ${product.price}`;
    document.getElementById('modal-description').textContent = product.description;
    
    // Modal-г харагддаг болгох
    const modal = document.getElementById('product-modal');
    modal.style.display = 'block';
}
// Modal-г хаах функц
function closeModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none';
}

fetchProducts();
