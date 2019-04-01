<template>
    <span>
        <div v-for="(checkItem, indexCheckItem) in checklistarray" :key="indexCheckItem" style="position: relative">
            <checklist-item :checkItem="checkItem" :indexCheckItem="indexCheckItem" />
        </div>
    </span>
</template>


<script>
import ChecklistItem from './ChecklistItem.vue'
export default {
    components: {
        ChecklistItem
    },
    updated(){
        this.$store.dispatch('updated')
    },
    props: {
        checklistarray: {
            required: true
        }
    },
}
</script>

<style lang="stylus" scoped>
    .item-border-left
        border-left 2px solid darkgrey
    .checklist-close
        top 20%
        right 20px
        border-radius 50%
</style>

