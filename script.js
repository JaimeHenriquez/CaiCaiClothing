let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} agregado al carrito`);
}

function renderCartItems() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('product');
        cartItem.innerHTML = `
            <input type="checkbox" data-index="${index}">
            <span>${item.name} - $${item.price.toFixed(0)}</span>
        `;
        cartContainer.appendChild(cartItem);
    });
}

function removeSelected() {
    const checkboxes = document.querySelectorAll('#cart-items input[type="checkbox"]');
    const selectedIndexes = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => parseInt(checkbox.dataset.index));

    cart = cart.filter((_, index) => !selectedIndexes.includes(index));
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
}

function goToPay() {
    if (cart.length === 0) {
        alert('El carrito está vacío. No puedes proceder al pago.');
        return;
    }
    window.location.href = 'https://webpay.com/pay';
}

// Render cart items on load (for carrito.html)
if (document.getElementById('cart-items')) {
    renderCartItems();
}

const wrapper = document.querySelector('.wrapper')
const registerLink = document.querySelector('.register-link')
const loginLink = document.querySelector('.login-link')

registerLink.onclick = () => {
    wrapper.classList.add('active')
}

loginLink.onclick = () => {
    wrapper.classList.remove('active')
}