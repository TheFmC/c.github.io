function addRow() {
    const tbody = document.getElementById('product-list');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" placeholder="اسم السلعة" class="p-name"></td>
        <td><input type="number" value="1" min="1" class="p-qty" oninput="calculateAll()"></td>
        <td><input type="number" placeholder="0.00" class="p-price" oninput="calculateAll()"></td>
        <td><input type="number" placeholder="0" class="p-disc" oninput="calculateAll()"></td>
        <td><span class="p-after-disc">0.00</span></td>
        <td><input type="number" value="15" class="p-vat" oninput="calculateAll()"></td>
        <td><span class="p-net">0.00</span></td>
        <td><button class="remove-btn" onclick="removeRow(this)">✕</button></td>
    `;
    tbody.appendChild(row);
}

function removeRow(btn) {
    btn.closest('tr').remove();
    calculateAll();
}

function calculateAll() {
    const rows = document.querySelectorAll('#product-list tr');
    let totalBase = 0;
    let totalSaved = 0;
    let totalTax = 0;
    let totalFinal = 0;

    rows.forEach(row => {
        const qty = parseFloat(row.querySelector('.p-qty').value) || 0;
        const price = parseFloat(row.querySelector('.p-price').value) || 0;
        const discPercent = parseFloat(row.querySelector('.p-disc').value) || 0;
        const vatPercent = parseFloat(row.querySelector('.p-vat').value) || 0;

        const singleAfterDisc = price - (price * (discPercent / 100));
        row.querySelector('.p-after-disc').innerText = singleAfterDisc.toFixed(2);

        const subTotalBase = qty * price;
        const subTotalAfterDisc = qty * singleAfterDisc;

        const taxAmount = subTotalAfterDisc * (vatPercent / 100);
        const net = subTotalAfterDisc + taxAmount;

        row.querySelector('.p-net').innerText = net.toFixed(2);

        totalBase += subTotalBase;
        totalSaved += (subTotalBase - subTotalAfterDisc);
        totalTax += taxAmount;
        totalFinal += net;
    });

    document.getElementById('total-base').innerText = totalBase.toFixed(2);
    document.getElementById('total-saved').innerText = totalSaved.toFixed(2);
    document.getElementById('total-tax').innerText = totalTax.toFixed(2);
    document.getElementById('final-total').innerText = totalFinal.toFixed(2);
}
