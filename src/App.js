import {Route, Routes} from "react-router-dom";
import Globalstyle from "./components/Globalstyle";
import Main from "./pages/Main";
import Aside from "./components/Aside";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import Nav from "./components/Nav";
import store from "./store";
import { Provider,  useSelector } from "react-redux";
import Member from "./pages/Member";
import Login from "./pages/Login";
import Example from "./Example/Example";
import Logout from "./pages/Logout";


function App() {


  //  useSelect는 Provider 내에서 사용할수가 없다. 리덕스는 전역변수로 사용해주는데 그걸 Provider로 묶어준 것  이 상태에서는   const a = useSelector(state => state.user) useSelector 를 사용할 수 없다. Provider의 컴포넌트 안에서는 사용가능하지만 밖에서는 사용 할 수가 없기 때문에 


  return (
    <>
      <Provider store={store}>
        <Inner/>
      </Provider>
    </>
  );
}


function Inner() {


  const light = {
    colors: {
      //MainColor
      Primary :"orange",
      Secondary : "orangered",
      BgColor:"#e9f1f6",
      Color : "#000",
      ContentBg: "#fff"
    }
  
  }
  const dark = {
    colors: {
      Primary :"#272929",
      Secondary : "#e9e9e9",
      BgColor:"#333",
      Color:"#e9e9e9",
      ContentBg: "#272929"
    }
  }
 
  const theme = useSelector(state => state.dark);
  const DarkMode = theme === 'light' ? light : dark;
  const userState = useSelector(state => state.user);
console.log(userState)

    return(
    <ThemeProvider theme={DarkMode}>
      
    <Globalstyle/>
    <Nav
    // userState2에 userState값을 담아주고 네비에 적용할거라 Nav에 써준다.
      userState2 = {userState}
    
    />
    <Aside />
    <Routes>
      <Route path="/" element={<Main/>}></Route>
      <Route path="/member" element={<Member/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/logout" element={<Logout/>}></Route>
      <Route path="/example" element={<Example/>}></Route>
    </Routes>
  </ThemeProvider>)
}

export default App;
