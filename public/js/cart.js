const cartButton = document.querySelector('.cart-button');
const cartFavoritePopup = document.querySelector('#cart-favorite-pop-up');

let sumOfQty = 0;
let sumOfPrice = 0;

function calculatingPricePerProduct (qty) {
    const totalPricePerProduct = qty.parentElement.querySelector('.total-price-per-product');
    const productPrice = qty.parentElement.querySelector('.product-price');
    // console.log(qty.value)
    // console.log(productPrice.value)
    totalPricePerProduct.innerText = (qty.value * productPrice.value).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    // console.log(totalPricePerProduct)
}

function calculatingTotal (qtyElements) {
    qtyElements.forEach(qty => {
        const productPrice = qty.parentElement.querySelector('.product-price');

        console.log('qty: ', qty.value);

        sumOfQty += parseInt(qty.value);
        sumOfPrice += qty.value * productPrice.value;

        const totalQty = qty.parentElement.parentElement.parentElement.querySelector('.products-qty');
        const totalPrice = qty.parentElement.parentElement.parentElement.querySelector('.total-price');

        totalQty.innerText = sumOfQty;
        totalPrice.innerText = sumOfPrice.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        })
}

cartButton.addEventListener('click', () => {
    cartFavoritePopup.classList.remove('d-none');
    document.body.style.overflow = 'hidden';

    // FOR RELOAD QTY INPUTS
    qtyPerProduct = document.querySelectorAll('.qty-per-product');

    qtyPerProduct.forEach(qty => {
        calculatingPricePerProduct(qty);
        qty.addEventListener('change', () => {
            calculatingPricePerProduct(qty);
            calculatingTotal(qtyElements);
        })
    })

    calculatingTotal(qtyPerProduct)
})



// ******************************************************** CREATE REVIEW POP-UP ********************************************************
const cartToggle = document.querySelector('#cart-toggle');
const favoriteToggle = document.querySelector('#favorite-toggle');

const cart = document.querySelector('#cart');
const favorite = document.querySelector('#favorite');

cartToggle.addEventListener('click', () => {
    cart.classList.remove('d-none');
    favorite.classList.add('d-none');

    cartToggle.classList.remove('text-body-tertiary');
    favoriteToggle.classList.add('text-body-tertiary');
})

favoriteToggle.addEventListener('click', () => {
    favorite.classList.remove('d-none');
    cart.classList.add('d-none');

    favoriteToggle.classList.remove('text-body-tertiary');
    cartToggle.classList.add('text-body-tertiary');
})