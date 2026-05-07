var selectedValue;
document.addEventListener('DOMContentLoaded', async function(){

    keyMovility();

    const ratingOptions = document.querySelectorAll('.rating__option');

    ratingOptions.forEach(option => {        
        option.addEventListener('click', function(){
            selectOption(option)
        });
    });

    const submitBtn = document.querySelector('.rating__submit');
    const ratingResult = document.getElementById('rating-selected');
    const thankyouCard = document.querySelector('.thankyou');
    const ratingCard = document.querySelector('.rating');

    submitBtn.addEventListener('click', function(){
        if(selectedValue){
            ratingResult.textContent = selectedValue;

            ratingCard.classList.add('hidden')
            thankyouCard.classList.remove('hidden')

            thankyouCard.focus();
        }
    })

});

function selectOption(element) {
    const options = document.querySelectorAll('.rating__option');
    options.forEach(opt => opt.setAttribute('aria-pressed', 'false'));

    document.querySelector('.rating__option--active')?.classList.remove('rating__option--active');
    element.setAttribute('aria-pressed', 'true');
    element.classList.add('rating__option--active');
    selectedValue = element.getAttribute('data-value');
}


function keyMovility(){
    document.addEventListener('keydown', (e) => {
        const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        if (!keys.includes(e.key)) return;

        // elementos que pueden recibir foco
        const focusableSelector = 'button, [href], input, select, textarea, [tabindex="0"]';
        const focusables = Array.from(document.querySelectorAll(focusableSelector))
            .filter(el => !el.disabled && el.offsetParent !== null); 

        const currentIndex = focusables.indexOf(document.activeElement);

        if (currentIndex > -1) {
            e.preventDefault(); // Evitamos el scroll de la página
            let nextIndex;

            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                // Mover hacia adelante (con retorno al inicio)
                nextIndex = (currentIndex + 1) % focusables.length;
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                // Mover hacia atrás (con retorno al final)
                nextIndex = (currentIndex - 1 + focusables.length) % focusables.length;
            }

            // 3. Mover el foco al siguiente elemento
            focusables[nextIndex].focus();
        }
    });
}
