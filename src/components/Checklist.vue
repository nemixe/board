<template>
    <span>
        <div 
            v-for="(checkItem, checkItemIndex) in checkList" 
            :key="checkItemIndex" 
            style="position: relative"
        >
            <check-item 
                :checkItem="checkItem" 
                :checkItemIndex="checkItemIndex" 
            />
        </div>
    </span>
</template>


<script>
import CheckItem from './CheckItem.vue'

export default {
    components: {
        CheckItem
    },
    props: {
        checkList: {
            required: true
        }
    },
    updated(){
        this.$store.dispatch('updated')
    }
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

