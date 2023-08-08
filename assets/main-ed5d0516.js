import{b as s}from"./init-22028896.js";console.info("Roofs Script started successfully");WA.onInit().then(()=>{WA.room.onEnterLayer("floor1").subscribe(()=>{WA.room.hideLayer("roof1"),WA.room.hideLayer("walls-bg-front1"),WA.room.hideLayer("sign1")}),WA.room.onLeaveLayer("floor1").subscribe(()=>{WA.room.showLayer("roof1"),WA.room.showLayer("walls-bg-front1"),WA.room.showLayer("sign1")}),WA.room.onEnterLayer("floor2").subscribe(()=>{WA.room.hideLayer("roof2"),WA.room.hideLayer("walls-bg-front2"),WA.room.hideLayer("sign2")}),WA.room.onLeaveLayer("floor2").subscribe(()=>{WA.room.showLayer("roof2"),WA.room.showLayer("walls-bg-front2"),WA.room.showLayer("sign2")}),WA.room.onEnterLayer("rooms_floor").subscribe(()=>{WA.room.hideLayer("facade-furniture-bg"),WA.room.hideLayer("facade-furniture-fg"),WA.room.hideLayer("facade")}),WA.room.onLeaveLayer("rooms_floor").subscribe(()=>{WA.room.showLayer("facade-furniture-bg"),WA.room.showLayer("facade-furniture-fg"),WA.room.showLayer("facade")}),WA.room.onEnterLayer("doorstep/zone_office_silent").subscribe(()=>{WA.room.showLayer("silentOverlay")}),WA.room.onLeaveLayer("doorstep/zone_office_silent").subscribe(()=>{WA.room.hideLayer("silentOverlay")})}).catch(o=>console.error(o));let r,a,i;(async()=>(await WA.onInit(),await WA.players.configureTracking({players:!0,movement:!1}),await WA.player.getPosition()))();WA.onInit().then(()=>{WA.player.tags.includes("admin")&&WA.player.setOutlineColor(27,42,65),WA.player.state.tutorialDone||n(),WA.room.onLeaveLayer("start").subscribe(()=>{WA.ui.modal.closeModal()}),WA.ui.actionBar.addButton({id:"map-btn",type:"action",imageSrc:"https://hugoaverty.github.io/map-overview/img/map.svg",toolTip:"Map overview",callback:e=>{console.log("Button map overview triggered",e),t()}}),WA.room.onEnterLayer("popup/popzone_private_office").subscribe(()=>{r=WA.ui.openPopup("popupPrivateOffice","Our private office serves as a restricted zone, exclusively accessible to our team members.",[{label:"Close",className:"primary",callback:e=>{e.close()}}])}),WA.room.onLeaveLayer("popup/popzone_private_office").subscribe(()=>{r.close()}),WA.room.onEnterLayer("popup/zone_map_overview").subscribe(()=>{a=WA.ui.displayActionMessage({message:`Press 'SPACE' to display map overview and move to a specific zone. 
 
 You can acces to map overview directly on the bottom nav !`,callback:()=>{t()}})}),WA.room.onLeaveLayer("popup/zone_map_overview").subscribe(()=>{a.remove(),WA.ui.modal.closeModal()}),s().then(()=>{console.log("Scripting API Extra ready")}).catch(e=>console.error(e))}).catch(o=>console.error(o));const t=async()=>{WA.ui.modal.closeModal();const o=await WA.player.getPosition();i=WA.ui.modal.openModal({src:"https://hugoaverty.github.io/map-overview/index.html?x="+o.x+"&y="+o.y,allow:"fullscreen",title:"Map Overview",allowApi:!0,position:"center"}),console.log("mapOverviewPage"+i)},n=()=>{console.info("Open the tutorial"),WA.ui.modal.openModal({title:"Tutorial",src:"https://workadventure.github.io/scripting-api-extra/tutorialv1.html",allow:"fullscreen; clipboard-read; clipboard-write",allowApi:!0,position:"right"})};
