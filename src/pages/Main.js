import React, { useEffect, useState } from 'react'
import Product from './Product'
import { useMemo } from 'react'
import Banner from '../components/home/Banner'
import Company from '../components/home/Company'

// import { useDispatch, useSelector } from 'react-redux'
// import { changeName } from '../store'

const Test = ()=>{
  return (
   console.log("231004 힘들다....")
  )

}
// 마운트 usb를 컴퓨터에 딱 꼽는 순간, 다~로딩이 딱 되고난 순간 언마운트:사라지는순간 usb를 딱 뽑는순간
// useEffect처럼 필요할때만 한번사용 가능
function Main() {
  // useMemo는 마운트 되기 직전에 사용 미리 당겨올 수 있다. 순서 1.useMemo가 먼저 실행(로딩창같은느낌) 2. console.log("완료가 되기전 실행됨")
  // 3. useEffect가 마운트 되었을때
  const result = useMemo(()=>{
    return Test()
  },[])

  // state를 다 가져오면 모든 정보가 다 나오기 때문에 키값을 써줘야 그에 해당하는 정보만 가져올 수 있다. store.age이런 식으로 
  // const a = useSelector(state => state.user)
  // const b = useSelector(state => state.age)
  
  // const dispatch = useDispatch()
 
  //231004 react 라이프사이클(생명주기) useEffect(()=>{}) 이게 기본문법

  //useEffect 업데이트=재랜더링 되면 기본적으로 다시 실행됨 ex) onClick={()=>{setCount(count+1)} 계ㅔㅔㅔㅔ속 실행됨 
  //,[] 빈배열로 주게 되면 업데이트를 제거 즉 마운트 되었을때 딱 1번만 디팬던시(종속) 실행되게 해준것 
  // ,[count] 값이 변경되었을때만 실행하고 싶을때
  useEffect(()=>{
    // 완전히 로딩될때는 완료가 실행됨
    console.log("완료")
    // return문법 : 언마운트 되었을때만 실행 (,[]  대괄호빼야함) 다른 컴포넌트를 실행했을때 return이 먼저 실행됨
    return ()=>{
      console.log("완료가 되기전 실행됨")
    }

  },[]) 
  // 재랜더링될때마다 axios 데이터



  let [count, setCount] = useState(0)
  return (
    <>
  <Banner/>
  <Company/>



    {/* {result} */}
    {/* {Test()} */}
    {/* {Test()} */}
    {/* <p>{count}</p> */}
    {/* 랜더링에 관한 memo(?) 메인에 Product를 뿌렸고 버튼을 눌렀을때 Product도 계ㅔㅔㅔㅔ속 재실행됨 이걸 막는 기능*/}
    {/* <Product/> */}
   

    {/* <p>{a}</p>
    <p>{b}</p> */}
    {/* 위에서 useDispatch를 idspatch로 선언해주고 함수 사용은 dispatch(함수명) 으로 사용해준다. */}
    {/* <button onClick={()=>{dispatch(changeName())}}>변경</button> */}
    {/* <button onClick={()=>{setCount(count+1)}}>버튼</button> */}
    
    </>
  )
}

export default Main