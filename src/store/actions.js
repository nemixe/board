export const updated = ({ commit }) => {
    commit('updated')
}

export const addList = ({ commit }, name) => {
    commit('addList', name)
}

export const dragEnd = ({ commit }, { cardData, cardIndex, listIndex, to }) => {
    commit('dragEnd', { cardData, cardIndex, listIndex, to })
}

export const removeTodo = ({ commit }, index) => {
    commit('removeTodo', index)
}

export const removeList = ({ commit }, index) => {
    commit('removeList', index)
}

export const removeCard = ({ commit }, payload) => {
    commit('removeCard', payload)
}

export const showCardDetail = ({ commit }, payload) => {
    commit('showCardDetail', payload)
}

export const hideCardDetail = ({ commit }) => {
    commit('hideCardDetail')
}
