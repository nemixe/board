<template>
    <a class="button is-white width-max border-gray" style="justify-content: left;text-align: left">
        <div class="columns width-max">
            <div class="column is-11" @click="showCardDetail(cardIndex, card)">
                {{ card.name }}
            </div>
            <div class="column position-relative" @click="removeCard(listIndex, cardIndex)">
                <span class="icon is-pulled-right" style="color: gray">
                    <i class="fas fa-times"></i>
                </span>
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
        border: 1px solid #ebebeb;
</style>
