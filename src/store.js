import {configureStore, createSlice} from "@reduxjs/toolkit";
import { useState } from "react";





// ex 로그인 됐을때 로그인 정보들 장바구니 항상 어느 지점에서 내가 정보를 가지고있어야 할 때 리덕스를 사용 복잡한 구조일때 리덕스를 사용
let user = createSlice({
    name: "user",
    initialState : "홍길동",

    reducers : {
        // 모든페이지가 한번에 바뀜  changeName(state) 하고 state 값을 불러오면 위에서 정의한 홍길동이 같이 나와준다.
        changeName(state) {
            return  "테스트" + state
        }
    }
   
})

let age = createSlice({
    name : "age",
    initialState : "253살"
})

let dark = createSlice({
    name : "dark",
    initialState : "light",
    reducers :{
        toggleTheme : (state) => state === "light" ? "dark" : "light"
    }
    
})

// 다른곳에서도 다 출력되게 하려면 이벤트를 써주고 변수 선언한 이름에 .actions를 해준다 ex)let user -> user.actions를 해준다.
export const {changeName} = user.actions;
export const {toggleTheme} = dark.actions;

// default에 추가
export default configureStore({
    reducer :{
        user : user.reducer,
        age : age.reducer,
        dark : dark.reducer
    }

})



