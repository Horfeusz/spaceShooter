/**
 * Obsługa żyć gracza
 */

//Tablica żyć
let PLAYER_LIVES = [];
//Parametr określający po jakim czasie (ile pętli) ma się pojawić nowy gracz
let START_NEW_LIVE = 100;
//Lcznik który będzie nabijany do pojawianie się nowego życia
let TO_NEW_LIVE = 0;

/**
 * Inicjalizacja żyć
 */
function initPlayerLives() {
    PLAYER_LIVES.push(createEntity(PLAYER_NAME, {
            x: (CANVA_WIDTH - 80),
            y: 30,
            correctWidth: -350,
            correctHeight: -350
        },
        'playerL1'));

    PLAYER_LIVES.push(createEntity(PLAYER_NAME, {
            x: (CANVA_WIDTH - 50),
            y: 30,
            correctWidth: -350,
            correctHeight: -350
        },
        'playerL2'));

    PLAYER_LIVES.push(createEntity(PLAYER_NAME, {
            x: (CANVA_WIDTH - 20),
            y: 30,
            correctWidth: -350,
            correctHeight: -350
        },
        'playerL3'));
    //Startujemy zatem niech pojawi się od razu
    TO_NEW_LIVE = START_NEW_LIVE;
}

/**
 * Wskrzeszam playera
 */
function playerToLive() {
    //Jeżeli żyje nie robię nic
    if (PLAYER_OR_ALIVE) {
        return;
    }

    //Sprawdzam czy są jeszcze życia
    if (PLAYER_LIVES.length < 1) {
        //FIXME: GAME OVER !!!

        return;
    }

    TO_NEW_LIVE++;

    if (TO_NEW_LIVE < START_NEW_LIVE) {
        return;
    }
    createPlayer();
    //Po zainicjowaniu zeruje licznik
    TO_NEW_LIVE = 0;
}

/**
 * Funkcja usuwa jedno życie
 */
function deadPlayerLive() {
    let lives = PLAYER_LIVES.length;
    let tmpLives = [];

    PLAYER_OR_ALIVE = false;

    PLAYER_LIVES.forEach(item => {
        if (item.type !== 'playerL' + lives) {
            tmpLives.push(item);
        } else {
            item.dead = true;
        }
    });
    PLAYER_LIVES = tmpLives;
}