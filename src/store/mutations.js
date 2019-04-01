export default {
    updated(state) {
        localStorage.setItem('Board', JSON.stringify(state.board))
    },
    addList(state, name) {
        state.board.lists.push({
            name,
            curTextCardInput: '',
            cards: []
        })
    },
    dragEnd(state, { dataTrans, cardIndex, listIndex, to }) {
        for(var i = cardIndex; i < state.board.lists[listIndex].cards.length; i++) {
            state.board.lists[listIndex].cards[i] = state.board.lists[listIndex].cards[i+1]
        }
        state.board.lists[listIndex].cards.pop()
        state.board.lists[to].cards.push(dataTrans)
    },
    remove(state, index) {
        for(var i = index; i < state.curTodo.toDo.length; i++) {
            state.curTodo.toDo[i] = state.curTodo.toDo[i+1]
        }
        state.curTodo.toDo.pop()
    },
    showCardDetail(state, payload) {
        state.curTodo = payload
    },
    hideCardDetail(state) {
        state.curTodo = {}
    }
}