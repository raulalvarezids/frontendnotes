<template>
 
 <div>

    <h1>{{ props.title }}</h1>
    <v-icon name="md-deleteforever" color="red"  class="icon" animation="wrench" hover="true"/>

    
 </div>

</template>

<script lang="ts" setup>

let props = defineProps({
    id: Number,
    user: Number,
    title:String,
    content: String,
    created: String,
    updated: String
})

</script>

<style scoped>

</style>