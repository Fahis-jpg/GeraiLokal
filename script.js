let cartCount = 0;

// Angka ke Rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(number);
}

// Fungsi Kartu Produk
function renderProducts(filter = 'all') {
    const container = document.getElementById('product-container');
    if (!container) return;
    
    container.innerHTML = '';

    const filteredProducts = filter === 'all' 
        ? productsData 
        : productsData.filter(product => product.category === filter);

    filteredProducts.forEach(product => {
        const cardHTML = `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="product-card">
                    <div>
                        <img src="${product.image}" class="product-img" alt="${product.name}">
                        <div class="rating mb-1"><i class="bi bi-star-fill"></i> ${product.rating} (${product.reviews})</div>
                        <h6 class="fw-bold mb-1 text-navy">${product.name}</h6>
                        <small class="text-muted d-block mb-3">${product.unit}</small>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <span class="fw-bold fs-6 text-navy">${formatRupiah(product.price)}</span>
                        <button class="add-btn" onclick="addToCart('${product.name}')" title="Tambah ke Keranjang">
                            <i class="bi bi-plus-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

// Fungsi Tambah ke Keranjang
function addToCart(productName) {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    alert(`"${productName}" berhasil ditambahkan ke keranjang!`);
}

// Inisialisasi Event Listener
document.addEventListener('DOMContentLoaded', () => {

    // 1. Render Produk Awal
    renderProducts();

    // 2. Filter Kategori Produk
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            const category = e.target.getAttribute('data-filter');
            renderProducts(category);
        });
    });

    // 3. Navigasi Klik Navbar
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Scrollspy
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    let currentSectionId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });

    if (currentSectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
});