/// <reference types="@workadventure/iframe-api-typings" />

import { CLUE_1, CLUE_2, CLUE_3, CLUE_4, CLUE_5, SENTENCE_1, SENTENCE_2, SENTENCE_3, SENTENCE_4, SENTENCE_5 } from '../src/scavenger/constants'

console.info('"Progress" script started successfully')

// Waiting for the API to be ready
WA.onInit().then(() => {
    const sentence = {
        scavengerObject1: SENTENCE_1,
        scavengerObject2: SENTENCE_2,
        scavengerObject3: SENTENCE_3,
        scavengerObject4: SENTENCE_4,
        scavengerObject5: SENTENCE_5,
    }

    const clues = {
        scavengerObject1: CLUE_1,
        scavengerObject2: CLUE_2,
        scavengerObject3: CLUE_3,
        scavengerObject4: CLUE_4,
        scavengerObject5: CLUE_5,
    }

    const url = new URL(window.location.toString())
    const objectsFound = url.searchParams.get("scavengerObjects")

    const lastClue = url.searchParams.get("lastClue")
    const lastClueElement = document.getElementById("lastClue")
    const clueTitleElement = document.getElementById("clueTitle")
    const instructionsElement = document.getElementById("instructions")

    const mapUrl = WA.room.mapURL
    const root = mapUrl.substring(0, mapUrl.lastIndexOf("/"))
    
    // show all objects found by user
    for(const obj of Object.keys(sentence)) {
        if(objectsFound && objectsFound.indexOf(obj) != -1) {
            const objElement = document.getElementById(obj)
            const badgeElement = document.getElementById(`badge-${obj}`)
            
            if (objElement && badgeElement) {
                objElement.innerHTML = sentence[obj]
                badgeElement.style.display = "block"
            }
        }
    }

    // show the last clue
    if(lastClue && lastClue !== "noclue" && lastClueElement && clueTitleElement) {
        lastClueElement.innerHTML = clues[lastClue]
        clueTitleElement.style.display = "block"
        
    }

    if (instructionsElement) {
        instructionsElement.onclick = () => {
            window.location.href = root + "/scavenger/instructions.html"
        }
    }
})

export {}