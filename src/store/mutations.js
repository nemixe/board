export default {
    localToState(state) {
        if (localStorage.getItem("Board") !== null) {
            var getLocalDataBoard = localStorage.getItem('Board')
            var localBoard = JSON.parse(getLocalDataBoard)
            state.board = localBoard
        }
    },
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
    dragEnd(state, { cardData, cardIndex, listIndex, to }) {
        for(var i = cardIndex; i < state.board.lists[listIndex].cards.length; i++) {
            state.board.lists[listIndex].cards[i] = state.board.lists[listIndex].cards[i+1]
        }
        state.board.lists[listIndex].cards.pop()
        state.board.lists[to].cards.push(cardData)
    },
    removeTodo(state, index) {
        for(var i = index; i < state.curCard.toDo.length; i++) {
            state.curCard.toDo[i] = state.curCard.toDo[i+1]
        }
        state.curCard.toDo.pop()
    },
    removeList(state, index) {
        for(var i = index; i < state.board.lists.length; i++) {
            state.board.lists[i] = state.board.lists[i+1]
        }
        state.board.lists.pop()
    },
    removeCard(state, {listIndex, cardIndex}) {
        for(var i = cardIndex; i < state.board.lists[listIndex].cards.length; i++) {
            state.board.lists[listIndex].cards[i] = state.board.lists[listIndex].cards[i+1]
        }
        state.board.lists[listIndex].cards.pop()
    },
    showCardDetail(state, payload) {
        state.curCard = payload
    },
    hideCardDetail(state) {
        state.curCard = {}
    }
}