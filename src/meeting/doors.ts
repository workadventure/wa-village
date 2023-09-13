/// <reference types="@workadventure/iframe-api-typings" />

console.log('Doors script loaded');

// Waiting for the API to be ready
WA.onInit().then(() => {
    // When user enter ine zone `zone_office_meeting`, display layer `door_office_meeting_closed`
    WA.room.area.onEnter('zone_office_meeting').subscribe(() => {
        WA.room.hideLayer('doors/door_office_meeting_closed');
        WA.room.showLayer('doors/door_office_meeting_opened');
    });

    WA.room.area.onLeave('zone_office_meeting').subscribe(() => {
        WA.room.showLayer('doors/door_office_meeting_closed');
        WA.room.hideLayer('doors/door_office_meeting_opened');
    });

});

export {};