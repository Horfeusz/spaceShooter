/**
* Tworze obiekt playera (Rakieta)
* 
*   speed - atrybut odpowiedzialny za szybkość poruszania się statku
*   speedShot - atrybut odpowiedzialny za szybkość wystrzeliwania pocisków
*   
*
*/

let player;
//Nazwa obiektu gracza
const PLAYER_NAME = 'spco';
//Czy pojazad gracza żyje
let PLAYER_OR_ALIVE = false;


function createPlayer() {
    
    PLAYER_OR_ALIVE = true;

    player = createEntity(PLAYER_NAME, {x:500, 
                                        y:520, 
                                        speed:6, 
                                        speedShot: 60, 
                                        speedShotInc: 0,
                                        correctWidth: -250,
                                        correctHeight: -250});
    
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
        Object.keys(pKeys)
            .filter(key => pKeys[key].down)
            .forEach(key => player.input(pKeys[key].key));
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
}

/**
 * Klawisze dla playera
 */
function inputKeysPlayer(keys) {
    if(!PLAYER_OR_ALIVE) {
        return;
    }
    player.inputKeys(keys);
}