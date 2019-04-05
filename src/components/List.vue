<template>
    <span>
        <div class="content width-max p-0 m-0">
            <div class="columns">
                <div class="column is-10">
                    <div class="title is-5 width-max mb-4">
                        {{list.name}}
                    </div>
                </div>
                <div class="column">
                    <span class="icon is-pulled-right cursor-pointer" @click="removeList(listIndex)">
                        <i class="fas fa-times"></i>
                    </span>
                </div>
            </div>
        </div>

        <hr class="mtb-12 line"/>

        <div 
            v-for="(card, cardIndex) in list.cards" 
            :key="cardIndex" 
            class="card-shadow is-pulled-left mtb-4 width-max" 
            draggable="true" 
            @dragstart="dragStart($event, card, listIndex, cardIndex)"
        >
            <a class="no-text-decoration">
                <!-- card -->
                <card :card="card" :listIndex="listIndex" :cardIndex="cardIndex" />
                <!-- /card -->
            </a>
        </div>

        <div class="is-pulled-left visible-on-hover mt-12">
            <div class="columns width-max p-4">
                <input 
                    v-model="list.curTextCardInput" 
                    class="input is-light column mr-4" 
                    type="input" 
                    placeholder="Card Name" 
                    @keyup.enter="addCard"
                >
                <input 
                    class="button is-light has-text-weight-semibold" 
                    type="button" 
                    value="Add Card"
                    @click="addCard"
                >
            </div>
        </div>
    </span>
</template>

<script>
import Card from './Card.vue'
export default {
    components: {
        Card
    },
    props: {
        list: {
            type: Object,
            required: true
        },
        listIndex: {
            type: Number,
            required: true
        }
    },
    methods: {
        addCard: function() {
            if(this.list.curTextCardInput == '') {
                return
            }

            const { list, listIndex } = this
            list.cards.push({name: this.list.curTextCardInput, toDo: []})
            list.curTextCardInput = ''
        },
        dragStart: function(e, data, listIndex, cardIndex) {
            var dataTemplate = {
                from: {
                    index: listIndex,
                    card: {
                        index: cardIndex
                    }
                },
                payload: {
                    name: data.name,
                    toDo: data.toDo
                }
            }
            var dataStringify = JSON.stringify(dataTemplate)

            e.dataTransfer.setData("dataTrans", dataStringify)
        },
        removeList: function(listIndex) {
            this.$store.dispatch('removeList', listIndex)
        }
    },
    updated(){
        this.$store.dispatch('updated')
    },
}
</script>

<style lang="stylus" scoped>
    .line
        border 1px solid #ebebeb !important
    .icon
        color lightgray
    .cursor-pointer
        cursor pointer
</style>
