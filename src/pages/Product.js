import React from 'react'
import { memo } from 'react'

 /* 랜더링에 관한걸 방지하기 위한것 memo: ex 메인에 Product를 뿌렸고 버튼을 눌렀을때 Product도 계ㅔㅔㅔㅔ속 재실행됨 Product에서는 재실행될 필요가 없는데
  이걸 막는 기능*/
const Product = memo(function(){
// axios 같은 데이터 말고 그냥 화면에 출력 되었을때만 이게 필요한 이유는 성능개선 큰 프로젝트에서는 컴포넌트가 엄청 많을건데 이게 계속 재랜더링되면 속도 저하를 일으킴
// 사용법은 기본적으로 rfce했을때 생성되는 function 지우고 const Product로 만들어줌
    console.log("Product 실행")
  return (

    <div>Product</div>
  )
})



export default Product