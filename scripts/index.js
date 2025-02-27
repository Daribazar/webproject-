 // Бүтээгдэхүүний мэдээллийг JSON-оос татаж авах функц
 async function fetchProducts() {
    try {
        const response = await fetch('products.json'); // javascriptiin fetch api ashiglan http hvselt ilgeen ugugdliig tataj awah function
        const products = await response.json();  //async vildl duustal shiglagdh ba json ugugdliig object helbert vvsgj bga helber
        renderProducts(products); // product ugugdliig renderlen haruulah function

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
        console.error('Мэдээлэл татахад алдаа гарлаа:', error); //aldaa barij awch bui heseg
    }
}

// Бүтээгдэхүүний жагсаалтыг харуулах функц
function renderProducts(products) {
    const productList = document.getElementById('product-list');//product-list id tai elementiig barij awj bn
    productList.innerHTML = '';//tuhain elemntiig onooson utgaar haruulahin tuld hooslon dahin html bicij bn

    products.forEach(product => { //product array tus bvrt function duudaj uguud tuhain array bvrt tohiroh utguudig duudaj ugch bn
        const productDiv = document.createElement('div');//shine div element vvsgej bn
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Үнэ: ${product.price}</p>
        `;
        productDiv.addEventListener('click', () => showProductDetails(product));
        productList.appendChild(productDiv);//shineer vvsgesen div elemtiig product-listed nemj bn
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

// Гадуур дарж, карт хаах
window.addEventListener('click', function(event) {
    const cartTab = document.querySelector('.cardtab');
    const cartIcon = document.querySelector('.iconcard');
    
    if (!cartTab.contains(event.target) && !cartIcon.contains(event.target)) {
        closeCart();
    }
});

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
     alert(`"${name}" барааг сагсанд амжилттай нэмлээ!`);
     updateCartDisplay();
    closeModal();
     // Сагсны мэдээллийг localStorage-д хадгалах
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', cartTotal);
} 

function removeFromCart(index, event) {
    // event zogsooj bn
    event.stopPropagation();
    
    // Сагсны жагсаалтаас элемент устгах
    const removedItem = cartItems.splice(index, 1)[0];
    // Нийт үнийн дүнгээс тухайн барааны үнийг хасах
    cartTotal -= removedItem.price;
    // Сагсны барааны тоог шинэчлэх
    const counter = document.getElementById('cart-counter');
    counter.textContent = cartItems.length;
    // Сагсны дэлгэцийг шинэчлэх
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');

    cartItemsDiv.innerHTML = '';

    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price}</span>
            <button onclick="removeFromCart(${index}, event)" class="remove-btn">X</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    cartTotalDiv.textContent = `Нийт: $${cartTotal}`;
}
