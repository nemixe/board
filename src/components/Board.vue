<template>
    <span>
        <div class="columns m-12">
            <input 
                v-model="curTextListInput" 
                type="text" 
                class="column is-2 input mr-12" 
                placeholder="List Name" 
                @keyup.enter="addList"
            >
            <input type="button" class="button has-text-weight-semibold" value="Add List" @click="addList" />
        </div>
        <div v-show="board.lists.length" class="scrollmenu">
            <div class="list-section">
                <div 
                    v-for="(list, listIndex) in board.lists" 
                    :key="listIndex" 
                    class="list-container has-background-light mr-4 width-max" 
                    @dragover="allowDragEnd" 
                    @drop="dragEnd($event, listIndex)"
                >
                    <!-- list -->
                    <list :list="list" :index="listIndex">
                        <div 
                            v-for="(card, cardIndex) in list.cards" 
                            :key="cardIndex" 
                            class="card-shadow is-pulled-left mtb-4 width-max" 
                            draggable="true" 
                            @dragstart="drag($event, card, listIndex, cardIndex)"
                        >
                            <!-- card -->
                            <card :value="card" @click.native="showCardDetail(cardIndex, card)"  />
                            <!-- /card -->
                        </div>
                    </List>
                    <!-- /list -->
                </div>
            </div>
        </div>
    </span>
</template>

<script>
import List from './List.vue'
import Card from './Card.vue'
import ChecklistItem from './ChecklistItem.vue'
import Checklist from './Checklist.vue'

export default {
    components: {
      List,
      Card,
      ChecklistItem,
      Checklist
    },
    data: function() {
        return {
            curTextListInput: '',
        }
    },
    computed: {
        board: function() {
            let localData = this.$store.state.board
            if (localStorage.getItem("Board") !== null) {
                var getLocalDataBoard = localStorage.getItem('Board')
                localData = JSON.parse(getLocalDataBoard)
            }
            this.$store.state.board = localData
            return localData
        },
    },
    updated(){
        this.$store.dispatch('updated')
    },
    methods: {
        addList: function() {
            if(this.curTextListInput === '') {
                return
            }

            this.$store.dispatch('addList', this.curTextListInput)
        },
        showCardDetail: function(index, val) {
            let payload = {
                ...val,
                curTextToDoInput: ''
            }
            this.$store.dispatch('showCardDetail', payload)
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
        allowDragEnd: function(e) {
            e.preventDefault()
        },
        dragEnd: function(e, to) {
            var data = e.dataTransfer.getData("text")
            var dataParse = JSON.parse(data)
            
            var payload = {
                dataTrans: dataParse.payload, 
                cardIndex: dataParse.from.card.index, 
                listIndex: dataParse.from.index, 
                to
            }
            
            this.$store.dispatch('dragEnd', payload)
        }
    }
}
</script>
