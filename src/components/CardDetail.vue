<template>
    <div v-show="Object.keys(curTodo).length" class="has-background-info card-detail">
        <div class="container"> 
            <div class="tile is-parent card-detail-container">
                <article class="tile is-child notification">
                    <div class="notification card-detail-header">
                        <div class="columns is-marginless">
                            <div class="column">
                                <div class="title">{{curTodo.name}}</div>
                            </div>
                            <div class="column is-3 is-pulled-right">
                                <a class="is-pulled-right has-text-weight-semibold no-decoration" @click="hideCardDetail">
                                    <span>Close</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <checklist  :checklistarray="curTodo.toDo" />

                    <div class="columns is-marginless is-paddingless">
                        <div class="column is-11 field m-0">
                            <div class="control">
                                <input v-model="curTodo.curTextToDoInput" type="text" class="input" placeholder="Add your To Do" @keyup.enter="addtodo" />
                            </div>
                        </div>
                        <div class="column is-1">
                            <input type="button" class="button is-light is-pulled-right has-text-weight-semibold" value="Add" style="width: 100%" @click="addtodo"/>  
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>


<script>
import {mapState} from 'vuex'
import Checklist from './Checklist.vue'

export default {
    components: {
        Checklist
    },
    computed: {
        ...mapState(['curTodo'])
    },
    methods: {
        addtodo: function() {
            const {curTodo} = this.$store.state
            if(curTodo.curTextToDoInput == ''){
                return
            }
            curTodo.toDo.push({text: curTodo.curTextToDoInput, isDone: false})
            curTodo.curTextToDoInput = ''
            
            this.$store.dispatch('updated')
        },
        hideCardDetail: function() {
            this.$store.dispatch('hideCardDetail')
        }
    }
}
</script>

<style lang="stylus" scoped>
    .card-detail-header
        position sticky
        top 0px
        z-index 2
        padding 0px 1 0px
        border-bottom 2px solid lightgrey
    
    .card-detail-container
        margin auto 0px
    .card-detail
        width 100vw
        height 100vh
        position relative
</style>
