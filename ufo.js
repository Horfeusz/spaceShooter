/**
 * Obsługa ufoków
 */

const UFO_NAME = 'ufo';
//Prekość ufoka
const UFO_X_SPEED = 1;
//Co ile klatek ma się pojawiać ufok
let ufoHowMuchFrames = 50;
//Licznik klatek, na starcie jest 50 aby już generować ufoka
let UFO_FRAMES_COUNTER = 50;

/*************************************************************************************************
 * Metoda licząca ile jest ufoków
 ************************************************************************************************/
function howMuchIsUfo() {
    let count = 0;
    if (entities == null || entities.length === 0) {
        return count;
    }
    entities.forEach((entity) => {
        if (!entity.dead && entity.type.startsWith(UFO_NAME)) {
            count++;
        }
    });
    return count;
}


/*************************************************************************************************
 * Tworze ufoka
 ************************************************************************************************/
function createUfo(param) {

    /**
     * Losuje z której strony ma nadlecieć ufokos
     */
    function randomCreateX() {
        var modifier, xx;
        if ((Math.random() - 0.5) < 0) {
            //z lewej
            modifier = 1;
            xx = 0 + Math.round(Math.random() * 100);
        } else {
            //z prawej
            modifier = -1;
            xx = CANVA_WIDTH - Math.round(Math.random() * 100);
        }
        return {
            x: xx,
            xMod: modifier
        }
    }

    /**
     * Inicjalizacja
     */
    function initParam(parameters) {
        var parmX = randomCreateX();
        parameters.x = parmX.x;
        parameters.y = (0 - 40);
        parameters.vx = (UFO_X_SPEED + Math.random());

        console.log("parameters.vx: " + parameters.vx);

        parameters.vy = Math.random();
        param.correctWidth = -20;
        param.correctHeight = -15;
        //parameters.xModifier = 1;
        parameters.xModifier = parmX.xMod;
        parameters.yModifier = 1;

        //Atrybut zliczający wywołanie metody move w kontekście zrzucania bomby
        parameters.moveCountForBomb = 0;

        return parameters;
    }


    const ufo = createEntity(UFO_NAME, initParam(param));

    ufo.dumpBomb = function () {
        //TODO Póki co najprstrze implementacja, co 100 klatek
        this.moveCountForBomb++;
        if (this.moveCountForBomb < 100) {
            return;
        }
        //Jeżeli jest powyżej dwóch swoich długości
        if (this.x > (CANVA_HEIGHT - (this.getHeight() * 3))) {
            return;
        }
        this.moveCountForBomb = 0;
        createBomb(this);
    };

    /** Metoda losuje wartość przesuwania się i ustawia modyfikator dla osi X*/
    ufo.randomForX = function (modifier) {
        this.vx = (UFO_X_SPEED + Math.random());
        this.vy = Math.random();
        this.xModifier = modifier;
    };

    /** Metoda losuje wartość przesuwania się i ustawia modyfikator dla osi Y*/
    ufo.randomForY = function (modifier) {
        this.vx = (UFO_X_SPEED + Math.random());
        this.vy = Math.random();
        this.yModifier = modifier;
    };

    /** Nadpisanie metody move */
    ufo.move = function () {
        //Jeżeli dotykam prawej krawędzi
        if (this.x + (this.vx * this.xModifier) > (CANVA_WIDTH - this.getWidth())) {
            this.randomForX(-1);
        }
        //Jeżeli dotykam lewej krawędzi
        if (this.x - (this.vx * this.xModifier) < 0) {
            this.randomForX(1);
        }
        //Jeżeli dotykam dolnej krawędzi
        if (this.y + (this.vy * this.yModifier) > (CANVA_HEIGHT - this.getHeight())) {
            this.randomForY(-1);
        }
        //Jeżeli dotykam górnej krawędzi
        if (this.y - (this.vy * this.yModifier) < 0) {
            this.randomForY(1);
        }

        this.x += (this.vx * this.xModifier);
        this.y += (this.vy * this.yModifier);

        //Zrzuć bombę
        this.dumpBomb();
    };

    return ufo;
}

/*************************************************************************************************
 * Metoda będzie generowała ufoki
 ************************************************************************************************/
function createUfos() {

    /**
     * Metoda sprawdza czy generujemy gada
     */
    function isCreate() {
        //Narazie tylko trzy, pierwszy level

        if (howMuchIsUfo() >= 3) {
            return false;
        }
        //Jeżeli nie ma już ufoków
        if (ufoCount === 0) {
            ufoHowMuchFrames = Math.round((Math.random() * 100) / 4);
            console.log("Ufoka pojawi się za: " + ufoHowMuchFrames);
            return true;
        }

        UFO_FRAMES_COUNTER++;
        if (UFO_FRAMES_COUNTER < ufoHowMuchFrames) {
            return false;
        }
        //Minęła granica klatek generujemy ufoka jeżeli wylosujemy liczbę większą od 0,5        
        //if((Math.random() - 0.5) < 0) {
        //    return false;
        //}
        return true;
    }

    /**
     * Losuje wartość za ile klatek pojawi się kolejny ufok
     */
    function randomUfoHowMuchFrames() {
        ufoHowMuchFrames = Math.round((Math.random() * 100) / 2);
        console.debug("Ufoka pojawi się za: " + ufoHowMuchFrames);
    }

    //------------------------------------------------------------------------------
    if (!isCreate()) {
        return;
    }
    createUfo({});

    randomUfoHowMuchFrames();
}