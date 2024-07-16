<template>
    <NavBar></NavBar>

    <div class="title__container">
        <h1 class="title">Notas: {{ store.username }}</h1>        
    </div>
    
    
    <div class="notes__container">

        <div class="btn__addnotas">           
            <button @click="handleShow" class="notas" @notEditar="" >Agregar Nota</button>
        </div>        

        <div v-if="show">
            <AddOrEditNote :id=notaEditar?.id :title=notaEditar?.title :content=notaEditar?.content :created=notaEditar?.created @refreshNotas="handleRefreshNotes" @cerrar='handleShow' @notEditar="setNoteEditar">
            </AddOrEditNote>

        </div>

        
        
        
        <TransitionGroup name="lista" tag="ul" >          
            <Notas v-for="note in notas" :key="note.id"  :id="note.id" :content="note.content" :title="note.title" :created="note.created"  @refreshNotas="handleRefreshNotes" @editarNote = 'handleEditarNota'></Notas>                      
        </TransitionGroup>        

        <h1 v-if="messageShow" class="without">Sin notas</h1>

    </div>

</template>

<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue';
import { onMounted, ref, type Ref } from 'vue';
import { useUserStore } from '@/stores/user';
import type { INote } from '@/interfaces/INote';
import { computed } from 'vue'; 
import AddOrEditNote from '@/components/AddOrEditNote.vue';
import { getAllNotes } from '@/utils/fechingdata';
import Notas from '@/components/Notas.vue';

let store = useUserStore()


let notas : Ref<INote[]> = ref([])
let show : Ref<boolean> = ref(false)
let messageShow : Ref<boolean> = ref(false)
let notaEditar : Ref<INote>  | Ref<undefined> = ref()    



const handleShow = () => {        
    
    if( notaEditar.value == undefined){
        show.value = !show.value
    }

    notaEditar.value=undefined        
}

const handleEditarNota = (note : INote) => {
    notaEditar.value = note
    show.value = true
}

const setNoteEditar = () => {    
    notaEditar.value = undefined
}


const handleRefreshNotes = async  (shows:boolean) => {    
    if(shows) {
        handleShow()
    }
    
    await handleGetAllNotes()
     handleshowmessage()
}

const handleGetAllNotes = async () => {    
    const notasGet = await getAllNotes(store.token!)
    
    if(typeof notasGet != 'boolean'){
        notas.value=notasGet
    }else{
        console.log('error')
    }
}

const handleshowmessage =  () => {
    if (notas.value.length <= 0){
        messageShow.value=true
    }else{
        messageShow.value=false
    }        
}

onMounted( async () => {     
    await handleGetAllNotes()
    handleshowmessage()
})



</script>



<style scoped>

.title__container{
 display: flex;
 align-items: center;
 width: 85%; 
 margin: auto; 
 margin-top: 10px;
}
 
.title{ 
    font-size: 40px;          
}
.notes__container{
    width: 85%;
    margin: 0 auto;
}

.without{
    text-align: center;
    font-size: 20px;      
}

.btn__addnotas{
    display: flex;
    justify-content: flex-end;
}

.notas{
    /* text-decoration: none; */
    color: white;
    background-color: #111827;
    font-size: 12px;
    padding: 7px 15px;
    border-radius:5px;
    cursor: pointer;

}

.lista-enter-active, .lista-leave-active {
    transition: all 0.5s ease;
}

.lista-enter-from, .lista-leave-to {
    opacity: 0;
    transform: translateX(30px);
}


@media(min-width:1100px) {
    .tittle{
        width: 65%;    
        font-size: 50px
    }

    .notes__container{
        width: 65%;        
    }
    .without{        
        font-size: 28px;    
    }

    .notas{    
        font-size: 15px;    
    }

}




</style>