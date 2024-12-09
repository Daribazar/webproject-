// bvteegdehvvni medeellig tataj awch shvvh function
async function fetchProducts(){
    try {
        const response = await fetch('products.json'); // 'products.json' file-aas bvteegdehvvnvvdig tataj awch baina
        const products = await response.json();
        renderProducts(products);

        // Category filter-д event listener nemj uguw
        const categorySelect = document.getElementById('category');
        categorySelect.addEventListener('change', () => {         // ymar categoryd select hiisnees hamaarch shvvj ugch baina
            const selectedCategory = categorySelect.value;
            filterProducts(products, selectedCategory);
        });

        // URL-aas shvvltvvriin parametr unshih functio heseg
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFromUrl = urlParams.get('category') || 'all'; // URL-iin category hesgees parametrig awch baina
        categorySelect.value = categoryFromUrl; // select elementiin utgiig awch bui
        filterProducts(products, categoryFromUrl); // URL-aas awsan hesgeer shvvj baina

    } catch (error) {
        console.error('ugugdul tatahad error zaaw', error); // herwee ugugdul tataj chadahgui bol console deer hewleh heseg
    }
}

// bvteegdehvvnii jagsaaltig gargah function
function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // innerHTML ashiglaw

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

// bvteegdehvvnig angillaar ni shvvh function
function filterProducts(products, selectedCategory = 'all') {
    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory); // yamar category-iig select hiisnes shaltgaalan tuhain bvteegdehvvnig shvvj bui heseg
    renderProducts(filteredProducts);
//URL-aar shvvh heseg
    const url = new URL(window.location);
    url.searchParams.set('category', selectedCategory); // URL-iin heseh shinechlegdeh heseg
    window.history.pushState({}, '', url); // URL-iin hesgiig deed zamd shinechilj bui heseg
}

// bvteegdehvvnii neriig alert-ad haruulj ugch bui heseg
function showProductDetails(product) {
    alert(`Дэлгэрэнгүй: ${product.name}`);
}

//Fetch hiin bvteegdehvvnig tataj awch baina
fetchProducts();


//bvteegdehvvnii delgerengui medeellig modal ashiglan neg tsonhond achaallaj bui heseg
function showProductDetails(product) {
    // tuhain json file-aas modal-aar duudan ymar medeellig haruulahig json file-aas gargaj irj baina
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-price').textContent = `Үнэ: ${product.price}`;
    document.getElementById('modal-description').textContent = product.description;
    
    // Modal-iig haruulah heseg
    const modal = document.getElementById('product-modal');
    modal.style.display = 'block';
}
// Modal-iig hasah exit heseg
function closeModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none';
}

fetchProducts();// fetch hiin medeellig tataj awch bn

// Шоппинг картын иконыг болон хаах товчийг авах
const cartIcon = document.querySelector('.iconcard');  // Шоппинг картын иконыг сонгох
const cartTab = document.querySelector('.cardtab');    // Шоппинг картын табыг сонгох
const closeButton = document.querySelector('.closee'); // Хаах товчийг сонгох

// Шоппинг картыг нээх функц
function openCart() {
    cartTab.style.display = 'grid'; // Шоппинг картыг харуулах
}

// Шоппинг картыг хаах функц
function closeCart() {
    cartTab.style.display = 'none'; // Шоппинг картыг нууцлах
}

// Карт иконыг дарж шоппинг картыг нээхэд зориулсан үйлдэл нэмэх
cartIcon.addEventListener('click', openCart); // Карт иконыг дархад openCart функц ажиллана

// Хаах товчийг дарж шоппинг картыг хаахад зориулсан үйлдэл нэмэх
closeButton.addEventListener('click', closeCart); // Хаах товчийг дархад closeCart функц ажиллана

// Add these variables at the top of your file
let cartItems = [];  // Картын бүтээгдэхүүнүүдийг хадгалах массив
let cartTotal = 0;   // Картын нийт үнийн дүн

// Бүтээгдэхүүнийг шоппинг карт руу нэмэх функц
function addToCart(event) {
    event.preventDefault(); // Бүтээгдэхүүн нэмэх үед хуудсийг шинэчлэхээс сэргийлэх
    
    // Модалын бүтээгдэхүүний мэдээллийг авах
    const name = document.getElementById('modal-title').textContent; // Бүтээгдэхүүний нэр
    const priceText = document.getElementById('modal-price').textContent; // Бүтээгдэхүүний үнэ (текст)
    
    // "Үнэ: 1234" форматнаас зөвхөн тоог гаргаж авах
    const price = parseFloat(priceText.replace(/[^0-9]/g, '')); // Үнэ нь тоон утга болгох
    
    // Карт дахь бүтээгдэхүүний объект үүсгэх
    const item = {
        name: name,  // Бүтээгдэхүүний нэр
        price: price // Бүтээгдэхүүний үнэ
    };
    
    // Карт руу бүтээгдэхүүн нэмэх
    cartItems.push(item); // Бүтээгдэхүүнийг cartItems массив руу нэмэх
    
    // Картын нийт үнийн дүнг шинэчлэх
    cartTotal += item.price; // Үнийн дүнг нэмэх
    
    // Картын тоог шинэчлэх
    const counter = document.getElementById('cart-counter'); // Картын тоог үзүүлэх элементийг авах
    counter.textContent = cartItems.length; // Картын бүтээгдэхүүний тоог шинэчлэх
    
    // Картын харуулалтыг шинэчлэх
    updateCartDisplay(); // updateCartDisplay функцыг дуудах
    
    // Модалыг хаах
    closeModal(); // Модалыг хаах функц дуудах
}

// Картын харуулалтыг шинэчлэх функц
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items'); // Картын бүтээгдэхүүнүүдийг үзүүлэх элементийг авах
    const cartTotalDiv = document.getElementById('cart-total'); // Картын нийт үнийн дүнг үзүүлэх элементийг авах
    
    // Одоогийн үзүүлж байгаа бүтээгдэхүүнүүдийг цэвэрлэх
    cartItemsDiv.innerHTML = ''; // Үндсэн дэлгэцийн контентийг устгах
    
    // Бүтээгдэхүүн бүрийг дэлгэцэнд нэмэх
    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');  // Шинэ div элемент үүсгэх
        itemDiv.className = 'cart-item';  // Класс нэмэх
        itemDiv.innerHTML = `
            <span>${item.name}</span>  // Бүтээгдэхүүний нэр
            <span>$${item.price}</span>  // Бүтээгдэхүүний үнэ
        `;
        cartItemsDiv.appendChild(itemDiv);  // Шинээр үүсгэсэн div элементийг картын бүтээгдэхүүнүүдийн хэсэгт нэмэх
    });
    
    // Нийт үнийн дүнг шинэчлэх
    cartTotalDiv.textContent = `Total: $${cartTotal}`;  // Нийт үнийн дүнг харуулах
}