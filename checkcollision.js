/**
 * Wykrywamy kolizję
 */
function checkCollision() {

    /**
     * Metoda wykrywająca kolizję dwóch obiektów
     */
    function  isIntersection(a, b) {
        var aWidth = a.getWidth(),
            aHeight = a.getHeight(),
            bWidth = b.getWidth(),
            bHeight = b.getHeight();
        
        var minX = Math.min(a.x, b.x);
        var minY = Math.min(a.y, b.y);

        var maxX = Math.max(a.x + aWidth, b.x + bWidth);
        var maxY = Math.max(a.y + aHeight, b.y + bHeight);

        var expX, expY;

        var result = (maxX - minX) < (aWidth + bWidth) && (maxY - minY) < (aHeight + bHeight); 
        
        if(result) {            
            //Wyliczam środek styku
            var expX = minX + ((maxX - minX) / 2); 
            var expY = minY + ((maxY - minY) / 2);

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
    };

    /*
    function collisionMissleUfo(ei, ej) {
        if((eiType === MISSILE_NAME && ejType === UFO_NAME) ||
                (eiType === UFO_NAME && ejType === MISSILE_NAME)) {
            
            console.log("kolizja: " + eiType + ' z ' + ejType);
            
            //wybuch na czubku rakiety i jest gucio
            createExplosion(entities[j].x, entities[j].y);

            entities[i].dead = true;
            entities[j].dead = true;                
        };
    };
    */

    //Lecimy po obiektach i sprawdzamy kolizję
    var count = entities.length;
    var eiType, ejType;
    for(i = 0; i < count - 1; i++) {
        for(j = i + 1; j < count; j++) {
            var result = isIntersection(entities[i], entities[j]);             
            if(!result.res) {
                continue;
            };
            eiType = entities[i].type;  
            ejType = entities[j].type;

            
            //Jeżeli kolizja pocisku z ufo
            if((eiType === MISSILE_NAME && ejType === UFO_NAME) ||
                    (eiType === UFO_NAME && ejType === MISSILE_NAME)) {
                
                console.log("kolizja: " + eiType + ' z ' + ejType);
                
                //wybuch na czubku rakiety i jest gucio
                createExplosion(entities[j].x, entities[j].y);

                entities[i].dead = true;
                entities[j].dead = true;                
            };

            //Jeżeli kolizja statku z ufo
            if((eiType === UFO_NAME && ejType === PLAYER_NAME) || 
                (eiType === PLAYER_NAME && ejType === UFO_NAME)) {
                
                console.log("kolizja: " + eiType + ' z ' + ejType);
                
                //wybuch na podstawie obliczonego miejsca kolizji
                createExplosion(result.x, result.y);

                entities[i].dead = true;
                entities[j].dead = true;                
            }
        }
    }
}