/// <reference types="@workadventure/iframe-api-typings" />

import { Popup } from "@workadventure/iframe-api-typings";
import "./roofs";
import "./meeting/doors"
import "./funnel"

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

let popupPrivateOffice: Popup|null;

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
    const userTag = WA.player.tags;

    // If user is admin, name it with a dark blue border
    if(userTag.includes("admin")) {
        WA.player.setOutlineColor(27, 42, 65);
    }

    WA.room.onLeaveLayer("start").subscribe(() => {
        WA.ui.modal.closeModal();
    });

    // Open & Close popupPrivateOffice
    WA.room.area.onEnter("popupPrivateOffice_area").subscribe(() => {
        if(popupPrivateOffice) return;
        popupPrivateOffice = WA.ui.openPopup("popupPrivateOffice", "Our private office serves as a restricted zone, exclusively accessible to our team members.", [{
            label: "Close",
            className: "primary",
            callback: () => {
                popupPrivateOffice?.close();
                popupPrivateOffice = null;
            }
        }]);
    });
    WA.room.area.onLeave("popupPrivateOffice_area").subscribe(() => {
        popupPrivateOffice?.close();
        popupPrivateOffice = null;
    })

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
