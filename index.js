//http://13zmiennych.blogspot.com/2013/10/jak-zrobic-prosta-gre-w-javascript_13.html
/**
 * Lista TODO
 * 
 * 1. Zrobić porządek w źródłach, wydzielić odpowiedzialność po plikach
 * 2. Ufa nie powinny znikać tylko kręcić się po ekranie, jakoś losowo się poruszać
 * 3. Przy zestrzeleniu ufa jakiś wybuch: http://jsdn.pl/javascript-tworzenie-animacji-grach-przy-uzyciu-spritesheetow/
 *                                          http://webkod.pl/kurs-css/lekcje/dzial-4/css3-animowany-obrazek-klatka-po-klatce
 * 4. Ufoki się odgryzają, zrzucają bąby
 * 5. Dalsze pomysły .....
 * 6. Tło
 *
 * Fajne Sprity ufokowe: http://millionthvector.blogspot.com/p/free-sprites_12.html
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
    getWidth: function() {
        if(this.img === undefined || this.img === null) {
            return 0;
        }
        return this.img.width + this.correctWidth;
    },
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
            if(imagesCount <= 0) {
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
 * Wykrywamy kolizję
 */
function checkCollision() {

    /**
     * Metoda wykrywająca kolizję dwóch obiektów
     */
    function  isIntersection(a, b) {
        var aWidth = a.img.width,
            aHeight = a.img.height,
            bWidth = b.img.width,
            bHeight = b.img.height;
        
        var minX = Math.min(a.x, b.x);
        var minY = Math.min(a.y, b.y);

        var maxX = Math.max(a.x + aWidth, b.x + bWidth);
        var maxY = Math.max(a.y + aHeight, b.y + bHeight);

        var result = (maxX - minX) < (aWidth + bWidth) && (maxY - minY) < (aHeight + bHeight); 
        return result; 

    }

    //Lecimy po obiektach i sprawdzamy kolizję
    var count = entities.length;
    for(i = 0; i < count - 1; i++) {
        for(j = i + 1; j < count; j++) {
            if(!isIntersection(entities[i], entities[j])) {
                continue;
            };
            
            //Jeżeli kolizja rakiety z ufo
            if((entities[i].type === 'missile' && entities[j].type === 'ufo') ||
                    (entities[i].type === 'ufo' && entities[j].type === 'missile')) {
                console.log("kolizja: " + entities[i].type + ' z ' + entities[j].type);

                entities[i].dead = true;
                entities[j].dead = true;                
            };            
        }
    }
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
    //createEntity('ufo', {x:0, y:20, vx:1, vy:0.1})
    createUfo({x:0, y:20, vx:1, vy:0.1});
    //createEntity('ufo', {x:120, y:80, vx:1.1, vy:0})    
    //createEntity('ufo', {x:40, y:130, vx:1.05, vy:0})    

    setInterval(gameLoop, 1000/60);           
}
/**************************************************************************************/
$(document).ready(function() {
    loadImges('images', ['spco.png', 'ufo.png', 'missile.png'], initialize);

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