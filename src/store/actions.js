export default{
  alogin: ({commit }, data) => {
    commit('login',data)
  },
  alogout: ({commit }) => {
    commit('logout')
  },
  auscode: ({commit },data) => {
    commit('uscode',data)
  },
}