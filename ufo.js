/**
 * Obsługa ufoków
 */

var UFO_X_SPEED = 1;

function createUfo(param) {

    function initParam(parameters) {
        /**
         * FIXME - do zrobienia losowe położenie.
         * np. losujemy z której połówki się pojawi albo z prawej albo z lewej od tego uzalezniamy parametry
         */
        
        parameters.vx = (UFO_X_SPEED + Math.random());
        parameters.vy = Math.random();
                
        param.xModifier = 1;
        param.yModifier = 1;

        return parameters;
    };
        
    var ufo = createEntity('ufo', initParam(param));
    

    /** Tymczasowo aby obadać położenie */
    ufo.draw = function(context) {
        context.drawImage(this.img, this.x, this.y, this.getWidth(), this.getHeight());

        //console.log("x: " + this.x + ", y: " + this.y);
    };

    /** Metoda losuje wartość przesuwania się i ustawia modyfikator dla osi X*/
    ufo.randomForX = function(modifier) {
        this.vx = (UFO_X_SPEED + Math.random());
        this.vy = Math.random();            
        this.xModifier = modifier;
    };

    /** Metoda losuje wartość przesuwania się i ustawia modyfikator dla osi Y*/
    ufo.randomForY = function(modifier) {
        this.vx = (UFO_X_SPEED + Math.random());
        this.vy = Math.random();            
        this.yModifier = modifier;        
    };

    /** Nadpisanie metody move */
    ufo.move = function() {
        //Jeżeli dotykam prawej krawędzi
        if(this.x + (this.vx * this.xModifier) > (CANVA_WIDTH - this.getWidth())) {
            this.randomForX(-1);
        }
        //Jeżeli dotykam lewej krawędzi
        if(this.x - (this.vx * this.xModifier) < 0) {
            this.randomForX(1);
        }
        //Jeżeli dotykam dolnej krawędzi
        if(this.y + (this.vy * this.yModifier) > (CANVA_HEIGHT - this.getHeight())) {
            this.randomForY(-1);
        }
        //Jeżeli dotykam górnej krawędzi
        if(this.y - (this.vy * this.yModifier) < 0) {
            this.randomForY(1);    
        }

        this.x += (this.vx * this.xModifier);
        this.y += (this.vy * this.yModifier);
    };

    return ufo;
}