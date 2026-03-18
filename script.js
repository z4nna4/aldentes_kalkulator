let order = {};

document.querySelectorAll('.product-item').forEach(item => {
    const minusBtn = item.querySelector('.btn-minus');
    const plusBtn = item.querySelector('.btn-plus');
    const quantityDisplay = item.querySelector('.quantity');
    const productName = item.dataset.name;
    const productPrice = parseInt(item.dataset.price);

    minusBtn.addEventListener('click', () => {
        if (order[productName] && order[productName].quantity > 0) {
            order[productName].quantity--;
            if (order[productName].quantity === 0) {
                delete order[productName];
            }
            updateUI(quantityDisplay);
            updateSummary();
        }
    });

    plusBtn.addEventListener('click', () => {
        if (!order[productName]) {
            order[productName] = { price: productPrice, quantity: 0 };
        }
        order[productName].quantity++;
        updateUI(quantityDisplay);
        updateSummary();
    });
});

function updateUI(quantityDisplay) {
    const productName = quantityDisplay.closest('.product-item').dataset.name;
    const quantity = order[productName]?.quantity || 0;
    quantityDisplay.textContent = quantity;
}

function updateSummary() {
    const summaryItems = document.getElementById('summary-items');
    const totalAmount = document.querySelector('.total-amount');

    if (Object.keys(order).length === 0) {
        summaryItems.innerHTML = '<p class="empty-message">Brak pozycji<br>w zamówieniu</p>';
        totalAmount.textContent = '0$';
        return;
    }

    let html = '';
    let total = 0;

    Object.keys(order).forEach(productName => {
        const { price, quantity } = order[productName];
        const subtotal = price * quantity;
        total += subtotal;

        html += `
            <div class="summary-item">
                <span class="summary-item-name">${productName}</span>
                <span class="summary-item-qty">x${quantity}</span>
                <span class="summary-item-subtotal">${subtotal}$</span>
            </div>
        `;
    });

    summaryItems.innerHTML = html;
    totalAmount.textContent = total + '$';
}
