import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// 실제로그아웃처리
import { logOut } from '../store'
// firebase에 로그아웃 처리하는 기능
import { signOut } from 'firebase/auth'
// 로그아웃 이후 메인창
import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from '../firebase'
import Modal from '../components/Modal'



function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 기본적으로 화면에 나와야하니까 true
  const [isModal, setIsModal] = useState(true);


  signOut(firebaseAuth)
  .then(()=>{
    dispatch(logOut());
    // navigate(-1)
    sessionStorage.removeItem("users");
  })
  .catch ((error)=>{
    console.log(error)
  })


  return (
<>
      {/* {
        isModal && <Modal error = "로그아웃 되었습니다." onClose={()=>{setIsModal(navigate("/"))}} />
       } */}


      {/* 다른 컴포넌트에서 당겨왔을때 직접적인 OnClick 이벤트가 안먹음 그래서 OnClick 아니고 onClose가 들어감 */}
       {
       isModal && <Modal error = "로그아웃 되었습니다." 
       onClose={()=>{setIsModal(false); navigate("/");}}/>
       }
</>
  )
}

export default Logout