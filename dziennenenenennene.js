// Tablica docelowych lokalizacji
const targets = [
    { x: 7, y: 2, loc: 27 }, // pałac wszechmogącego
    { x: 13, y: 7, loc: 27 }, // pałac -> studnie
    { x: 2, y: 2, loc: 566 }, // studnie lv1
    { x: 9, y: 2, loc: 566 }, // studnie lv2
    { x: 16, y: 2, loc: 566 }, // studnie lv3
    { x: 16, y: 6, loc: 566 }, // studnie lv4
    { x: 9, y: 6, loc: 566 }, // studnie lv5
    { x: 3, y: 3, loc: 566 }, // studnie -> pałac
    { x: 6, y: 6, loc: 84 }, // głębia //koniec
];

// Tablica z zadaniami
const tasks = [
    { name: "Zadanie PvM Codzienne" },
    { name: "Zadanie PvP Codzienne" },
    { name: "Zadanie Symboli Codzienne" },
    { name: "Zadanie Substancji Codzienne" },
    { name: "Studnia Życzeń [LV1] Codzienne" },
    { name: "Studnia Życzeń [LV2] Codzienne" },
    { name: "Studnia Życzeń [LV3] Codzienne" },
    { name: "Studnia Życzeń [LV4] Codzienne" },
    { name: "Studnia Życzeń [LV5] Codzienne" },
];

// Funkcja do wyciągania qb-id na podstawie nazwy zadania
function getTaskIdByName(taskName) {
    const normalizedTaskName = taskName.replace(/\s+/g, "").toLowerCase();
    const element = Array.from(document.querySelectorAll("[data-qb]"))
        .find(el => el.textContent.replace(/\s+/g, "").toLowerCase().includes(normalizedTaskName));
    return element ? element.getAttribute("data-qb") : null;
}

// Funkcja obsługująca zadanie PvM
async function ZadaniePvM() {
    const id = getTaskIdByName("Zadanie PvM Codzienne");
    if (id) {
        GAME.socket.emit('ga', { a: 22, type: 2, id: id });
        await new Promise(resolve => setTimeout(resolve, 500));
        for (let i = 0; i < 10; i++) {
            GAME.socket.emit('ga', { a: 7, order: 2, quick: 1, fo: GAME.map_options.ma });
            await new Promise(resolve => setTimeout(resolve, 500));
            GAME.socket.emit('ga', { a: 444, max: GAME.spawner[0], ignore: GAME.spawner[1] });
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        for (let i = 0; i < 7; i++) {
            GAME.socket.emit('ga', { a: 22, type: 2, id: id });
        }
        return true;
    }
    return false;
}
// Funkcja obsługująca zadanie PvP
async function ZadaniePvP() {
    const id = getTaskIdByName("Zadanie PvP Codzienne");
    if (id) {
        GAME.socket.emit('ga', { a: 22, type: 2, id: id });
        await new Promise(resolve => setTimeout(resolve, 1500));

        if ($("#player_list_con").find("[data-option=load_more_players]").length == 1) {
            $("#player_list_con").find("[data-option=load_more_players]").click();
        }
        await new Promise(resolve => setTimeout(resolve, 500));

        const players = document.querySelectorAll("#player_list_con .player");
        let playerIds = [];
        players.forEach(player => {
            const playerElement = player.querySelector("strong[data-char_id]");
            if (playerElement) {
                playerIds.push(playerElement.getAttribute("data-char_id"));
            }
        });

        // Wykonaj pętlę dla każdego gracza
        for (let i = 0; i < playerIds.length; i++) {
            const charId = playerIds[i];
            GAME.socket.emit('ga', { a: 24, char_id: charId, quick: 1 });

            // Spowolnienie o 250ms
            await new Promise(resolve => setTimeout(resolve, 250));
        }
        kom_clear();
        for (let i = 0; i < 7; i++) {
            GAME.socket.emit('ga', { a: 22, type: 2, id: id });
        }
        return true;
    }
    return false;
}
// Funkcja obsługująca zadanie Symboli
async function ZadanieSymboli() {
    const id = getTaskIdByName("Zadanie Symboli Codzienne");
    if (id) {
        for (let i = 0; i < 10; i++) {
            GAME.socket.emit('ga', { a: 22, type: 2, id: id });
            await new Promise(resolve => setTimeout(resolve, 1200));
        }
        return true;
    }
    return false;
}
// Funkcja obsługująca zadanie Substancji
async function ZadanieSubstancji() {
    const id = getTaskIdByName("Zadanie Substancji Codzienne");
    if (id) {
            GAME.socket.emit('ga', { a: 22, type: 2, id: id });
            await new Promise(resolve => setTimeout(resolve, 1200));
            GAME.socket.emit('ga', { a: 22, type: 2,button: 3, id: id });
            await new Promise(resolve => setTimeout(resolve, 1200));
            for (let i = 0; i < 7; i++) {
                GAME.socket.emit('ga', { a: 22, type: 2, id: id });
                await new Promise(resolve => setTimeout(resolve, 1200));
            }

        return true;
    }
    return false;
}
// Funkcja obsługująca zadanie Studni1-5
async function ZadanieStudni() {
    await new Promise(resolve => setTimeout(resolve, 1500));
    GAME.socket.emit('ga', { a: 6, tpid: 0 });
    await new Promise(resolve => setTimeout(resolve, 1500));

    const taskNames = [
        "Studnia Życzeń [LV1] Codzienne",
        "Studnia Życzeń [LV2] Codzienne",
        "Studnia Życzeń [LV3] Codzienne",
        "Studnia Życzeń [LV4] Codzienne",
        "Studnia Życzeń [LV5] Codzienne"
    ];

    for (let index = 0; index < taskNames.length; index++) {
        const taskName = taskNames[index];
        const id = getTaskIdByName(taskName);
        if (id) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            //GAME.socket.emit('ga', { a: 22, type: 2, id });
            
            // Ustal liczbę powtórzeń w zależności od indexu
            let repeatCount = (index < 4) ? 5 : 5; // Zmieniono górny limit na 4

            for (let i = 0; i < repeatCount; i++) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                GAME.socket.emit('ga', { a: 22, type: 2, button: 2, id });
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            GAME.socket.emit('ga', { a: 22, type: 2, button: 2, id });
            await new Promise(resolve => setTimeout(resolve, 1000));
            GAME.socket.emit('ga', { a: 22, type: 2, button: 2, id });
        }
    }

    return true;
}

// Funkcja sprawdzająca dostępne zadania na mapie
function checkForNextTask() {
    const availableTasks = Array.from(document.querySelectorAll(".field_quest.option"))
        .filter(el => el.style.display !== "none"); // Filtrujemy widoczne zadania
    
    // Zwracamy zadanie, jeśli jest dostępne
    return availableTasks.length > 0 ? availableTasks[0] : null;
}

// Funkcja obliczająca kierunek na podstawie różnic w współrzędnych
function getDirection(deltaX, deltaY) {
    if (deltaX > 0 && deltaY === 0) return 7; // Prawo
    if (deltaX < 0 && deltaY === 0) return 8; // Lewo
    if (deltaX === 0 && deltaY > 0) return 1; // Dół
    if (deltaX === 0 && deltaY < 0) return 2; // Góra
    if (deltaX > 0 && deltaY > 0) return 3; // Prawo dół
    if (deltaX < 0 && deltaY > 0) return 4; // Lewo dół
    if (deltaX > 0 && deltaY < 0) return 5; // Prawo góra
    if (deltaX < 0 && deltaY < 0) return 6; // Lewo góra
}

// Funkcja pobierająca startowe współrzędne z elementów HTML
function getStartCoordinates() {
    const x = parseInt(document.querySelector("#map_x").textContent, 10);
    const y = parseInt(document.querySelector("#map_y").textContent, 10);
    return { x, y };
}

// Funkcja sprawdzająca zadania w HTML
function checkTasksInHTML() {
    const taskFunctions = [ZadaniePvM, ZadaniePvP, ZadanieStudni, ZadanieSubstancji, ZadanieSymboli];

    for (let func of taskFunctions) {
        if (func()) {
            return true; // Zatrzymujemy się po wykonaniu jednego zadania
        }
    }

    return false; // Żadne zadanie nie zostało wykonane
}

// Funkcja przetwarzająca zadanie i sprawdzająca następne
async function processTaskAndCheckNext(target) {
    // Sprawdzamy zadanie w tej lokalizacji
    const taskCompleted = await moveCharacterToTarget(target);

    // Jeśli zadanie zostało wykonane, sprawdzamy, czy są dostępne kolejne zadania
    if (taskCompleted) {
        // Szukamy następnego dostępnego zadania
        const nextTask = checkForNextTask();

        if (nextTask) {
            const nextTaskName = nextTask.textContent.trim();
            // Dopasowujemy zadanie do funkcji
            if (nextTaskName.includes("PvM") && !nextTaskName.includes("II")) {
                await ZadaniePvM();
            } else if (nextTaskName.includes("PvP") && !nextTaskName.includes("II")) {
                await ZadaniePvP();
            } else if (nextTaskName.includes("Symboli") && !nextTaskName.includes("II")) {
                await ZadanieSymboli();
            } else if (nextTaskName.includes("Substancji") && !nextTaskName.includes("II")) {
                await ZadanieSubstancji();
            } else if (nextTaskName.includes("Studnia")) {
                await ZadanieStudni();
            } else {
                return false;
            }

            // Jeśli kolejne zadanie jest w tej samej lokalizacji, powtarzamy proces
            return await processTaskAndCheckNext(target);
        } else {
            return true;
        }
    }
    return false;
}

// Funkcja przemieszczania postaci do konkretnego celu
async function moveCharacterToTarget(target) {
    const { x: targetX, y: targetY, loc } = target;
    // Wykonanie polecenia przed sprawdzeniem zadania
    GAME.socket.emit('ga', { a: 6, tpid: 0 });
    await new Promise(resolve => setTimeout(resolve, 1000)); // Większe opóźnienie
    
    // Wysyłamy polecenie emitOrder przed pobraniem współrzędnych
    GAME.emitOrder({ a: 12, type: 18, loc });
    kom_clear();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Opóźnienie na synchronizację lokacji

    // Pobieramy startowe współrzędne
    let { x: currentX, y: currentY } = getStartCoordinates();

    while (currentX !== targetX || currentY !== targetY) {
        const deltaX = targetX - currentX;
        const deltaY = targetY - currentY;

        // Normalizujemy krok
        const stepX = deltaX !== 0 ? Math.sign(deltaX) : 0;
        const stepY = deltaY !== 0 ? Math.sign(deltaY) : 0;

        // Określamy kierunek
        const dir = getDirection(stepX, stepY);

        // Wyślij dane o ruchu
        GAME.socket.emit('ga', { a: 4, dir, vo: GAME.map_options.vo });
        await new Promise(resolve => setTimeout(resolve, 700)); // Opóźnienie między krokami

        // Sprawdzamy, czy pozycja się zmieniła
        const { x: newX, y: newY } = getStartCoordinates();
        if (newX === currentX && newY === currentY) {
            console.log(`Ruch nieudany, ponawiam próbę...`);
        } else {
            currentX = newX; // Aktualizujemy współrzędne
            currentY = newY;
        }
    }

    // Teraz, gdy postać dotarła do celu, sprawdzamy zadanie
    const taskCompleted = await checkTasksInHTML();
    return taskCompleted;
}

// Wywołujemy funkcję przemieszczania dla wszystkich celów
async function moveThroughTargets(targets) {
    for (let i = 0; i < targets.length; i++) {
        const success = await processTaskAndCheckNext(targets[i]);

        if (!success) {
            console.log("Nie udało się wykonać zadania w bieżącej lokalizacji.");
        }

        // Sprawdzamy, czy jest kolejny cel
        if (i + 1 >= targets.length) {
            return; // Zatrzymujemy działanie skryptu
        }
    }
    console.log("Wszystkie cele zostały przetworzone.");
}

// Wywołanie funkcji głównej
moveThroughTargets(targets);