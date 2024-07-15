<template>    
    <form>

        <div v-if="error" class="error__container"> 
            <span >Por favor llene todos los campos</span>            
        </div>

        <div v-if="props.id" class="containers date__container">
            <label>Fecha</label>
            <input type="text" disabled class="date" v-model="props.created" >
        </div>

        <div class="containers">
            <label>Titulo</label>
            <input v-model="title" type="text" >
        </div>
        
        <div  class="containers">
            <label>Descripcion</label>
            <textarea v-model="content"></textarea>
        </div>

        <div class="btn__actions">            
            
            <button v-if="props.id">Actualiar</button>
            <button v-else @click.prevent="handleAgregarNota">Agregar</button>

            <button @click.prevent="handleCerrar">Cancelar</button>
        </div>
        

    </form>    
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { addNewNote } from '@/utils/fechingdata';
import { onMounted, ref, type Ref } from 'vue';


let title : Ref<string> = ref('')
let content : Ref<string> = ref('')
let store = useUserStore()
let token = store.token
let error : Ref<boolean> = ref(false)


let props  =  defineProps<{
    id?:number,
    title?:string,
    content?:string,
    created?:string
}>()

onMounted(() => {
    if (props.id) {
        title.value = props.title!
        content.value = props.content!
    }
})

const emits = defineEmits(['refreshNotas','cerrar'])

const handleAgregarNota = async () => {

    if(title.value == '' || content.value == ''){
        error.value=true
    }else{
        error.value=false
        let status  = await addNewNote(title.value,content.value,token!)    

        if(status){    
            emits('refreshNotas',true)
        }
    }
}

const handleCerrar = () => {
    emits('cerrar')
}

</script>

<style scoped>
form{
    border: 1px solid black;
    border-radius: 5px;
    margin: 10px;    
    padding: 10px;
    
}

.containers{
    display: flex;
    flex-direction: column;
    margin-bottom: 10px
}

.date__container{
    align-items: flex-end;
}

.date{
    width: 50%;
}

input{
    outline: none;
}

textarea{
    outline: none;
    height: 100px;
}

.btn__actions{
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 5px;
}

button{
    color: white;
    background-color: #111827;
    font-size: 12px;
    padding: 7px 15px;
    border-radius:5px;
}


.error__container{
    text-align: center
}

</style>