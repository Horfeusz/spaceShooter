/**
 * Obsługa bomb wystrzeliwanych przez ufoki
 */

//Nazwa obiektu
var BOMB_NAME = 'bomb1';
// Prędkość bomby
var BOMB_SPEED = 3;

/**
 * Metoda tworząca bombę.
 * Parametrem jest obiekt który będzie ją wystrzeliwał
 */

function createBomb(fireObject) {

    console.log(fireObject.x);
    console.log(fireObject.y)
    
    function initParam() {
        var param = {};
        param.x = fireObject.x + (fireObject.getWidth() / 2);
        param.y = fireObject.y + (fireObject.getHeight());
        param.correctWidth = -20;
        param.correctHeight = -40;
        param.vy = BOMB_SPEED; 
        return param; 
    };

    var bomb = createEntity(BOMB_NAME, initParam());

}
