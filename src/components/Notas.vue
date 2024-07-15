<template>
 
 <div>

    <h4 @click="handleEditarNote">{{ props.title }}</h4>
    <!-- <v-icon name="md-deleteforever" color="red"  class="icon" animation="wrench" hover="true"/> -->
     <v-icon name="md-deleteforever" color="red"  class="icon" @click="handleDelete" />
    
 </div>

</template>

<script lang="ts" setup>
import { deleteNote } from '@/utils/fechingdata';
import { useUserStore } from '@/stores/user';
import type { INote } from '@/interfaces/INote';

let props = defineProps<{
    id: number,    
    title:string,
    content: string,
    created: string,    
}>()

const store = useUserStore()

let emits = defineEmits(['refreshNotas','editarNote'])

const handleDelete = async () => {
    const status = await deleteNote(props.id,store.token!)
    if(status){
        emits('refreshNotas',false)
    }else{
        alert('please try later')
    }
}

const handleEditarNote = () => {
    const nota : INote = {
        id:props.id,
        title:props.title,
        content:props.content,
        created:props.created
    }

    emits('editarNote',nota)
}



</script>

<style scoped>


div{
    display: flex;
    background-color: #F3F4F6;
    border: 1px solid rgba(0, 0, 0, 0.151);
    border-radius: 5px;    
    align-items: center;
    padding: 5px;    
    margin-block: 10px;
}

.icon{
    cursor: pointer;
}


h4{
    flex-grow: 1;
    margin-left: 10px;
    cursor: pointer;
}


@media(min-width:1100px) {
    .icon{
        cursor: pointer;        
    }

    h4{
        font-size: 20px
    }
    

}

</style>