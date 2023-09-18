import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeName } from '../store'




function Main() {
  // state를 다 가져오면 모든 정보가 다 나오기 때문에 키값을 써줘야 그에 해당하는 정보만 가져올 수 있다. store.age이런 식으로 
  // const a = useSelector(state => state.user)
  // const b = useSelector(state => state.age)
  
  // const dispatch = useDispatch()



  return (
    <>
    {/* <p>{a}</p>
    <p>{b}</p> */}
    {/* 위에서 useDispatch를 idspatch로 선언해주고 함수 사용은 dispatch(함수명) 으로 사용해준다. */}
    {/* <button onClick={()=>{dispatch(changeName())}}>변경</button> */}
    <button>변경</button>
    
    </>
  )
}

export default Main