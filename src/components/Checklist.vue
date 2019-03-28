<template>
    <span>
        <div v-for="(data, index) in checklistarray" v-bind:key="index" style="position: relative">
            <checklist-item :data="data" @remove="$emit('remove', index)" @updated="$emit('updated')" />
        </div>
    </span>
</template>


<script>
import ChecklistItem from './ChecklistItem.vue'
export default {
    components: {
        ChecklistItem
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

