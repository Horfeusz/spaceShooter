/**
 * Obsługa eksplozji
 */

//Ilość klatek eksplozji
var FILE_COUNT = 278;

function createExplosion(px, py) {
    
    var explosion = createEntity('explosion0000', {incFile: 0});

    //Ustawiam wielkość ekslozji, zmniejszam rysunek o połowę
    explosion.correctWidth = (explosion.img.width / 2) * -1;
    explosion.correctHeight = (explosion.img.height / 2) * -1;                                                  
    
    //Ustawiam współrzędne ekslozji
    explosion.x = px - (explosion.img.width / 4); 
    explosion.y = py - (explosion.img.height / 4);

    //Nadpisanie metody poruszającej obiekt
    explosion.move = function() {        
        //Incrementuje indeks obrazka
        //this.incFile++;
        this.incFile += 2;
        //this.incFile = this.incFile + 3;
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