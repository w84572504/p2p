export default{
  login: (state, data) => {
    localStorage.Us = data;
    state.Us = data;
  },
  uscode: (state, data) => {
    state.codeUs = data;
  },
  logout: (state) => {
    localStorage.removeItem('Us');
    state.Us = null
  },
  showLoading(state){
    state.LOADING = true
  },
  hideLoading (state) {
    state.LOADING = false
  }
}