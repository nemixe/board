<template>
    <div id="app" class="scroll-container">
        <card-detail />
        <board />
    </div>
</template>
<script>
import CardDetail from '../components/CardDetail.vue'
import Board from '../components/Board.vue'

export default {
    components: {
      CardDetail,
      Board
    },
    updated(){
        this.$store.dispatch('updated')
    }
}
</script>
