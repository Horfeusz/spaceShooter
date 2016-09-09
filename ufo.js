/**
 * Obsługa ufoków
 */

function createUfo(param) {

    var ufo = createEntity('ufo', param) 
    
    ufo.draw = function(context) {
        context.drawImage(this.img, this.x, this.y, this.getWidth(), this.getHeight());

        console.log("x: " + this.x + ", y: " + this.y);
    };



    return ufo;
}