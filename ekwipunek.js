class ekwipunekMenager {
    constructor() {
        const otwieranieKart = new cardOpen();
        const sumowanie = new calculatePA();
    }
}

class cardOpen {
    constructor() {
        $("body").on("click", '#ekw_page_items div[data-base_item_id="1784"]', () => {
            $("#ekw_menu_use").one("click", () => { 
                    setTimeout(() => {
                        $(`<button class="btn_small_gold otwieranie_kart" style="margin-right:4ch;">X100 OPEN</button>`).insertBefore("#kom_con > div > div.content > div:nth-child(1) > button.option.btn_small_gold");
                    }, 500);
            });
        });
        $("body").on("click", '.otwieranie_kart', () => {
            let upperLimit = parseInt(document.querySelector("#item_am").value, 10);
            if (!isNaN(upperLimit) && upperLimit > 0) {
                for (let i = 0; i < upperLimit; i++) {
                    setTimeout(() => {
                        let cards = $(`#ekw_page_items div[data-base_item_id="1784"]`);
                        let cards_id = parseInt(cards.attr("data-item_id"));
                        GAME.socket.emit('ga',{a: 12, type: 14, iid: cards_id, page: GAME.ekw_page, page2: GAME.ekw_page2, am: '100'});
                    }, i * 2000); // i * 2000 = odstęp 2 sekundy pomiędzy kolejnymi wywołaniami
                }
            } else {
                console.error("Wartość #item_am nie jest poprawną liczbą lub jest mniejsza niż 1.");
            }
            });     


    }
}