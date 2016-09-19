/**
 * Tworzę obiekt pocisku
 */

//Nazwa obiektu
var MISSILE_NAME = 'missile';
// Prędkość pocisku
var MISSILE_SPEED = 3;

function createMissile(playerX, playerY, playerWidth) {
    
    var missile = createEntity('missile', {});

    //Nadpisanie metody poruszającej obiekt
    missile.move = function() {
        //TODO - Jak uruchomić metodę bazową
        this.x += this.vx;
        this.y += this.vy;        

        //Jeżeli jest poza ekranem to ubijmy ten obiek i wyczyśćmy pamięć
        if(this.y < 0) {
            this.dead = true;
        }
    };

    missile.x = playerX + (playerWidth / 2) - (missile.img.width / 2); 
    missile.y = playerY - missile.img.height;
    missile.vy = -MISSILE_SPEED;

    return missile;

};