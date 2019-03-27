<template>
    <div id="app" class="scroll-container">
        <!-- card detail -->
        <card-detail :curTodoArray="curTodoArray" v-on:addtodo="addTodo" v-on:unshow="curTodoArray = {}">
            <div v-for="(data, index) in curTodoArray.toDo" v-bind:key="index" style="position: relative">

                <!-- checklist -->
                <Checklist :data="data" v-on:remove="remove(index)" />
                <!-- /checklist -->

            </div>
        </card-detail>
        <!-- card detail -->

        <div class="columns m-12">
            <input v-model="curTextListInput" type="text" class="column is-2 input mr-12" placeholder="List Name" @keyup.enter="addList">
            <input type="button" class="button has-text-weight-semibold" value="Add List" @click="addList()" />
        </div>
        <div v-show="board.lists.length" class="scrollmenu">
            <div class="list-section">
                <div v-for="(list, listIndex) in board.lists" v-bind:key="listIndex" class="list-container has-background-light mr-4 width-max" @dragover="allowDrop" @drop="drop($event, listIndex)">

                    <!-- list -->
                    <List :value="list">
                        <div v-for="(card, cardIndex) in list.cards" v-bind:key="cardIndex" class="card-shadow is-pulled-left mtb-4 width-max" draggable="true" @dragstart="drag($event, card, listIndex, cardIndex)">

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
import Checklist from './components/Checklist.vue'

export default {
    components: {
      List,
      Card,
      CardDetail,
      Checklist
    },
    data() {
      return{
          curTextListInput: '',
          curTodoArray: {},
          board: {
              name: 'Project',
              lists: []
          }
        }
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
        remove: function(index) {
            for(var i = index; i < this.curTodoArray.toDo.length; i++) {
                this.curTodoArray.toDo[i] = this.curTodoArray.toDo[i+1]
            }
            this.curTodoArray.toDo.pop()
        },
        addTodo: function() {
            if(this.curTodoArray.curTextToDoInput == ''){
                return
            }
            this.curTodoArray.toDo.push({text: this.curTodoArray.curTextToDoInput, isDone: false})
            this.curTextToDoInput = ''
        }
    }
}
</script>
