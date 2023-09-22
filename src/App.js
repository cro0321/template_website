import {Route, Routes, useNavigate} from "react-router-dom";
import Globalstyle from "./components/Globalstyle";
import Main from "./pages/Main";
import Aside from "./components/Aside";
import { ThemeProvider } from "styled-components";
import Nav from "./components/Nav";
import store, { logIn, loggedIn } from "./store";
import { Provider,  useDispatch,  useSelector } from "react-redux";
import Member from "./pages/Member";
import Login from "./pages/Login";
import Example from "./Example/Example";
import Logout from "./pages/Logout";
import { useEffect } from "react";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Modify from "./pages/Modify";
import Findemail from "./pages/Findemail";
import Write from "./pages/Write";
import Service from "./pages/Service";
import Notice from "./pages/service/Notice";
import Gallery from "./pages/service/Gallery";
import Online from "./pages/service/Online";
import Qna from "./pages/service/Qna";
import View from "./pages/View";
import { useState } from "react";
import Modal from "./components/Modal";
import Notpage from "./pages/Notpage";

  


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
  // console.log(userState)
  // 세션스토리지 값 받아오기

  const dispatch = useDispatch();
  const uid = sessionStorage.getItem("users");
  // console.log(uid)



  
  useEffect(()=>{
    // 완전히 로딩되기 전에 정보가 바뀌면 inner어저구 오류가....그래서 useEffect에 dispatch넣어준것 
    if(uid){
      dispatch(logIn(uid));
    }
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

  const [isModal, setIsModal] = useState(true);
  const navigate = useNavigate()
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
      <Route path="/modify" element={<Member/>}></Route>
      <Route path="/findemail" element={<Findemail/>}></Route>
      <Route path="/example" element={<Example/>}></Route>
      <Route path="/write/:board" element={<Write/>}></Route>
      <Route path="/view/:board/:view" element={<View/>}></Route>
      {/* <Route path="/view/:board" element={isModal && <Modal error="유효하지 않은 경로입니다." onClose={()=>{navigate('/')}}/>}></Route> */}
      <Route path="/edit/:board/:view" element={<Write/>}></Route>

      {/* 2차 라우트 */}
      <Route path="/service" element={<Service/>}>
        <Route path="notice" element={<Notice/>}></Route>
        <Route path="online" element={<Online/>}></Route>
        <Route path="qna" element={<Qna/>}></Route>
        <Route path="gallery" element={<Gallery/>}></Route>
      </Route>
      {/*인터넷 에러상태코드 검색하면 다 나옴 404페이지 : 페이지가 없음 404Notfound / 403페이지 : 폴더가 없다(폴더제한) / 500페이지 서버에러(서버가잠김)를 만들때 규칙 Route의 하단에 꼭 써주기 path="/*" -> 위에 작성한 페이지 말고 모두를 의미함  */}
      <Route path="/*" element={<Notpage/>}></Route>
    </Routes>
  </ThemeProvider>)
}

export default App;
