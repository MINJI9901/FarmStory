const rateBars = document.querySelectorAll('.rate-bar-body');

rateBars.forEach(bar => {
    const ratePercentage = bar.nextElementSibling.innerText;
    bar.querySelector('.rate-bar-positive').style.width = ratePercentage;
})