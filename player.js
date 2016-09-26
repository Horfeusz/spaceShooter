/**
* Tworze obiekt playera (Rakieta)
* 
*   speed - atrybut odpowiedzialny za szybkość poruszania się statku
*   speedShot - atrybut odpowiedzialny za szybkość wystrzeliwania pocisków
*   
*
*/

//Nazwa obiektu gracza
var PLAYER_NAME = 'spco';
//Czy pojzad gracza żyje
var PLAYER_OR_ALIVE = false;
//Tablica żyć
var PLAYER_LIVES = [];

function createPlayer() {
    
    /**
     * Metoda tworząca trzy małe stateczki które będą symbolizować życia
     */
    function createPlayerLive() {
        PLAYER_LIVES.push(createEntity(PLAYER_NAME, {x: (CANVA_WIDTH - 80), 
                                              y:30,   
                                              correctWidth: -350,
                                              correctHeight: -350},
                                              'playerL1'));                                                  

        PLAYER_LIVES.push(createEntity(PLAYER_NAME, {x: (CANVA_WIDTH - 50), 
                                              y:30,   
                                              correctWidth: -350,
                                              correctHeight: -350},
                                              'playerL2'));

        PLAYER_LIVES.push(createEntity(PLAYER_NAME, {x: (CANVA_WIDTH - 20), 
                                              y:30,   
                                              correctWidth: -350,
                                              correctHeight: -350},
                                              'playerL3'));
    }

    createPlayerLive();

    PLAYER_OR_ALIVE = true;

    player = createEntity(PLAYER_NAME, {x:500, 
                                        y:480, 
                                        speed:6, 
                                        speedShot: 60, 
                                        speedShotInc: 0,
                                        correctWidth: -250,
                                        correctHeight: -250})
    
    /**
     * Metoda incerementująca znacznik odpowiedzialny z prędkość strzelania
     */
    player.speedShotIncrement = function(reset) {
        if(reset) {
            this.speedShotInc = 0;
        } else {
            this.speedShotInc++;    
        }
    };

    /**
     * Metoda która przyjmuje informację na temat wciśnietych klawiszy 
     */
    player.inputKeys = function(pKeys) {
        if(!PLAYER_OR_ALIVE) {
            return;
        }
        player.speedShotIncrement(false);
        var tabKeys = Object.keys(pKeys);
        for(i = 0; i < tabKeys.length; i++) {
            if(pKeys[tabKeys[i]].down) {
                player.input(pKeys[tabKeys[i]].key);            
            }
        }
    };
    
    /**
     * Metoda obsługująca reakcje na wciśnięty klawisz 
     */
    player.input = function(key) {
        switch(key) {
            case 'left':
                if(this.x - this.speed >= 0) {
                    this.x -= this.speed;    
                }
                break;
            case 'right':
                if(this.x + this.speed <= (CANVA_WIDTH - this.getWidth())) {
                    this.x += this.speed;
                }
                break;
            case 'up':
                if(this.y - this.speed >= 0) {
                    this.y -= this.speed;    
                }
                break;  
            case 'down':
                if((this.y + this.speed) <= (CANVA_HEIGHT - this.getHeight())) {
                    this.y += this.speed;    
                }
                break;               
            case 'fire':
                if(this.speedShotInc > this.speedShot) {
                    createMissile(this.x, this.y, this.getWidth());
                    player.speedShotIncrement(true);
                }
                break;
        }
    };
    return player
};

/**
 * Funkcja usuwa jedno życie
 */
function deadPlayerLive() {
    var lives = PLAYER_LIVES.length;
    
    //TODO
    
    
    
    if(PLAYER_LIVES.length === 0) {
        //FIXME GAME OVER
    } 
}