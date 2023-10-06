const defaultState ={
  email:'',
}

export const initialState = localStorage.getItem('state')?JSON.parse(localStorage.getItem('state')): defaultState;
export const reducer = (state, action) => {
  switch (action.type) {
    case 'EMAIL':
      var newState={
        ...state,
        email: action.payload
      }
      localStorage.setItem('state',JSON.stringify(newState));
      return newState;
  }
}