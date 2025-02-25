const closePopupIcons = document.querySelectorAll('.close-pop-up-icon');
const popUpPages = document.querySelectorAll('.pop-up');

closePopupIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        icon.parentElement.parentElement.parentElement.classList.add('d-none');
        document.body.style.overflow = 'auto'
    })
});

popUpPages.forEach(page => {
    page.addEventListener('click', (ev) => {
        const clickedElement = document.elementFromPoint(ev.x, ev.y);

        if (clickedElement === page || clickedElement === page.querySelector('DIV')) {
            page.classList.add('d-none');
            document.body.style.overflow = 'auto'
        }
    })
});