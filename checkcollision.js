/**
 * Wykrywamy kolizję
 */
function checkCollision() {

    /**
     * Metoda wykrywająca kolizję dwóch obiektów
     */
    function isIntersection(a, b) {
        let aWidth = a.getWidth(),
            aHeight = a.getHeight(),
            bWidth = b.getWidth(),
            bHeight = b.getHeight();
        
        let minX = Math.min(a.x, b.x);
        let minY = Math.min(a.y, b.y);

        let maxX = Math.max(a.x + aWidth, b.x + bWidth);
        let maxY = Math.max(a.y + aHeight, b.y + bHeight);

        let expX, expY;

        const result = (maxX - minX) < (aWidth + bWidth) && (maxY - minY) < (aHeight + bHeight);
        
        if(result) {            
            //Wyliczam środek styku
            let expX = minX + ((maxX - minX) / 2);
            let expY = minY + ((maxY - minY) / 2);

            /*
            console.log('a: ' + a.type + ' x: ' + a.x + ' y: ' + a.y + ' width: ' + aWidth + ' height: ' + aHeight);            
            console.log('b: ' + b.type + ' x: ' + Math.round(b.x) + ' y: ' + Math.round(b.y) + ' width: ' + bWidth + ' height: ' + bHeight);
            console.log('---------------------------------------------------------------------');
            console.log('maxX: ' + maxX);
            console.log('minX: ' + Math.round(minX));
            console.log('maxX - minX: ' + Math.round((maxX - minX)));
            console.log('aWidth + bWidth: ' + (aWidth + bWidth));
            console.log('---------------------------------------------------------------------');
            console.log('maxY: ' + maxY);
            console.log('minY: ' + Math.round(minY));
            console.log('maxY - minY: ' + Math.round((maxY - minY)));
            console.log('aHeight + bHeight: ' + (aHeight + bHeight));            
            console.log('---------------------------------------------------------------------');

            console.log('expX: ' + expX);
            console.log('expY: ' + expY);
            */
        }
        
        return {
            res: result,
            x: expX,
            y: expY
        };         
    }

    /**
     * Kolizja rakiety z UFO
     */
    function collisionMissileUfo(ei, ej) {
        if((ei.type === MISSILE_NAME && ej.type === UFO_NAME) ||
                (ei.type === UFO_NAME && ej.type === MISSILE_NAME)) {
            console.log("kolizja: " + ei.type + ' z ' + ej.type);

            //Ustal parametry wybuchu. X rakiety Y ufa
            var expX, expY;
            if(ei.type === MISSILE_NAME) {
                expX = ei.x;
                expY = ei.y;
            } else {
                expX = ej.x;
                expY = ej.y;
            };

            //wybuch na czubku rakiety i jest gucio
            createExplosion(expX, expY);

            ei.dead = true;

            addPlayerPoints(1);
        }
    }

    function collisionPlayer(ei, ej) {
        console.log("kolizja: " + ei.type + ' z ' + ej.type);
        
        //wybuch na podstawie obliczonego miejsca kolizji
        createExplosion(result.x, result.y);

        ei.dead = true;
        ej.dead = true;

        deadPlayerLive();
    }

    /**
     * Kolizja statku z Ufo
     * 
     * FIXME - Można udoskonalić kolizję z statkiem przy założeniu, że kolizja następuje z trójkątem
     * którym jest statek, który jest w kwadracie rysunku.
     * Należałoby obrysować statek liniami i obliczyć czy punkt kolizji zawiera się w trójkącie
     */
    function collisionPlayerUfo(ei, ej) {
        if((ei.type === UFO_NAME && ej.type === PLAYER_NAME) || 
            (ei.type === PLAYER_NAME && ej.type === UFO_NAME)) {
                collisionPlayer(ei, ej);
        }
    }

    /**
     * Kolizja bomby z statkiem
     */
    function collisionBombPlayer(ei, ej) {
        if((ei.type === BOMB_NAME && ej.type === PLAYER_NAME) || 
            (ei.type === PLAYER_NAME && ej.type === BOMB_NAME)) {
                collisionPlayer(ei, ej);
        }        
    }

    //Lecimy po obiektach i sprawdzamy kolizję
    let count = entities.length;
    var eiType, ejType;
    for(let i = 0; i < count - 1; i++) {
        for(let j = i + 1; j < count; j++) {
            if(!isIntersection(entities[i], entities[j]).res) {
                continue;
            }
            collisionMissileUfo(entities[i], entities[j]);
            collisionPlayerUfo(entities[i], entities[j]);
            collisionBombPlayer(entities[i], entities[j]);
        }
    }
}