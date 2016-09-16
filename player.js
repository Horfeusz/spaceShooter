/**
* Tworze obiekt playera (Rakieta)
* 
*   speed - atrybut odpowiedzialny za szybkość poruszania się statku
*   speedShot - atrybut odpowiedzialny za szybkość wystrzeliwania pocisków
*   
*
*/

function createPlayer() {
    
    player = createEntity('spco', {x:500, 
                                   y:480, 
                                   speed:6, 
                                   speedShot: 30, 
                                   speedShotInc: 0,
                                   correctWidth: -230,
                                   correctHeight: -230})
    
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
}