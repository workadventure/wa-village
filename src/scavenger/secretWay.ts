/// <reference types="@workadventure/iframe-api-typings" />

console.info('"Secret way" script started successfully')

interface TileDescriptor {
    x: number;
    y: number;
    tile: number | string | null;
    layer: string;
}

interface CreateAreaEvent {
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

const secretAreas = [
    "secretArea1",
    "secretArea2",
    "secretArea3",
    "secretArea4",
    "secretArea5",
    "secretArea6",
    "secretArea7",
    "secretArea8",
    "secretArea9",
    "secretArea10",
    "secretArea11",
    "secretArea12",
    "secretArea13",
    "secretArea14",
    "secretArea15",
    "secretArea16",
    "secretArea17",
    "secretArea18",
    "secretArea19",
    "secretArea20",
    "secretArea21",
    "secretArea22",
    "secretArea23",
    "secretArea24",
];

const secretTiles = [
    { x: 52, y: 27},
    { x: 53, y: 27},
    { x: 54, y: 27},
    { x: 54, y: 28},
    { x: 54, y: 29},
    { x: 55, y: 29},
    { x: 56, y: 29},
    { x: 56, y: 28},
    { x: 56, y: 27},
    { x: 56, y: 26},
    { x: 56, y: 25},
    { x: 57, y: 25},
    { x: 58, y: 25},
    { x: 58, y: 26},
    { x: 58, y: 27},
    { x: 59, y: 27},
    { x: 60, y: 27},
    { x: 60, y: 26},
    { x: 60, y: 25},
    { x: 60, y: 24},
    { x: 60, y: 23},
    { x: 59, y: 23},
    { x: 58, y: 23},
    { x: 57, y: 23},
];

const signRightTile = "sign-right"
const woodenTileTile = "wooden-tile"

// Waiting for the API to be ready
WA.onInit().then(() => {
    for (let i = 0; i < secretTiles.length; i++) {
        // create area
        let secretArea: CreateAreaEvent = {
            name: secretAreas[i],
            x: secretTiles[i].x * 32,
            y: secretTiles[i].y * 32,
            width: 32,
            height: 32
        }
        WA.room.area.create(secretArea)

        let tilesToHide: TileDescriptor[] = [{
            x: secretTiles[i].x,
            y: secretTiles[i].y,
            tile: null,
            layer: "ScavengerHunt"
        }]
        let tilesToShow: TileDescriptor[]
        
        // hide tile
        WA.room.setTiles(tilesToHide)

        // show tile when woka is walking on it
        WA.room.area.onEnter(secretAreas[i]).subscribe(() => {
            // if woka just discovered the secret path, show a sign as clue
            // if not, show a wooden tile
            tilesToShow = [{
                x: secretTiles[i].x,
                y: secretTiles[i].y,
                tile: i === 0 ? signRightTile : woodenTileTile,
                layer: "ScavengerHunt"
            }]
            WA.room.setTiles(tilesToShow)
        })
        // hide tile after 100ms when woka has leaved
        WA.room.area.onLeave(secretAreas[i]).subscribe(() => {
            setTimeout(() => {
                WA.room.setTiles(tilesToHide)
            }, 100);
        })
    }
});

export {};
