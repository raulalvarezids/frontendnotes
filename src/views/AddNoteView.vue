<template>
  <NavBar></NavBar>
  <h1>Estas en las notas</h1>
</template>

<script lang="ts" setup>

import type { INote } from '@/interfaces/INote';

import NavBar from '@/components/NavBar.vue';

import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';

let getNota : Ref<INote> | Ref<undefined> = ref()

onMounted(() => {
  const router = useRoute()
  let id = router.params.id

  if(id){
    console.log(id)
  }else{
    console.log('agregar nueva nota')
  }
  
})


</script>

<style scoped>

</style>