<template>
    <span>
        <div class="columns m-12">
            <input 
                v-model="listModel" 
                type="text" 
                class="column is-2 input mr-12" 
                placeholder="List Name" 
                @keyup.enter="addList"
            />
            <input 
                type="button" 
                class="button has-text-weight-semibold" 
                value="Add List"
                @click="addList" 
            />
        </div>
        <div v-show="board.lists.length" class="scrollmenu">
            <div class="list-section">
                <div 
                    v-for="(list, listIndex) in board.lists" 
                    :key="listIndex"
                    class="list-container has-background-light mr-4 width-max"
                    @dragover="preventDefault" 
                    @dragenter="preventDefault"
                    @drop="dragEnd($event, listIndex)"
                >
                    <!-- list -->
                    <list :list="list" :listIndex="listIndex" />
                    <!-- /list -->
                </div>
            </div>
        </div>
    </span>
</template>

<script>
import { mapState } from 'vuex'
import List from './List.vue'

export default {
    beforeCreate: function() {
        this.$store.dispatch('localToState')
    },
    components: {
      List
    },
    data: function() {
        return {
            listModel: '',
        }
    },
    computed: {
        ...mapState(['board'])
    },
    methods: {
        addList: function() {
            if(this.listModel === '') return
            
            this.$store.dispatch('addList', this.listModel)
            this.listModel = ''
        },
        showCardDetail: function(index, val) {
            let payload = {
                ...val,
                curTextToDoInput: ''
            }
            this.$store.dispatch('showCardDetail', payload)
        },
        preventDefault: function(e) {
            e.preventDefault()
        },
        dragEnd: function(e, to) {
            var dataTrans = e.dataTransfer.getData("dataTrans")
            if(dataTrans === '') return
            
            var dataParse = JSON.parse(dataTrans)
            var payload = {
                cardData: dataParse.payload, 
                cardIndex: dataParse.from.card.index, 
                listIndex: dataParse.from.index, 
                to
            }
            this.$store.dispatch('dragEnd', payload)
        }
    },
    updated(){
        this.$store.dispatch('updated')
    }
}
</script>
