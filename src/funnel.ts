/// <reference types="@workadventure/iframe-api-typings" />

console.log('Funnel script loaded');

const openModalFunnel = () => {
    WA.ui.modal.openModal({
        title: "Funnel",
        src: 'https://admin.workadventu.re/funnel/connection?embed=true',
        allow: "fullscreen; clipboard-read; clipboard-write",
        allowApi: true,
        position: "center",
    });
}

// Waiting for the API to be ready
WA.onInit().then(() => {
    // Enter in the funnel area
    WA.room.area.onEnter("funnel").subscribe(() => {
        WA.ui.modal.closeModal();
        openModalFunnel();
    });

    WA.room.area.onLeave("funnel").subscribe(() => {
        WA.ui.modal.closeModal();
    });
});

export {};
