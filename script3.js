/* KARTY */
document.querySelector('#ekw_page_items div[data-base_item_id="1784"]').addEventListener('click', function() {
    console.log('Kliknięto element o data-base_item_id="1784".');
    document.getElementById('ekw_menu_use').addEventListener('click', function() {
        console.log('Kliknięto przycisk ekw_menu_use.');
        const imgExists = document.querySelector('img[src="/gfx/items/0/226/1784.png"]');
        if (imgExists) {
            setTimeout(() => {
                const contentDiv = document.querySelector('.content');
                if (contentDiv) {
                    const newInputDiv = document.createElement('div');
                    newInputDiv.className = 'game_input small';
                    const maxButton = document.createElement('button');
                    maxButton.className = 'btn_small_gold';
                    maxButton.textContent = 'MAX';
                    newInputDiv.appendChild(maxButton);
                    contentDiv.appendChild(newInputDiv);

                    console.log('Dodano nowy element z przyciskiem MAX.');
                } else {
                    console.error('Nie znaleziono elementu .content');
                }
            }, 333);
        } else {
            console.log('Obrazek nie istnieje.');
        }
    }, { once: true }); // Użycie { once: true } powoduje, że listener zostanie usunięty po pierwszym kliknięciu
});

/* PET */
document.querySelectorAll('button[data-option="pet_bonch"]').forEach(button => {
    button.addEventListener('click', function () {
        const newButton = document.createElement('button');
        newButton.className = 'newBtn pet_bonus_change';
        newButton.style.marginRight = '4ch';
        newButton.textContent = 'KWA ZMIEŃ';
setTimeout(() => {
        const targetButton = document.querySelector('button[data-option="pet_bonch_go"]');
        if (targetButton) {
            targetButton.parentNode.insertBefore(newButton, targetButton);
        }
}, 333);
    });
});