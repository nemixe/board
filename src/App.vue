<template>
    <index />
</template>
<script>
import Index from './pages/Index.vue'

export default {
    components: {
      Index
    },
    updated(){
        this.$store.dispatch('updated')
    }
}
</script>
