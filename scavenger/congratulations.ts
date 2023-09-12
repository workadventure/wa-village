/// <reference types="@workadventure/iframe-api-typings" />

import { SENTENCE_1, SENTENCE_2, SENTENCE_3, SENTENCE_4, SENTENCE_5 } from '../src/scavenger/constants'

console.info('"Congratulations" script started successfully')

// Waiting for the API to be ready
WA.onInit().then(() => {
    const sentence = {
        scavengerObject1: SENTENCE_1,
        scavengerObject2: SENTENCE_2,
        scavengerObject3: SENTENCE_3,
        scavengerObject4: SENTENCE_4,
        scavengerObject5: SENTENCE_5,
    }
    
    const url = new URL(window.location.toString())
    const objectsFound = url.searchParams.get("scavengerObjects")

    const currentObjectFound = url.searchParams.get("current")
    const lastChanceElement = document.getElementById("lastSentence")
    const badgeFoundElement = document.getElementById(`badgefound-${currentObjectFound}`)

    // show last object find by user
    if (lastChanceElement && currentObjectFound && badgeFoundElement) {
        lastChanceElement.innerHTML = sentence[currentObjectFound]??''
        badgeFoundElement.style.display = "inline-block"
    }
    
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
})

export {}