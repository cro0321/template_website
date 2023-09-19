import {Route, Routes} from "react-router-dom";
import Globalstyle from "./components/Globalstyle";
import Main from "./pages/Main";
import Aside from "./components/Aside";
import { ThemeProvider } from "styled-components";
import Nav from "./components/Nav";
import store, { loggedIn } from "./store";
import { Provider,  useDispatch,  useSelector } from "react-redux";
import Member from "./pages/Member";
import Login from "./pages/Login";
import Example from "./Example/Example";
import Logout from "./pages/Logout";
import { useEffect } from "react";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Modify from "./pages/Modify";
import Findemail from "./pages/Findemail";

  


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
  // 세션스토리지 값 받아오기

  const dispatch = useDispatch();
  const uid = sessionStorage.getItem("users");
  console.log(uid)


  useEffect(()=>{
    const fetchUser = async () =>{
      if(!uid) return;
      
      
      const userDoc = doc(collection(getFirestore(),"users"),uid);
        // console.log(userDoc)
        try{
          // 문서를 가져온다 userDoc라는 문서를
          const docSnapshot = await getDoc(userDoc);
          console.log(docSnapshot)
          // if docSnapsot이란게 있다면 아래를 if안을 실행한다
          if(docSnapshot.exists()){
            const userData = docSnapshot.data();
            // 로그인 된 상태의 콘솔로그 보면 loggedIn : true 상태가 되어있음 data uid  ㅇ0ㅇ
            dispatch(loggedIn(userData))
          }
        }catch(error){
          console.log(error)
        }
    }
    fetchUser();

    // dispatch가 실행될대마다 uid가 바뀔때마다 즉 action이 진행될때마다 실행된다.
  },[dispatch,uid])


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
      <Route path="/modify" element={<Modify/>}></Route>
      <Route path="/findemail" element={<Findemail/>}></Route>
      <Route path="/example" element={<Example/>}></Route>
    </Routes>
  </ThemeProvider>)
}

export default App;
