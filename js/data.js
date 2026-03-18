export let gameData = {
    coins:0,
    level:1,
    bikes:["bike1"],
    selectedBike:"bike1",
    sound:true
};

export function saveGame(){
    try{
        localStorage.setItem("bikeGameSave", JSON.stringify(gameData));
    }catch(e){
        console.error("Save failed",e);
    }
}

export function loadGame(){
    try{
        let s = localStorage.getItem("bikeGameSave");
        if(s) Object.assign(gameData, JSON.parse(s));
    }catch(e){console.error("Load failed",e);}
}
