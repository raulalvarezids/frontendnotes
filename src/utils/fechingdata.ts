import type { INote } from "@/interfaces/INote"
import axios from "axios"

const url = import.meta.env.VITE_HOST


export const getAllNotes = async (token : string) : Promise<INote[] | boolean>=> {
    const headers =  {
        headers : {
        'Authorization': `Token ${token}`   
        }
    }    

    let status  = false
    let notas : INote[] = []


    await axios.get(url+'/notes/',headers)
    .then(response => {                   
    notas = response.data
    })
    .catch((error) => { 
        console.log(error)                               
        status = true
    })

    if(!status)
        return notas

    return status




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
    
    await axios.post(url+'/notes/',note,headers)
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


export const deleteNote = async (id : number,token:string) : Promise<boolean>  => {

    const headers =  {
        headers : {
        'Authorization': `Token ${token}`   
        }
    }


    let status = false
    
    await axios.delete(url+'/notes/'+id+'/',headers)
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



export const updateNote = async (title:string,content:string,id:number,token:string): Promise<boolean> => {

    console.log(title,' ', content,' ', id,' ', ' ',token)
    
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
    
    await axios.patch(url+'/notes/'+id+'/',note,headers)
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