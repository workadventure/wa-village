/// <reference types="@workadventure/iframe-api-typings" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra"

import { Popup } from "@workadventure/iframe-api-typings"
import { CLUE_1, CLUE_2, CLUE_3, CLUE_4, CLUE_5, CLUE_TIMEOUT } from './constants'

console.info('"Secret sentence" script started successfully')

let scavengerObjects = new Set([
    "scavengerObject1",
    "scavengerObject2",
    "scavengerObject3",
    "scavengerObject4",
    "scavengerObject5",
]);

interface ScavengerProgress {
    scavengerObject1: boolean,
    scavengerObject2: boolean,
    scavengerObject3: boolean,
    scavengerObject4: boolean,
    scavengerObject5: boolean,
}

const defaultScavengerProgress: ScavengerProgress = {
    scavengerObject1: false,
    scavengerObject2: false,
    scavengerObject3: false,
    scavengerObject4: false,
    scavengerObject5: false
}
let formPopup: Popup|undefined = undefined
let blockExit1Popup: Popup|undefined = undefined
let blockExit2Popup: Popup|undefined = undefined
let timeoutClue: NodeJS.Timeout|undefined
let timeoutClueRegularly: NodeJS.Timeout|undefined
let lastClue = "noclue"
let isOpenSecretSentenceWebsite = false

// Waiting for the API to be ready
WA.onInit().then(() => {
    // force user to read the instructions
    WA.controls.disablePlayerControls()

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        const mapUrl = WA.room.mapURL
    const root = mapUrl.substring(0, mapUrl.lastIndexOf("/"))

    // If the game is completed, just configure the popups, hidden tiles...
    if (WA.player.state.scavengerCompleted === true) {
        configureScavenger(root)
    } else if (
        // If at least one object has been found, don't show instructions
        WA.player.state.scavengerProgress &&
        ((WA.player.state.scavengerProgress as ScavengerProgress).scavengerObject1 ||
        (WA.player.state.scavengerProgress as ScavengerProgress).scavengerObject2 ||
        (WA.player.state.scavengerProgress as ScavengerProgress).scavengerObject3 ||
        (WA.player.state.scavengerProgress as ScavengerProgress).scavengerObject4 ||
        (WA.player.state.scavengerProgress as ScavengerProgress).scavengerObject5)) {
        configureScavenger(root)
        getClueRegularly()
    } else {
        // If no object has been found, show instructions and let's go button
        // open scavenger instructions
        WA.ui.modal.openModal({
            title: "Scavenger hunt instructions",
            src: root + "/scavenger/instructions.html",
            allowApi: true,
            allow: "microphone; camera",
            position: "center",
        }, () => {
            configureScavenger(root)
            WA.ui.modal.closeModal()
            getClueRegularly()
            WA.ui.actionBar.removeButton("start")
        })

        // add start button
        WA.ui.actionBar.addButton({
            id: "start",
            label: "Let's go!",
            callback: () => {
                configureScavenger(root)
                WA.ui.modal.closeModal()
                getClueRegularly()
                WA.ui.actionBar.removeButton("start")
            }
        })
    }
    }).catch(e => console.error(e));
})

// function to init the game
function configureScavenger(root: string) {
    WA.controls.restorePlayerControls()

    // add secret sentence button
    WA.ui.actionBar.addButton({
        id: "secrect-sentence",
        type: "action",
        imageSrc: root + "/scavenger/images/key-white.svg",
        toolTip: "Review your progress",
        callback: () => {
            if(isOpenSecretSentenceWebsite) {
                WA.ui.modal.closeModal()
                isOpenSecretSentenceWebsite = false
                return
            }

            const objectsFound = Object.keys(WA.player.state.scavengerProgress as ScavengerProgress).filter((object) => {
                // @ts-ignore
                return (WA.player.state.scavengerProgress as ScavengerProgress)[object] === true
            })
            WA.ui.modal.openModal({
                title: "Your progress",
                src: root + `/scavenger/progress.html?lastClue=${lastClue}&scavengerObjects=${objectsFound.join(",")}`,
                allowApi: true,
                allow: "microphone; camera",
                position: "center",
            }, () => {
                WA.ui.modal.closeModal();
                isOpenSecretSentenceWebsite = false
            })
            isOpenSecretSentenceWebsite = true
        }
    })

    // init player state
    if(!WA.player.state.hasVariable("scavengerProgress")) {
        WA.player.state.scavengerProgress = defaultScavengerProgress
        WA.player.state.scavengerCompleted = false
    }

    // init user interaction
    for(const object of [...scavengerObjects.keys()]) {
        WA.room.area.onEnter(object).subscribe(() => {
            // @ts-ignore
            if((WA.player.state.scavengerProgress as ScavengerProgress)[object] === true) return
            // @ts-ignore
            (WA.player.state.scavengerProgress as ScavengerProgress)[object] = true
            WA.player.state.scavengerProgress = WA.player.state.scavengerProgress
            const objectsFound = Object.keys(WA.player.state.scavengerProgress as ScavengerProgress).filter((object) => {
                // @ts-ignore
                return (WA.player.state.scavengerProgress as ScavengerProgress)[object] === true
            })

            WA.ui.modal.openModal({
                title: "Congarts, you found a new time object 🎉",
                src: root + `/scavenger/congratulations.html?current=${object}&scavengerObjects=${objectsFound.join(",")}`,
                allowApi: true,
                allow: "microphone; camera",
                position: "center",
            }, () => {
                getClueRegularly()
                WA.ui.modal.closeModal()
            })
            lastClue = "noclue"
            stopClueRegularly()
            WA.ui.banner.closeBanner()
        })

        WA.room.area.onLeave(object).subscribe(() => WA.ui.modal.closeModal())
    }

    WA.room.area.onEnter('form').subscribe(() => {
        if(
            (WA.player.state.scavengerProgress as ScavengerProgress).scavengerObject1 &&
            (WA.player.state.scavengerProgress as ScavengerProgress).scavengerObject2 &&
            (WA.player.state.scavengerProgress as ScavengerProgress).scavengerObject3 &&
            (WA.player.state.scavengerProgress as ScavengerProgress).scavengerObject4 &&
            (WA.player.state.scavengerProgress as ScavengerProgress).scavengerObject5) {
            stopClueRegularly()
            formPopup = WA.ui.openPopup("formPopup", "🎉🎉 Hurray! You've found all the time objects! Now you know our whole story 🎉🎉", [{
                    label: "Claim your prize",
                    className: "primary",
                    callback: (popup => {
                        // go to form
                        WA.ui.modal.openModal({
                            title: "Redeem form",
                            src: "https://docs.google.com/forms/d/e/1FAIpQLSd9L_rP8MspsfOTV6fH882BYbYbArWUuZP1Cf-QN0WUSJVu3g/viewform",
                            allowApi: true,
                            allow: "microphone; camera",
                            position: "center",
                        }, () => {
                            WA.ui.modal.closeModal()
                        })
                        popup.close()
                        formPopup = undefined
                    })
                }
            ])
            WA.player.state.scavengerCompleted = true
        } else {
            formPopup = WA.ui.openPopup("formPopup", "You are missing objects to access the form 😭\n\rAs we are very nice, a clue will appear 💪",
            [
                {
                    label: "Continue",
                    className: "primary",
                    callback: (popup => {
                        popup.close()
                        formPopup = undefined
                    })
                }
            ])

            if(timeoutClue) {
                clearTimeout(timeoutClue)
            }

            timeoutClue = setTimeout(() => {
                WA.ui.banner.openBanner({
                    id: "clue",
                    bgColor: "#1c1c29",
                    textColor: "#ffffff",
                    text: `Your new clue: ${getClue(true)}`,
                    closable: true,
                    timeToClose: 120000,
                })
            }, 1000)
        }
    })

    WA.room.area.onLeave('form').subscribe(() => {
        if(formPopup !== undefined){
            formPopup.close();
            formPopup = undefined
        }
        WA.ui.modal.closeModal()
    })

    WA.room.area.onEnter('blockExit1').subscribe(() => {
        blockExit1Popup = WA.ui.openPopup("blockExit1Popup", "Nothing to find here... expect relaxation spots.", [
            {
                label: "Continue",
                className: "primary",
                callback: (popup => {
                    popup.close();
                    blockExit1Popup = undefined;
                })
            }
        ])
    })
    WA.room.area.onLeave('blockExit1').subscribe(() => {
        blockExit1Popup?.close()
    })

    WA.room.area.onEnter('blockExit2').subscribe(() => {
        blockExit2Popup = WA.ui.openPopup("blockExit2Popup", "Hum... looks like this place is empty.", [
            {
                label: "Continue",
                className: "primary",
                callback: (popup => {
                    popup.close()
                    blockExit2Popup = undefined
                })
            }
        ])
    })
    WA.room.area.onLeave('blockExit2').subscribe(() => {
        blockExit2Popup?.close()
    })
}

// get an clue every minute
function getClueRegularly() {
    if(timeoutClueRegularly) {
        clearTimeout(timeoutClueRegularly)
    }
    timeoutClueRegularly = setTimeout(() => {
        const clue = getClue()
        if(clue != undefined){
            WA.ui.banner.openBanner({
                id: "clue",
                bgColor: "#1c1c29",
                textColor: "#ffffff",
                text: `Your clue: ${clue}`,
                closable: true,
                timeToClose: 120000,
            })
        }
        return getClueRegularly()
    }, CLUE_TIMEOUT)
}
function stopClueRegularly() {
    if(timeoutClueRegularly) {
        clearTimeout(timeoutClueRegularly)
    }
}

// Clues setup
function getClue(force = false): string|undefined{
    const progressState = WA.player.state.scavengerProgress as ScavengerProgress

    if(
        progressState.scavengerObject1 === false &&
        (lastClue != "scavengerObject1" || force)
    ) {
        lastClue = "scavengerObject1";
        return CLUE_1
    }

    if(
        progressState.scavengerObject1 &&
        progressState.scavengerObject2 === false &&
        (lastClue != "scavengerObject2" || force)
    ) {
        lastClue = "scavengerObject2";
        return CLUE_2
    }

    if(
        progressState.scavengerObject1 &&
        progressState.scavengerObject2 &&
        progressState.scavengerObject3 === false &&
        (lastClue != "scavengerObject3" || force)
    ) {
        lastClue = "scavengerObject3";
        return CLUE_3
    }

    if(
        progressState.scavengerObject1 &&
        progressState.scavengerObject2 &&
        progressState.scavengerObject3 &&
        progressState.scavengerObject4 === false &&
        (lastClue != "scavengerObject4" || force)
    ) {
        lastClue = "scavengerObject4";
        return CLUE_4
    }

    if(
        progressState.scavengerObject1 &&
        progressState.scavengerObject2 &&
        progressState.scavengerObject3 &&
        progressState.scavengerObject4 &&
        progressState.scavengerObject5 === false &&
        (lastClue != "scavengerObject5" || force)
    ) {
        lastClue = "scavengerObject5";
        return CLUE_5
    }

    return
}

export {}
