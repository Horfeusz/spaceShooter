//http://13zmiennych.blogspot.com/2013/10/jak-zrobic-prosta-gre-w-javascript_13.html
/**
 * Lista TODO
 * 
 * 3. Przy zestrzeleniu ufa jakiś wybuch: http://jsdn.pl/javascript-tworzenie-animacji-grach-przy-uzyciu-spritesheetow/
 *                                          http://webkod.pl/kurs-css/lekcje/dzial-4/css3-animowany-obrazek-klatka-po-klatce
 * 4. Ufoki się odgryzają, zrzucają bąby
 * 5. Dalsze pomysły .....
 * 6. Tło
 *
 * Fajne Sprity ufokowe: http://millionthvector.blogspot.com/p/free-sprites_12.html
 * 
 * Paczka spritów: http://opengameart.org/content/complete-spaceship-game-art-pack
 *                  www.unluckystudio.com
 * 
 *  
 */


//Obrazki
var images = {};
//obiekty
var entities = [];
var canvas, ctx, player;
var CANVA_HEIGHT = 600;
var CANVA_WIDTH = 1000;

//Obiekt obsługi klawiszy dla rakiety
var keys = {
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
 * Prototyp obiektu
 */
var EntityPrototype = {
    /** Metoda rysowania obiektu */
    draw: function(context) {
        context.drawImage(this.img, this.x, this.y, this.getWidth(), this.getHeight());
    },
    /** Zmiana współżednych obiektów */
    move: function() {
        this.x += this.vx;
        this.y += this.vy;
    },
    /** Zwracam szerokość obiektu */
    getWidth: function() {
        if(this.img === undefined || this.img === null) {
            return 0;
        }
        return this.img.width + this.correctWidth;
    },
    /** Zwracam wysokość obiektu */
    getHeight: function () {
        if(this.img === undefined || this.img === null) {
            return 0;
        }
        return this.img.height + this.correctHeight;
    },
    x:0,
    y:0,
    vx:0,
    vy:0,
    img: null,
    /** O ile ma być skorygowana szerokość obiektu */
    correctWidth: 0,
    /** O ile ma być skorygowana wysokość obiektu */
    correctHeight: 0,
};


/**
 * Metoda ładująca obrazki
 */
function loadImges(directory, fileNames, onComplete) {
    var imagesCount = fileNames.length;
    
    fileNames.forEach(function(fileName) {
        var img = new Image();        
        //Przypisujemy zdarzenie wołane po załadowaniu obrazka
        img.onload = function() {
            imagesCount--;
            if(imagesCount <= 0 && onComplete !== null) {
                //Mamy załadowane wszystkie obrazki, wołamy inicjację aplikacji
                onComplete();
            } 
        }        
        img.src = directory + "/" + fileName;

        //Ustalam sobie nazwę obiektu z nazwy pliku
        var objectName = fileName.substring(0, fileName.lastIndexOf('.'));
        images[objectName] = img; 
    });
}

/**
 * Metoda tworzy jednostki
 */
function createEntity(entityName, properties) {
    var entity = Object.create(EntityPrototype);
    entity.img = images[entityName];
    entity.type = entityName;

    for(var propertyName in properties) {
        entity[propertyName] = properties[propertyName];
    }
    entity.posArray = (entities.push(entity) - 1);

    console.log(entityName + ": " + entity.posArray);

    return entity;
}

/**
 * Inicjujemy canve
 */
function initCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');    
}

/**
 * Główna pętla gry
 */
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Sprawdzam kolizje na obiektach
    checkCollision();

    //Usuwamy z tabeli martwe obiekty po kolizjach i wylocie poza ekran (rakiety)
    entities = entities.filter(function(entity) {
        return !entity.dead;
    });

    //Zmiana współżędnych położenia obiektów
    entities.forEach(function (entity) {
        entity.move();
    });

    //obsługa klawiszy dla statku/gracza
    player.inputKeys(keys);

    //Rysowanie na ekranie obiektów po wszystkich operacjach
    entities.forEach(function (entity) {
        entity.draw(ctx);
    });    
}

/**************************************************************************************
 * Metoda inicjująca grę
 **************************************************************************************/
function initialize() {
    initCanvas();
    console.log('initialize()');

    createPlayer();

    //createUfo({x:0, y:20});
    //createUfo({x:120, y:80});
    createUfo({x:40, y:130});

    setInterval(gameLoop, 1000/60);           
}
/**************************************************************************************/
$(document).ready(function() {
    loadImges('images', ['spco.png', 'ufo.png', 'missile.png'], null);
    
    var imgs = []; 
    var pad = "0000";
    for(i = 0; i < 279; i++) {
        var number = "" + i;
        imgs.push("explosion" + pad.substring(0, pad.length - number.length) + number + ".png")
    }
    loadImges('images/explosion', imgs, initialize);

    $(document).keydown(function(e) {
        if(keys[e.keyCode] !== undefined) {
            keys[e.keyCode].down = true;
        };
    });
    
    //TODO Zrobić taką obsługę aby rakieta mogła strzelać  bez zatrzymywania się 
    $(document).keyup(function(e) {
        if(keys[e.keyCode] !== undefined) {
            keys[e.keyCode].down = false;
        };        
    });

})