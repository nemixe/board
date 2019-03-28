<template>
    <div id="app" class="scroll-container">
        <!-- card detail -->
        <card-detail 
            :curTodoArray="curTodoArray"
            @updated="updated"
            @unshow="curTodoArray = {}" />
        <!-- card detail -->

        <div class="columns m-12">
            <input v-model="curTextListInput" type="text" class="column is-2 input mr-12" placeholder="List Name" @keyup.enter="addList">
            <input type="button" class="button has-text-weight-semibold" value="Add List" @click="addList()" />
        </div>
        <div v-show="board.lists.length" class="scrollmenu">
            <div class="list-section">
                <div v-for="(list, listIndex) in board.lists" :key="listIndex" class="list-container has-background-light mr-4 width-max" @dragover="allowDrop" @drop="drop($event, listIndex)">

                    <!-- list -->
                    <List :value="list" :index="listIndex">
                        <div v-for="(card, cardIndex) in list.cards" :key="cardIndex" class="card-shadow is-pulled-left mtb-4 width-max" draggable="true" @dragstart="drag($event, card, listIndex, cardIndex)">

                            <!-- card -->
                            <Card :value="card" @click.native="showTodo(cardIndex, card)"  />
                            <!-- /card -->

                        </div>
                    </List>
                    <!-- /list -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import List from './components/List.vue'
import Card from './components/Card.vue'
import CardDetail from './components/CardDetail.vue'
import ChecklistItem from './components/ChecklistItem.vue'
import Checklist from './components/Checklist.vue'

export default {
    components: {
      List,
      Card,
      CardDetail,
      ChecklistItem,
      Checklist
    },
    
    data() {
        let localData = {
            curTextListInput: '',
            curTodoArray: {},
            board: {
                name: 'Project',
                lists: []
            }
        }
        if (localStorage.getItem("Local") !== null) {
            var getLocalDataBoard = localStorage.getItem('Local')
            localData.board = JSON.parse(getLocalDataBoard)
        }
        return localData
    },
    updated(){
        localStorage.setItem('Local', JSON.stringify(this.board))
    },
    methods: {
        addList: function() {
            if(this.curTextListInput === '') {
                return
            }

            this.board.lists.push({
                name: this.curTextListInput,
                curTextCardInput: '',
                cards: []
            })
        },
        showTodo: function(index, val) {
            this.show = !this.show
            this.curTodoArray = {
                ...val,
                curTextToDoInput: ''
            }
        },
        drag: function(e, data, listIndex, cardIndex) {
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

            e.dataTransfer.setData("text", dataStringify)
        },
        allowDrop: function(e) {
            e.preventDefault()
        },
        drop: function(e, to) {
            var data = e.dataTransfer.getData("text")
            var dataParse = JSON.parse(data)
            var listIndex = dataParse.from.index
            var cardIndex = dataParse.from.card.index

            for(var i = cardIndex; i < this.board.lists[listIndex].cards.length; i++) {
                this.board.lists[listIndex].cards[i] = this.board.lists[listIndex].cards[i+1]
            }
            this.board.lists[listIndex].cards.pop()
            this.board.lists[to].cards.push(dataParse.payload)
        },
        updated: function() {
            localStorage.setItem('Local', JSON.stringify(this.board))
        }
    }
}
</script>
