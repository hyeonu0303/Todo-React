import { configureStore,createSlice } from '@reduxjs/toolkit'

//state만듬

/* let stock = createSlice({
  name: 'stock',
  initialState : [10,11,12]
})

let items = createSlice({
  name: 'items',
  initialState:[
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers:{
    changeCount(state,action){
      state[action.payload].count++
    },
    addItems(state,action){
      return state.concat(action.payload);
    }
  }
})

//user.actions state변경함수남음
export let {changeCount,addItems} = items.actions;

//등록
export default configureStore({
  reducer: { 
    user : user.reducer,
    stock : stock.reducer,
    items: items.reducer
  }
}) */  