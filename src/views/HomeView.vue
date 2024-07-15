<template>
    <NavBar></NavBar>

    <div class="title__container">
        <h1 class="title">Notas: {{ store.username }}</h1>        
    </div>
    
    
    <div class="tasks__container">

        <div class="btn__addnotas">           
            <!-- <RouterLink :to="{ name: 'notas' }"  class="notas">Agregar nota</RouterLink>             -->
            <button @click="handleShow" class="notas"  >Agregar Nota</button>
        </div>        

        <div v-if="show">
            <!-- <AddOrEditNote :id=notaEditar?.id :title=notaEditar?.title :content=notaEditar?.content :created=notaEditar?.created>
            </AddOrEditNote> -->


            <AddOrEditNote @refreshNotas="handleRefreshNotes" @cerrar='handleShow'></AddOrEditNote>


        </div>

        
        
        
        <TransitionGroup name="lista" tag="ul" >          
            <Notas v-for="note in notas" :key="note.id"  :id="note.id" :content="note.content" :title="note.title" :created="note.created"></Notas>
             <!-- <task  v-if="store.token==null" v-for="(x) in localTasks" :text=x.descripcion  :status="x.status"  :id="x._id" :key="x._id" @handledeleted="handleDeleteLocal" ></task>
             <task  v-else v-for="(x) in userTask" :text=x.descripcion  :status=x.status  :id="x._id" :key="x._id+x.descripcion" @deleting="deleteTaskHome" ></task> -->
        </TransitionGroup>        

        <h1 v-if="notas.length <= 0" class="without">Sin notas</h1>


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

let notaEditar : Ref<INote>  | Ref<undefined> = ref(
    // {
    //     id:1,
    //     user:1,
    //     title:'test unitario',
    //     content:'deno de hacer el test unitario',
    //     created:'hoy',
    //     updated:"nunca"
    // }
)    



const handleShow = () => {    
    show.value = !show.value
}

const handleEditarNota = (note : INote) => {
    notaEditar.value = note
}


const handleRefreshNotes = async  () => {
    
    handleShow()
    await handleGetAllNotes()
}

const handleGetAllNotes = async () => {
    const notasGet = await getAllNotes(store.token!)

    if(typeof notasGet != 'boolean'){
        notas.value=notasGet
    }else{
        console.log('error')
    }
}



onMounted( async () => {     
    await handleGetAllNotes()
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
    font-size: 20px;          
}
.tasks__container{
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

}

</style>