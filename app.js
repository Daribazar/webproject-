import ProductManager from './productManager.js';

(async function () {
    const productManager = new ProductManager('products.json');

    await productManager.fetchProducts();

    // URL-аас параметр авч шүүлт хийх
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';

    // Анхны шүүлт
    productManager.renderFilteredProducts(category);

    // Категори сонголт шүүлт
    const categorySelect = document.getElementById('category');
    categorySelect.addEventListener('change', () => {
        const selectedCategory = categorySelect.value;
        productManager.filterProducts(selectedCategory);
    });
})();
