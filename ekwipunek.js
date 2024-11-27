class ekwipunekMenager {
    constructor() {
        const otwieranieKart = new cardOpen();
        this.setupCalculatePA();
    }

    setupCalculatePA() {
        const ekwipunekButton = document.querySelector('button.select_page[data-page="game_ekw"]');

        if (ekwipunekButton) {
            ekwipunekButton.addEventListener('click', () => {
                console.log("Przycisk Ekwipunek kliknięty.");
                this.createOrUpdatePADisplay();
            });
        } else {
            console.error("Nie znaleziono przycisku Ekwipunek!");
        }
    }

    createOrUpdatePADisplay() {
        const titleDiv = document.querySelector("#page_game_ekw > div.title");
        if (!titleDiv) return;

        let paDiv = document.getElementById("pa_display");

        if (!paDiv) {
            paDiv = document.createElement("div");
            paDiv.id = "pa_display";
            paDiv.innerText = `POSIADANE PA: OBLICZ`;
            paDiv.style.display = "inline-block";
            paDiv.style.color = "lightblue";
            paDiv.style.fontSize = "16px";
            paDiv.style.fontWeight = "bold";
            paDiv.style.cursor = "pointer";
            paDiv.style.position = "relative";
            paDiv.style.left = "40%";
            titleDiv.appendChild(paDiv);
            paDiv.addEventListener("click", () => {
                console.log("Obliczanie PA rozpoczęte...");
                new calculatePA();
            });
        }
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
                    }, i * 2000);
                }
            } else {
                console.error("Wartość #item_am nie jest poprawną liczbą lub jest mniejsza niż 1.");
            }
        });     
    }
}

class calculatePA {
    constructor() {
        this.calculateFinalNumber().catch(error => {
            console.error("Błąd podczas obliczania PA:", error);
        });
    }

    async calculateFinalNumber() {
        const initialPA = parseInt(document.querySelector("#char_pa_max").innerText.replace(/\s+/g, ''), 10);
        let finalNumber = initialPA;

        const itemStacks = await this.getItemStacks([1244, 1242, 1259, 1473, 1260, 1472, 1243, 1471, 1494, 1493, 1492, 1489, 1485, 1484, 1483], initialPA);

        finalNumber += itemStacks[1244] * 100;
        finalNumber += itemStacks[1242] * 2000;
        finalNumber += itemStacks[1259] * 5000 + (initialPA * 0.03);
        finalNumber += itemStacks[1473] * 5000 + (initialPA * 0.03);
        finalNumber += itemStacks[1260] * 10000 + (initialPA * 0.15);
        finalNumber += itemStacks[1472] * 10000 + (initialPA * 0.15);
        finalNumber += itemStacks[1243] * initialPA;
        finalNumber += itemStacks[1471] * initialPA;
        finalNumber += (itemStacks[1489] * 5000 + (initialPA * 0.03)) * 20;
        finalNumber += (itemStacks[1489] * 10000 + (initialPA * 0.15)) * 3;
        finalNumber += (itemStacks[1494] * 10000 + (initialPA * 0.15)) * 3;
        finalNumber += (itemStacks[1493] * 10000 + (initialPA * 0.15)) * 3;
        finalNumber += (itemStacks[1492] * 10000 + (initialPA * 0.15)) * 3;
        finalNumber += (itemStacks[1485] * 10000 + (initialPA * 0.15)) * 3;
        finalNumber += (itemStacks[1483] * 10000 + (initialPA * 0.15)) * 3;
        finalNumber += (itemStacks[1484] * 10000 + (initialPA * 0.15)) * 3;
        finalNumber += (itemStacks[1484] * initialPA) * 4;

        this.updatePA(GAME.dots(finalNumber));
        console.log("MAX PA:" + initialPA + " Łączna ilość:" + finalNumber);
    }

    async getItemStacks(itemIds, initialPA) {
        const stacks = {};

        // Dla każdej strony zaczytaj dane jednocześnie dla wszystkich elementów
        for (let itemId of itemIds) {
            stacks[itemId] = await this.getStackFromAllPages(itemId);
        }

        console.log(stacks);
        return stacks;
    }

    async getStackFromAllPages(itemId) {
        const pages = [
            { page: 0, page2: 0 },
            { page: 0, page2: 1 }
        ];

        let totalStack = 0;

        for (let page of pages) {
            await GAME.socket.emit('ga', { a: 12, page: page.page, page2: page.page2, used: 1 });
            await new Promise(resolve => setTimeout(resolve, 1500));

            const itemElement = document.querySelector(`#ekw_page_items [data-base_item_id="${itemId}"]`);
            if (itemElement) {
                totalStack += parseInt(itemElement.getAttribute('data-stack'), 10) || 0;
            }
        }

        return totalStack;
    }

    updatePA(finalNumber) {
        const paDiv = document.getElementById("pa_display");
        if (paDiv) {
            paDiv.innerText = `POSIADANE PA: ${finalNumber}`;
        }
    }
}
