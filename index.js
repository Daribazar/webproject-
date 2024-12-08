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