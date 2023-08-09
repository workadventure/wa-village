/// <reference types="@workadventure/iframe-api-typings" />

import "./roofs";

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

let popupPrivateOffice: any;
let mapOverviewAction: any;
let mapOverviewPage: any;

(async () => {
    await WA.onInit();
    await WA.players.configureTracking({
      players: true,
      movement: false,
    });
    await WA.player.getPosition();
})();

// Waiting for the API to be ready
WA.onInit().then(() => {
    // If user is admin, name avec dark blue border
    const userTag = WA.player.tags;

    if(userTag.includes("admin")) {
        WA.player.setOutlineColor(27, 42, 65);
    }
    if(!WA.player.state.tutorialDone){
        openTutorial();
    }

    WA.room.onLeaveLayer("start").subscribe(() => {
        WA.ui.modal.closeModal();
    });

    WA.ui.actionBar.addButton({
        id: 'map-btn',
        // @ts-ignore
        type: 'action',
        imageSrc: 'https://hugoaverty.github.io/map-overview/img/map.svg',
        toolTip: 'Map overview',
        callback: (event) => {
            console.log('Button map overview triggered', event);
            openMapOverview();
        }
    });

    // Open & Close popupPrivateOffice
    WA.room.area.onEnter("popupPrivateOffice_area").subscribe(() => {
        popupPrivateOffice = WA.ui.openPopup("popupPrivateOffice", "Our private office serves as a restricted zone, exclusively accessible to our team members.", [{
            label: "Close",
            className: "primary",
            callback: (popup) => {
                popup.close();
            }
        }]);
    });
    WA.room.area.onLeave("popupPrivateOffice_area").subscribe(() => {
        popupPrivateOffice.close();
    })

    // Open & Close popupPrivateOffice
    WA.room.area.onEnter("zone_map_overview").subscribe(() => {
        mapOverviewAction = WA.ui.displayActionMessage({
            message: "Press 'SPACE' to display map overview and move to a specific zone. \n \n You can acces to map overview directly on the bottom nav !",
            callback: () => {
                openMapOverview();
            }
        });
    });
    WA.room.area.onLeave("zone_map_overview").subscribe(() => {
        mapOverviewAction.remove();
        WA.ui.modal.closeModal();
    })

    /*
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();

    // EXEMPLE UTC+6
    // IL EST 15H la bas
    
    console.log("CURRENT TIME IS :");
    console.log(time);
    
    const utcDifference = -(new Date().getTimezoneOffset() / 60) - 2; // Difference between User UTC and Workaventure UTC (UTC - UTC+2);
    console.log("CURRENT UTC - UTC+2 = " + utcDifference);

    const timeClient = today.getHours() - utcDifference;
    console.log("CURRENT TIME - UCT DIFF = " + timeClient);

    // If time hour is between 9h and 18h it's OPEN else it's CLOSED
    if(timeClient >= 9 && timeClient <= 18) {
        console.log(">>> OPEN <<<");
    } else {
        console.log(">>> CLOSED <<<");
    }
    */
    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

const openMapOverview = async() => {
    WA.ui.modal.closeModal();
    const pos = await WA.player.getPosition();
    mapOverviewPage = WA.ui.modal.openModal({ 
        src: "https://hugoaverty.github.io/map-overview/index.html?x="+pos.x+"&y="+pos.y+"",
        allow: "fullscreen",
        title: "Map Overview",
        allowApi: true,
        position: "center",
    });
    console.log("mapOverviewPage" + mapOverviewPage);
}

const openTutorial = () => {
    console.info('Open the tutorial');
    // @ts-ignore
    WA.ui.modal.openModal({
        title: "Tutorial",
        src: 'https://workadventure.github.io/scripting-api-extra/tutorialv1.html',
        allow: "fullscreen; clipboard-read; clipboard-write",
        allowApi: true,
        position: "right",
    });
}

export {};
