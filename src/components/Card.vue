<template>
    <a class="button is-white width-max border-gray" style="justify-content: left;text-align: left">
        <div class="columns width-max show-hover">
            <div class="column is-11 text-gray" @click="showCardDetail(cardIndex, card)">
                {{ card.name }}
            </div>
            <div class="column is-1 text-lightgray" @click="removeCard(listIndex, cardIndex)">
                <span>
                    X
                </span>
            </div>
            <div class="column is-1 text-lightgray" @click="removeCard(listIndex, cardIndex)">
                <i class="fas fa-ellipsis-v"></i>
            </div>
        </div>
    </a>
</template>

<script>
export default {
    props: {
        card: {
            type: Object,
            required: true
        },
        cardIndex: {
            type: Number,
            required: true
        },
        listIndex: {
            type: Number,
            required: true
        }
    },
    methods: {
        showCardDetail: function(index, val) {
            let payload = {
                ...val,
                curTextToDoInput: ''
            }
            this.$store.dispatch('showCardDetail', payload)
        },
        removeCard: function(listIndex, cardIndex) {
            this.$store.dispatch('removeCard', { listIndex, cardIndex })
        }
    },
    updated(){
        this.$store.dispatch('updated')
    }
}
</script>

<style lang="stylus" scoped>
    .border-gray
        border 1px solid #ebebeb
    .text-gray
        color #707070
    .text-lightgray
        color #d6d6d6
</style>
