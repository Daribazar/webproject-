async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        renderProducts(products);

        // Add event listener to the category filter
        const categorySelect = document.getElementById('category');
        categorySelect.addEventListener('change', () => filterProducts(products));
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

function filterProducts(products) {
    const categorySelect = document.getElementById('category');
    const selectedCategory = categorySelect.value;

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory);

    renderProducts(filteredProducts);
}

// Start by loading products and setting up the filter
fetchProducts();
