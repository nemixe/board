<template>
    <div class="has-background-info card-detail">
        <div class="container"> 
            <div class="tile is-parent card-detail-container">
                <article class="tile is-child notification">
                    <div class="notification card-detail-header">
                        <div class="columns is-marginless">
                            <div class="column">
                                <div class="title">{{curCard.name}}</div>
                            </div>
                            <div class="column is-3 is-pulled-right">
                                <a class="is-pulled-right has-text-weight-semibold no-decoration" @click="hideCardDetail">
                                    <span>Close</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- checklist -->
                    <check-list :checkList="curCard.toDo" />
                    <!-- /checklist -->

                    <div class="columns is-marginless is-paddingless">
                        <div class="column is-11 field m-0">
                            <div class="control">
                                <input v-model="curCard.curTextToDoInput" type="text" class="input" placeholder="Add your To Do" @keyup.enter="addTodo" />
                            </div>
                        </div>
                        <div class="column is-1">
                            <input type="button" class="button is-light is-pulled-right has-text-weight-semibold" value="Add" style="width: 100%" @click="addTodo"/>  
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>


<script>
import {mapState} from 'vuex'
import CheckList from './CheckList.vue'

export default {
    components: {
        CheckList
    },
    computed: {
        ...mapState(['curCard'])
    },
    methods: {
        addTodo: function() {
            const {curCard} = this.$store.state
            if(curCard.curTextToDoInput == '') return
            curCard.toDo.push({text: curCard.curTextToDoInput, isDone: false})
            curCard.curTextToDoInput = ''
            
            this.$store.dispatch('updated')
        },
        hideCardDetail: function() {
            this.$store.dispatch('hideCardDetail')
        }
    },
    updated(){
        this.$store.dispatch('updated')
    },
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
