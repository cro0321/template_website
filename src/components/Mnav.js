import React, { useState } from 'react'
import styled from 'styled-components'


const Hamburger = styled.div`
    position: fixed;
    right: 16px;
    top: 24px;
    transition: all 1s;
    z-index: 50;
    cursor: pointer;
    > div {
        width: 30px; height: 2px; background-color: #000; border-radius: 4px;
        margin: 6px; transition: all 1s;

    }
    &.on div:nth-child(1){transform:rotate(45deg) translateY(12px);}
    &.on div:nth-child(2){opacity: 0; transform: translateX(-30px) rotate(720deg);}
    &.on div:nth-child(3){transform:rotate(-45deg) translateY(-12px);}


    @media screen and (min-width: 1024px){
        display: none;
    }
    @media screen and (max-width: 768px){
        right: 24px;
    }

`

function Mnav() {
    const [isActive, setIsActive] = useState(false);
    //햄버거 박스를 클릭했을때 저 값이 바뀌어 줘야 한다 classname이 true일 때 on 을 주면된다.

  return (
    <>
    {/* setIsActive(isActive === true ? false : true )*/}
        <Hamburger  className={isActive === true ? 'on' : ""} onClick={()=>{setIsActive(!isActive)}}>
            {
                //배열을 3개 돌리는데 아무런 데이터 없이 undefinde 값이 3개 돌아감. 그 배열의 데이터가 없거나 필요 없을때 i값만 필요할 때 앞쪽의 파라미터를 _로 표현한다.
                Array(3).fill().map((_,i)=>{
                    return (
                        <div key={i}></div>
                    )
                })
            }

        </Hamburger>
    </>    
  )
}

export default Mnav