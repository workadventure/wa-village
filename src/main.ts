/// <reference types="@workadventure/iframe-api-typings" />

import "./roofs";

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

// Waiting for the API to be ready
WA.onInit().then(() => {

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

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

const openMapOverview = () => {
    WA.ui.modal.closeModal();
    WA.ui.modal.openModal({
        src: "https://hugoaverty.github.io/map-overview/",
        allow: "fullscreen",
        title: "Map Overview",
        allowApi: true,
        position: "center",
    });
}

export {};
