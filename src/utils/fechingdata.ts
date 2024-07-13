import axios from "axios"

const url = import.meta.env.VITE_HOST


export const getNotaById = async (id : number,token : string) => {
    
}

export const addNewNote = async (title:string,content:string,token:string)  : Promise<boolean> => {

    const headers =  {
        headers : {
        'Authorization': `Token ${token}`   
        }
    }

    const note = {
        title,
        content
    }   

    let status = false
    
    await axios.post(url+'notes/',note,headers)
    .then((response) => {
        status=true
    }        
    )
    .catch(error =>  {        
        console.log(error)    
        status=false

    })

    return status
}