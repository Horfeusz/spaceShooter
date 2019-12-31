//http://13zmiennych.blogspot.com/2013/10/jak-zrobic-prosta-gre-w-javascript_13.html
//http://explosiongenerator.com/
/**
 * Lista TODO
 *
 * 3. Przy zestrzeleniu ufa jakiś wybuch: http://jsdn.pl/javascript-tworzenie-animacji-grach-przy-uzyciu-spritesheetow/
 *                                          http://webkod.pl/kurs-css/lekcje/dzial-4/css3-animowany-obrazek-klatka-po-klatce
 *
 * 6. Tło
 *
 * Fajne Sprity ufokowe: http://millionthvector.blogspot.com/p/free-sprites_12.html
 *
 * Paczka spritów: http://opengameart.org/content/complete-spaceship-game-art-pack
 *                  www.unluckystudio.com
 *
 * Edytor online grafik: https://pixlr.com/
 *
 */

//Obrazki
let images = {};
//obiekty
let entities = [];
let canvas, ctx;
const CANVA_HEIGHT = 600;
const CANVA_WIDTH = 1000;
let klatka = 0;

//Obiekt obsługi klawiszy dla rakiety
const keys = {
    37: {
        key: 'left',
        down: false
    },
    38: {
        key: 'up',
        down: false
    },
    39: {
        key: 'right',
        down: false
    },
    40: {
        key: 'down',
        down: false
    },
    32: {
        key: 'fire',
        down: false
    }
};


/**
 * Metoda ładująca obrazki
 */
function loadImges(directory, defObjects, onComplete) {
    let imagesCount = defObjects.length;

    defObjects.forEach(function (defObject) {
        let img = new Image();

        //Przypisujemy zdarzenie wołane po załadowaniu obrazka
        img.onload = function () {
            imagesCount--;
            if (imagesCount <= 0 && onComplete !== null) {
                //Mamy załadowane wszystkie obrazki, wołamy inicjację aplikacji
                onComplete();
            }
        };
        img.src = directory + "/" + defObject.file;

        //Ustalam sobie nazwę obiektu z nazwy pliku
        var objectName = null;
        if (defObject.name === undefined) {
            objectName = defObject.file.substring(0, defObject.file.lastIndexOf('.'));
        } else {
            objectName = defObject.name;
        }
        images[objectName] = img;
    });
}

/**
 * Metoda tworzy jednostki
 */
function createEntity(entityName, properties, entityType) {
    const entity = Object.create(EntityPrototype);
    entity.img = images[entityName];
    if (entityType !== undefined) {
        entity.type = entityType;
    } else {
        entity.type = entityName;
    }

    Object.keys(properties)
        .forEach(propertyName => entity[propertyName] = properties[propertyName]);

    entity.posArray = (entities.push(entity) - 1);
    return entity;
}

/**
 * Inicjujemy canve
 */
function initCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
}

/**************************************************************************************
 * Główna pętla gry
 **************************************************************************************/
function gameLoop() {
    klatka++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Sprawdzam kolizje na obiektach
    checkCollision();

    //Usuwamy z tabeli martwe obiekty po kolizjach i wylocie poza ekran (rakiety)
    entities = entities.filter(entity => !entity.dead);

    //Generujemy gracza
    playerToLive();

    //Generujemy ufoki
    createUfos();

    //Zmiana współżędnych położenia obiektów
    entities.forEach(entity => entity.move());

    //obsługa klawiszy dla statku/gracza
    inputKeysPlayer(keys);

    //Rysowanie na ekranie obiektów po wszystkich operacjach
    entities.forEach(entity => entity.draw(ctx));

    //Rysowanie ilości punktów
    playerPointsDraw(ctx);

    console.debug(klatka);
    if(klatka > 1000_000) {
        klatka = 0;
    }
}

/**************************************************************************************
 * Metoda inicjująca grę
 **************************************************************************************/
function initialize() {
    console.debug('initialize start');

    initCanvas();

    initPlayerLives();

    setInterval(gameLoop, 1000 / 60);

    console.debug('initialize end')
}

/**************************************************************************************/
$(document).ready(function () {

    //Ładuje obiekty główne
    loadImges('images', [{file: 'spco.png'},
        {file: 'ufo.png'},
        {file: 'missile.png'},
        {file: 'bomb1.png'},
        {file: 'bombs.png'}], null);

    //Ładuje obrazji eksplozji
    var imgs = [];
    var pad = "0000";
    for (i = 0; i < 279; i++) {
        var number = "" + i;
        imgs.push({file: "explosion" + pad.substring(0, pad.length - number.length) + number + ".png"});
    }
    loadImges('images/explosion', imgs, initialize);


    $(document).keydown(key => {
        if (keys[key.keyCode] !== undefined) {
            keys[key.keyCode].down = true;
        }
        ;
    });

    //TODO Zrobić taką obsługę aby rakieta mogła strzelać  bez zatrzymywania się 
    $(document).keyup(function (e) {
        if (keys[e.keyCode] !== undefined) {
            keys[e.keyCode].down = false;
        }
        ;
    });

})