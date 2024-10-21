async function fetchProducts() {
    try {
        const response = await fetch('products.json'); // Локал JSON файлыг татах
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Өгөгдөл татахад алдаа гарлаа:', error);
    }
}

function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Үнэ: $${product.price}</p>
        `;
        productList.appendChild(productDiv);
    });
}

function filterProducts() {
    const categorySelect = document.getElementById('category');
    const selectedCategory = categorySelect.value;

    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const filteredProducts = selectedCategory === 'all'
                ? products
                : products.filter(product => product.category === selectedCategory);
            renderProducts(filteredProducts);
        });
}

// Дата ачаалах функцыг дуудаж эхэлнэ
fetchProducts();
