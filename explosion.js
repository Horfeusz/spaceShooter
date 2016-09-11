/**
 * Obsługa eksplozji
 */

//Ilość klatek eksplozji
var FILE_COUNT = 278;

function createExplosion(px, py) {
    
    console.log("ekslozja x: " + px + " y: " + py);
    
    var explosion = createEntity('explosion0000', {x: px,
                                                   y: py,
                                                   incFile: 0});
    //Nadpisanie metody poruszającej obiekt
    explosion.move = function() {        
        //Incrementuje indeks obrazka
        this.incFile++;
        if(this.incFile > FILE_COUNT) {
            this.dead = true;
            return;
        }

        var pad = "0000", number = "" + this.incFile; 
        var entityName = "explosion" + pad.substring(0, pad.length - number.length) + number;
        this.img = images[entityName];
        this.type = entityName; 
    };

};