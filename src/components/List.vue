<template>
    <span>
        <div class="content width-max p-0 m-0">
            <div class="title is-5 width-max mb-4 overflow-hidden">
                {{value.name}}
            </div>
        </div>
        <hr class="mtb-12 line"/>

        <a class="no-text-decoration">
            <slot></slot>
        </a>
        <div class="is-pulled-left visible-on-hover mt-12">
            <div class="columns width-max p-4">
                <input 
                    v-model="value.curTextCardInput" 
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
export default {
    props: {
        value: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    methods: {
        addCard: function() {
            if(this.value.curTextCardInput == '') {
                return
            }

            const { value, index} = this
            value.cards.push({name: this.value.curTextCardInput, toDo: []})
            value.curTextCardInput = ''
        }
    }
}
</script>

<style lang="stylus" scoped>
    .line
        border: 1px solid #ebebeb !important
</style>
