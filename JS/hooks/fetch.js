
export const fetchingBird =async()=> {
    try{
        await fetch('./../../assets/data/Bird_Spritesheet.json')
        .then(result=> {
            console.log("fetch JSON:",result);
            return result
        })
    }
    catch{ err => {
        console.log("Error fetch JSON:",err)
    }}

}

