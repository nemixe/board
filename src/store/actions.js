export const updated = ({ commit }) => {
    commit('updated')
}

export const addList = ({ commit }, name) => {
    commit('addList', name)
}

export const dragEnd = ({ commit }, { dataTrans, cardIndex, listIndex, to }) => {
    commit('dragEnd', { dataTrans, cardIndex, listIndex, to })
}

export const removeTodo = ({ commit }, index) => {
    commit('remove', index)
}

export const showCardDetail = ({ commit }, payload) => {
    commit('showCardDetail', payload)
}

export const hideCardDetail = ({ commit }) => {
    commit('hideCardDetail')
}