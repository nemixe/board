<template>
    <span>
        <div @click="toggleCheck" class="tile is-child notification columns hover-list mtb-4 item-border-left">
            <div class="column is-1">
                <input class="checkbox" type="checkbox" :checked="data.isDone" />
            </div>
            <div class="column is-10">
                <div class="title is-5 has-text-grey" :class="{strikethrough: data.isDone}">
                    {{data.text}}
                </div>
            </div>
        </div>
        <div class="column is-pulled-right hover-list position-absolute checklist-close" @click="$emit('remove')">
            <span class="icon is-pulled-right">
                <i class="fas fa-times"></i>
            </span>
        </div>
    </span>
</template>


<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        toggleCheck: function() {
            this.data.isDone = !this.data.isDone
            this.$emit('updated')
        }
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

