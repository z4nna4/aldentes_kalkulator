// Initialize order data
let order = {};

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all tabs
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab
        this.classList.add('active');
        const tabId = this.dataset.tab;
        document.getElementById(tabId).classList.add('active');
    });
});

// Product quantity controls
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
            updateUI(item, quantityDisplay);
            updateSummary();
        }
    });

    plusBtn.addEventListener('click', () => {
        if (!order[productName]) {
            order[productName] = { price: productPrice, quantity: 0 };
        }
        order[productName].quantity++;
        updateUI(item, quantityDisplay);
        updateSummary();
    });
});

function updateUI(item, quantityDisplay) {
    const productName = item.dataset.name;
    const quantity = order[productName]?.quantity || 0;
    quantityDisplay.textContent = quantity;
}

function updateSummary() {
    const summaryItems = document.getElementById('summary-items');
    const totalAmount = document.querySelector('.total-amount');

    if (Object.keys(order).length === 0) {
        summaryItems.innerHTML = '<p class="empty-message">Brak pozycji w zamowieniu</p>';
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

// Set first tab as active on load
document.querySelector('.tab-btn').classList.add('active');
document.getElementById('pizza').classList.add('active');
