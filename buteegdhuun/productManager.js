export default class ProductManager {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.products = [];
    }

    // JSON өгөгдлийг fetch хийх
    async fetchProducts() {
        try {
            const response = await fetch(this.dataUrl);
            this.products = await response.json();
        } catch (error) {
            console.error('Өгөгдлийг татаж чадсангүй:', error);
        }
    }

    // Бүтээгдэхүүнийг HTML-д нэмэх
    renderProducts(products) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product-item';
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Үнэ: ${product.price}</p>
            `;
            productDiv.addEventListener('click', () => this.showProductDetails(product));
            productList.appendChild(productDiv);
        });
    }

    // Бүтээгдэхүүнийг категорийн дагуу шүүх (filter ашиглан)
    filterProducts(category) {
        const filteredProducts = category === 'all' 
            ? this.products 
            : this.products.filter(product => product.category === category);

        this.renderProducts(filteredProducts);

        // URL шинэчлэх
        const url = new URL(window.location);
        url.searchParams.set('category', category);
        window.history.pushState({}, '', url);
    }

    // URL-ээс параметр авч шүүлт хийх
    renderFilteredProducts(category) {
        document.getElementById('category').value = category;
        this.filterProducts(category);
    }

    // Modal ашиглан бүтээгдэхүүний дэлгэрэнгүйг үзүүлэх
    showProductDetails(product) {
        document.getElementById('modal-image').src = product.image;
        document.getElementById('modal-title').textContent = product.name;
        document.getElementById('modal-price').textContent = `Үнэ: ${product.price}`;
        document.getElementById('modal-description').textContent = product.description;
        document.getElementById('product-modal').style.display = 'block';
    }

    // **Шинэ нэмэлт функцууд**

    // Бүтээгдэхүүнүүдийн үнийн жагсаалтыг буцаах (map ашиглан)
    getProductPrices() {
        const prices = this.products.map(product => product.price);
        console.log("Бүх бүтээгдэхүүний үнэ:", prices);
        return prices;
    }

    // Бүтээгдэхүүнүүдийн нийт үнийг тооцоолох (reduce ашиглан)
    getTotalPrice() {
        const totalPrice = this.products.reduce((total, product) => total + product.price, 0);
        console.log("Бүх бүтээгдэхүүний нийт үнэ:", totalPrice);
        return totalPrice;
    }

    
}