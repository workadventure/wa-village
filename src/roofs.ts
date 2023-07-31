
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
      
}).catch(e => console.error(e));