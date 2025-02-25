
// ******************************************************** CREATE REVIEW POP-UP ********************************************************
const reviewCreateButtons = document.querySelectorAll('.review-create-button');
const reviewCreatePopup = document.querySelector('#review-pop-up');
// let productId = null;

reviewCreateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        reviewCreatePopup.classList.remove('d-none');
        document.body.style.overflow = 'hidden';
    });
});


// ******************************************************** CLOSE CREATING REVIEW POP-UP ********************************************************
// const closeCreateReviewPopupIcon = document.querySelector('#close-create-review-pop-up');

// closeCreateReviewPopupIcon.addEventListener('click', () => {
//     reviewCreatePopup.classList.add('d-none');
//     document.body.style.overflow = 'hidden';
// });

// reviewCreatePopup.addEventListener('click', (ev) => {
//     const clickedElement = document.elementFromPoint(ev.x, ev.y);

//     if (clickedElement === reviewCreatePopup || clickedElement === reviewCreatePopup.querySelector('DIV')) {
//         reviewCreatePopup.classList.add('d-none');
//         document.body.style.overflow = 'hidden';
//     }
// });


// ******************************************************** RATING STARTS ********************************************************
const ratingStars = document.querySelectorAll('.ratingStar');
const rateInput = document.querySelector('#rateInput');

ratingStars.forEach(star => {
    star.addEventListener('mouseover', () => {
        const starArray = [...star.parentElement.children]
        const idx = starArray.indexOf(star);
        starArray.filter(s => starArray.indexOf(s) <= idx).map(s => s.classList.add('checked'));
        starArray.filter(s => starArray.indexOf(s) > idx).map(s => s.classList.remove('checked'));

        // PUT RATE IN A HIDDEN INPUT FOR REQUEST
        const rate = starArray.filter(star => star.classList.contains('checked')).length;
        rateInput.value = rate;
    })
})