/**
 * Obsługa bomb wystrzeliwanych przez ufoki
 */

//Nazwa obiektu
let BOMB_NAME = 'bombs';
// Prędkość bomby
let BOMB_SPEED = 1;
// Ilość klatek do zmiany rysunku
const BOMB_CHANGE_LIMIT = 20;

const BOMB_CORRECT_WIDTH = 0;
const BOMB_CORRECT_HEIGHT = 0;

//Parametry dla rysunku bomby
const params = [{sx:13, sy:48, sWidth:26, sHeight:63, dx:null, dy:null, dWidth:23, dHeight:63},
              {sx:41, sy:48, sWidth:26, sHeight:63, dx:null, dy:null, dWidth:26, dHeight:63},
              {sx:70, sy:48, sWidth:26, sHeight:63, dx:null, dy:null, dWidth:26, dHeight:63},
              {sx:99, sy:48, sWidth:26, sHeight:63, dx:null, dy:null, dWidth:26, dHeight:63},
              {sx:128, sy:48, sWidth:26, sHeight:63, dx:null, dy:null, dWidth:26, dHeight:63},
              {sx:158, sy:48, sWidth:28, sHeight:63, dx:null, dy:null, dWidth:28, dHeight:63},
              {sx:190, sy:48, sWidth:33, sHeight:63, dx:null, dy:null, dWidth:33, dHeight:63},
              {sx:226, sy:48, sWidth:33, sHeight:63, dx:null, dy:null, dWidth:33, dHeight:63},
              {sx:262, sy:48, sWidth:31, sHeight:63, dx:null, dy:null, dWidth:31, dHeight:63},
              {sx:297, sy:48, sWidth:27, sHeight:63, dx:null, dy:null, dWidth:27, dHeight:63},
              {sx:328, sy:48, sWidth:26, sHeight:63, dx:null, dy:null, dWidth:26, dHeight:63},
              {sx:358, sy:48, sWidth:26, sHeight:63, dx:null, dy:null, dWidth:26, dHeight:63},
              {sx:388, sy:48, sWidth:26, sHeight:63, dx:null, dy:null, dWidth:26, dHeight:63}];

/**
 * Metoda tworząca bombę.
 * Parametrem jest obiekt który będzie ją wystrzeliwał
 */

function createBomb(fireObject) {
    
    function initParam() {
        const param = params[2];
        param.dx = fireObject.x + (fireObject.getWidth() / 2);
        param.dy = fireObject.y + (fireObject.getHeight());  
        
        const result = {};
        result.param = param;
        result.counter = 0;
        result.vy = BOMB_SPEED;

        return result; 
    }

    const bomb = createEntity(BOMB_NAME, initParam());

    //Nadpisanie metody poruszającej obiekt
    bomb.move = function() {
        //this.param.dx += this.vx;
        this.param.dy += 1;

        //Jeżeli jest poza ekranem to ubijmy ten obiekt i wyczyśćmy pamięć
        if(this.param.dy > CANVA_HEIGHT) {
            this.dead = true;
        }
    };

    //Nadpisanie metody rysującej
    bomb.draw = function(context) {
		liczba = 1;
		
        context.drawImage(this.img, 
            this.param.sx, 
            this.param.sy, 
            this.param.sWidth, 
            this.param.sHeight, 
            this.param.dx, 
            this.param.dy, 
            (this.param.dWidth + BOMB_CORRECT_WIDTH), 
            (this.param.dHeight + BOMB_CORRECT_HEIGHT));        
    };
    

    bomb.getWidth = function() {
        return this.param.dWidth - BOMB_CORRECT_WIDTH;
    };

    bomb.getHeight = function () {
        return this.param.dHeight - BOMB_CORRECT_HEIGHT;
    };     

}
