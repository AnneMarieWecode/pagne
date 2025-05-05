    const pagnesData = [
        { id: 1, name: "Kente Royal", category: "Kente", price: 15000, image: "/api/placeholder/300/300" },
        { id: 2, name: "Bogolan Traditionnel", category: "Bogolan", price: 12000, image: "/api/placeholder/300/300" },
        { id: 3, name: "Ankara Floral", category: "Ankara", price: 9000, image: "/api/placeholder/300/300" },
        { id: 4, name: "Bazin Riche Brodé", category: "Bazin", price: 25000, image: "/api/placeholder/300/300" },
        { id: 5, name: "Wax Hollandais", category: "Wax", price: 18000, image: "/api/placeholder/300/300" },
        { id: 6, name: "Kita Traditionnel", category: "Bogolan", price: 14000, image: "/api/placeholder/300/300" },
        { id: 7, name: "Wax Supreme", category: "Wax", price: 22000, image: "/api/placeholder/300/300" },
        { id: 8, name: "Kente Moderne", category: "Kente", price: 16500, image: "/api/placeholder/300/300" },
        { id: 9, name: "Ankara Géométrique", category: "Ankara", price: 8500, image: "/api/placeholder/300/300" }
    ];

    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const resultsGrid = document.getElementById('results-grid');
    const noSearch = document.getElementById('no-search');
    const noResults = document.getElementById('no-results');
    const loading = document.getElementById('loading');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " FCFA";
    }

    function searchPagnes() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const categoryValue = categoryFilter.value;
        const priceValue = priceFilter.value;
        
        if (searchTerm === '' && categoryValue === '' && priceValue === '') {
            noSearch.classList.remove('hidden');
            noResults.classList.add('hidden');
            resultsGrid.classList.add('hidden');
            return;
        }

        loading.style.display = 'block';
        noSearch.classList.add('hidden');
        noResults.classList.add('hidden');
        resultsGrid.classList.add('hidden');

        setTimeout(() => {
            let filteredPagnes = pagnesData.filter(pagne => {
                let matchesSearch = searchTerm === '' || pagne.name.toLowerCase().includes(searchTerm);
                let matchesCategory = categoryValue === '' || pagne.category === categoryValue;
                
                let matchesPrice = true;
                if (priceValue === 'low') {
                    matchesPrice = pagne.price < 10000;
                } else if (priceValue === 'medium') {
                    matchesPrice = pagne.price >= 10000 && pagne.price <= 20000;
                } else if (priceValue === 'high') {
                    matchesPrice = pagne.price > 20000;
                }
                
                return matchesSearch && matchesCategory && matchesPrice;
            });

            loading.style.display = 'none';

            if (filteredPagnes.length === 0) {
                noResults.classList.remove('hidden');
                resultsGrid.classList.add('hidden');
            } else {
                noResults.classList.add('hidden');
                resultsGrid.classList.remove('hidden');
                displayResults(filteredPagnes);
            }
        }, 800); 
    }

    function displayResults(pagnes) {
        resultsGrid.innerHTML = '';
        
        pagnes.forEach(pagne => {
            const pagneCard = document.createElement('div');
            pagneCard.className = 'pagne-card bg-white rounded-lg shadow-md overflow-hidden';
            
            pagneCard.innerHTML = `
                <img src="${pagne.image}" alt="${pagne.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-800 mb-1">${pagne.name}</h3>
                    <div class="flex items-center mb-2">
                        <span class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                            ${pagne.category}
                        </span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-lg font-bold text-gray-700">${formatPrice(pagne.price)}</span>
                        <button class="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm transition-colors contact-button" data-id="${pagne.id}">
                            Contactez-moi
                        </button>
                    </div>
                </div>
            `;
            
            resultsGrid.appendChild(pagneCard);
        });

        document.querySelectorAll('.contact-button').forEach(button => {
            button.addEventListener('click', function() {
                const pagneId = this.getAttribute('data-id');
                const selectedPagne = pagnesData.find(p => p.id == pagneId);
                
                alert(`Vous souhaitez être contacté pour le pagne: ${selectedPagne.name}\nUn de nos conseillers vous contactera prochainement!`);
            });
        });
    }

    // Event listeners
    searchButton.addEventListener('click', searchPagnes);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchPagnes();
        }
    });
    categoryFilter.addEventListener('change', searchPagnes);
    priceFilter.addEventListener('change', searchPagnes);

    // Make search input autofocus on page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            searchInput.focus();
        }, 500);
    });