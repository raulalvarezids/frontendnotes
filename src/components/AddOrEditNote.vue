<template>    
    <form>
        <div v-if="succes" class="error__container">
            <span class="crrect__edit">
                actualizado correctamente
            </span>
        </div>

        <div v-if="error" class="error__container"> 
            <span  class="error__span">Por favor llene todos los campos</span>            
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
            
            <button v-if="props.id" @click.prevent="handleActualizar" :disabled="handleChanged">Actualiar</button>
            <button v-else @click.prevent="handleAgregarNota">Agregar</button>

            <button @click.prevent="handleCerrar">Cancelar</button>
        </div>
        

    </form>    
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { addNewNote } from '@/utils/fechingdata';
import { computed, ref, watch, type Ref } from 'vue';
import { updateNote } from '@/utils/fechingdata';

let title : Ref<string> = ref('')
let content : Ref<string> = ref('')
let store = useUserStore()
let token = store.token
let error : Ref<boolean> = ref(false)
let succes : Ref<Boolean> = ref(false)

let props  =  defineProps<{
    id?:number,
    title?:string,
    content?:string,
    created?:string
}>()


let oldTitle = ''
let oldContent = ''


watch(props, (newProps) => {
    if (newProps.id) {
        title.value = newProps.title || '';
        content.value = newProps.content || '';
        oldTitle  = newProps.title || '';
        oldContent = newProps.content || '';
    } else {
        title.value = '';
        content.value = '';
    }
}, { immediate: true });


const emits = defineEmits(['refreshNotas','cerrar','notEditar'])

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
    if(props.id){
        emits('notEditar')
    }
    emits('cerrar')
}


const handleActualizar = async () => {

    const status = await updateNote(title.value,content.value,props.id!,token!)
    if(status){
       succes.value=true
       emits('refreshNotas',false)
       setTimeout(() => {
            succes.value=false           
       },1500)
    }
}

const handleChanged = computed(() => {

    return oldTitle == title.value && oldContent == content.value;
})

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
    width: 70%;
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

button:disabled{
    color: grey;
}

.error__container{
    text-align: center
}


.crrect__edit{
    color: green;
}
.error__span{
    color:red;
}

</style>