const productInfo = document.querySelector('.product-info');
const productInfoBar = document.querySelector('.product-info-bar');




// *************************************************** CALCULATE PRICE PER PRODUCT ***************************************************
let qtyPerProduct = document.querySelectorAll('.qty-per-product');

qtyPerProduct.forEach(qty => {
    qty.addEventListener('change', () => {
        const totalPricePerProduct = qty.parentElement.querySelector('.total-price-per-product');
        const productPrice = qty.parentElement.querySelector('.total-price-per-product');
        totalPricePerProduct.innerText = qty.value * productPrice.value;
    })
})