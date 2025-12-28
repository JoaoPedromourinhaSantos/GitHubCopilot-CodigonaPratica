// Dados dos carros (id corresponde ao índice)
const cars = [
    {
        id: 0, brand: 'Fiat', model: 'Punto Sport', year: 2018,
        mileage: '78.000 km', price: 'R$ 34.900', image: 'IMG/car1.jpg',
        shortAlt: 'Fiat Punto Sport 2018',
        description: 'Hatch esportivo compacto, aparência conforme imagem (bem conservado), interior em bom estado e manutenção em dia.'
    },
    {
        id: 1, brand: 'Volkswagen', model: 'Gol 1.6', year: 2016,
        mileage: '65.200 km', price: 'R$ 28.500', image: 'IMG/car2.jpg',
        shortAlt: 'Volkswagen Gol 2016'
    },
    {
        id: 2, brand: 'Honda', model: 'Civic EX', year: 2014,
        mileage: '120.400 km', price: 'R$ 46.000', image: 'IMG/car3.jpg',
        shortAlt: 'Honda Civic EX 2014'
    },
    {
        id: 3, brand: 'Chevrolet', model: 'Onix LT', year: 2019,
        mileage: '48.300 km', price: 'R$ 39.990', image: 'IMG/car4.jpg',
        shortAlt: 'Chevrolet Onix LT 2019'
    }
];

// Render table
const tbody = document.getElementById('carsBody');
function renderRows(list){
    tbody.innerHTML = '';
    list.forEach(car => {
        const tr = document.createElement('tr');
        tr.id = `car-row-${car.id}`;
        tr.innerHTML = `
            <td><img class="thumb" src="${car.image}" alt="${car.shortAlt}" onerror="this.src='https://via.placeholder.com/200x120?text=Sem+imagem'"></td>
            <td>${car.brand}</td>
            <td>${car.model}</td>
            <td class="muted">${car.year}</td>
            <td class="muted">${car.mileage}</td>
            <td class="price">${car.price}</td>
            <td class="actions">
                <button onclick="purchase(${car.id})" aria-label="Comprar ${car.brand} ${car.model}">Comprar</button>
                <button onclick="contactSeller(${car.id})">Contato</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
renderRows(cars);

// Pesquisa simples: filtra linhas por texto nas colunas visíveis
const qInput = document.getElementById('q');
qInput.addEventListener('input', () => {
    const term = qInput.value.trim().toLowerCase();
    const filtered = cars.filter(car => {
        return (
            car.brand.toLowerCase().includes(term) ||
            car.model.toLowerCase().includes(term) ||
            String(car.year).includes(term) ||
            car.mileage.toLowerCase().includes(term) ||
            car.price.toLowerCase().includes(term)
        );
    });
    renderRows(filtered);
});

// Compra: mostra pop por 5s com mensagem "Finalizando compra..." e remove o carro da lista
const toast = document.getElementById('purchaseToast');
let processing = false;
function purchase(id){
    if(processing) return; // evita múltiplos cliques
    const car = cars.find(c => c.id === id);
    if(!car) return alert('Carro não encontrado.');
    processing = true;

    // Mostrar toast
    toast.textContent = `Finalizando compra do ${car.brand} ${car.model}...`;
    toast.style.display = 'block';

    // Opcional: desabilitar botões temporariamente
    const buttons = document.querySelectorAll('.actions button');
    buttons.forEach(b => b.disabled = true);

    setTimeout(() => {
        // Remover o carro da lista de dados
        const carIndex = cars.findIndex(c => c.id === id);
        if(carIndex !== -1){
            cars.splice(carIndex, 1);
        }

        // Remover a linha da tabela
        const carRow = document.getElementById(`car-row-${id}`);
        if(carRow){
            carRow.remove();
        }

        toast.style.display = 'none';
        processing = false;
        buttons.forEach(b => b.disabled = false);
        alert('Compra realizada.');
    }, 5000);
}

// Mantive funções auxiliares
function openDetail(id){
    window.open('carDetail.html?id=' + encodeURIComponent(id), '_blank');
}

// Contato simples (exemplo)
function contactSeller(id){
    const car = cars.find(c => c.id === id);
    if(!car) return alert('Carro não encontrado.');
    const subject = encodeURIComponent(`Interesse no veículo: ${car.brand} ${car.model} (${car.year})`);
    const body = encodeURIComponent(`Olá,\n\nTenho interesse no ${car.brand} ${car.model} (${car.year} - ${car.mileage}).\nPor favor, informar mais detalhes e disponibilidade.\n\nObrigado.`);
    window.location.href = `mailto:contato@automercado.com?subject=${subject}&body=${body}`;
}

document.getElementById('newListing').addEventListener('click', () => {
    alert('Formulário para anunciar veículo (a implementar).');
});
