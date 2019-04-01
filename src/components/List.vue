<template>
    <span>
        <div class="content width-max p-0 m-0">
            <div class="title is-5 width-max mb-4 overflow-hidden">
                {{list.name}}
            </div>
        </div>
        <hr class="mtb-12 line"/>

        <a class="no-text-decoration">
            <slot></slot>
        </a>
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
                    list="Add Card" 
                    @click="addCard"
                >
            </div>
        </div>
    </span>
</template>

<script>
export default {
    props: {
        list: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    updated(){
        this.$store.dispatch('updated')
    },
    methods: {
        addCard: function() {
            if(this.list.curTextCardInput == '') {
                return
            }

            const { list, index} = this
            list.cards.push({name: this.list.curTextCardInput, toDo: []})
            list.curTextCardInput = ''
        }
    }
}
</script>

<style lang="stylus" scoped>
    .line
        border: 1px solid #ebebeb !important
</style>
