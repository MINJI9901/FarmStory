
// ******************************************************** SHOW REVIEW POP-UP ********************************************************
const productReviewsButtons = document.querySelectorAll('.product-reviews-button');
const productReviewsPopup = document.querySelector('.product-reviews-display');

productReviewsButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        productReviewsPopup.classList.remove('d-none');
        document.body.style.overflow = 'hidden';
    });
});


// ******************************************************** CLOSE PRODUCT REVIEWS POP-UP ********************************************************
// const closeProductReviewsPopupIcons = document.querySelectorAll('.close-reviews-pop-up');

// CLOSE POPUP / I guess I should put this code inside because the initial popup element is set to null, so we should keep update it when another element is clicked.

// productReviewsPopup.addEventListener('click', (ev) => {
//     const clickedElement = document.elementFromPoint(ev.x, ev.y);

//     if (clickedElement === productReviewsPopup || clickedElement === productReviewsPopup.querySelector('DIV')) {
//         productReviewsPopup.classList.add('d-none');
//         document.body.style.overflow = 'auto'
//     }
// });

// closeProductReviewsPopupIcons.forEach(icon => {
//     icon.addEventListener('click', () => {
//         productReviewsPopup.classList.add('d-none');
//         document.body.style.overflow = 'auto';
//     });
// })
