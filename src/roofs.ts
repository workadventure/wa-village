/// <reference types="@workadventure/iframe-api-typings/iframe_api" />

console.info('Roofs Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {
    WA.room.onEnterLayer("floor1").subscribe(() => {
        WA.room.hideLayer("roof1");
        WA.room.hideLayer("walls-bg-front1");
        WA.room.hideLayer("sign1");
    });
    WA.room.onLeaveLayer("floor1").subscribe(() => {
        WA.room.showLayer("roof1");
        WA.room.showLayer("walls-bg-front1");
        WA.room.showLayer("sign1");
    });
    WA.room.onEnterLayer("floor2").subscribe(() => {
        WA.room.hideLayer("roof2");
        WA.room.hideLayer("walls-bg-front2");
        WA.room.hideLayer("sign2");
    });
    WA.room.onLeaveLayer("floor2").subscribe(() => {
        WA.room.showLayer("roof2");
        WA.room.showLayer("walls-bg-front2");
        WA.room.showLayer("sign2");
    });
    WA.room.onEnterLayer("rooms_floor").subscribe(() => {
        WA.room.hideLayer("facade-furniture-bg");
        WA.room.hideLayer("facade-furniture-fg");
        WA.room.hideLayer("facade");
    });
    WA.room.onLeaveLayer("rooms_floor").subscribe(() => {
        WA.room.showLayer("facade-furniture-bg");
        WA.room.showLayer("facade-furniture-fg");
        WA.room.showLayer("facade");
    });
    WA.room.onEnterLayer("doorstep/zone_office_silent").subscribe(() => {
        WA.room.showLayer("silentOverlay");
    });
    WA.room.onLeaveLayer("doorstep/zone_office_silent").subscribe(() => {
        WA.room.hideLayer("silentOverlay");
    });

    /*
    WA.room.onEnterLayer("doorstep/zone_office").subscribe(() => {
        const players = WA.players.list();
        console.log("players");
        console.log(players);
        let admin: any;
        for (const player of players) {
            console.log(`Player ${player.name} is near you`);
            console.log(player);
            console.log(player.state.outlineColor);
            if(player.state._outlineColor == 1780289) {
                admin++
            }
        }
        if(admin != 0) {
            console.log("There is no admin");
        }
    }); 
      */
}).catch(e => console.error(e));

export {}
