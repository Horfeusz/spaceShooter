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

        var result = (maxX - minX) < (aWidth + bWidth) && (maxY - minY) < (aHeight + bHeight); 
        return result; 

    }

    //Lecimy po obiektach i sprawdzamy kolizję
    var count = entities.length;
    var eiType, ejType;
    for(i = 0; i < count - 1; i++) {
        for(j = i + 1; j < count; j++) {
            if(!isIntersection(entities[i], entities[j])) {
                continue;
            };
            eiType = entities[i].type;  
            ejType = entities[j].type;

            
            //Jeżeli kolizja pocisku z ufo
            if((eiType === MISSILE_NAME && ejType === UFO_NAME) ||
                    (eiType === UFO_NAME && ejType === MISSILE_NAME)) {
                
                console.log("kolizja: " + eiType + ' z ' + ejType);
                //wybuch
                createExplosion(entities[j].x, entities[j].y);

                entities[i].dead = true;
                entities[j].dead = true;                
            };

            //Jeżeli kolizja statku z ufo
            if((eiType === UFO_NAME && ejType === PLAYER_NAME) || 
                (eiType === PLAYER_NAME && ejType === UFO_NAME)) {
                
                console.log("kolizja: " + eiType + ' z ' + ejType);
                //wybuch
                createExplosion(entities[j].x, entities[j].y);

                entities[i].dead = true;
                entities[j].dead = true;                
            }
        }
    }
}