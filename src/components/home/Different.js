import React from 'react'
import styled from 'styled-components'
import AnimateNumber from  'animated-number-react';
import { useState } from 'react';
import { useEffect } from 'react';

const Container = styled.div`
    width: 100%;
    padding-bottom: 48px;
    text-align: center;
    color: #fff;
    /* 배경이 고정되는 효과 */
    background: url("https://via.placeholder.com/1920X450/053") fixed center center;
`
const ContainerWrap = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    padding: 0 2%;
`
const ContentTitle = styled.div`
    width: 100%;
    margin-top: 3rem;
    text-align: center;
    margin-bottom: 1.5rem;
    position: relative;
    &::after{
        content: "";
        position: absolute;
        width: 3%;
        /* width: 2.5%; */
        height: 2px;
        background-color: #111;
        left: 50%; bottom: 45%; translate : (-50%, -50%);
        /* left: 40.5%; top: 0; */
    }

`
const Title = styled.h3`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    //대문자
    text-transform: uppercase;
    /* 소문자 */
    /* text-transform: lowercase; */

`
const Desc = styled.p`
    font-size: 0.875rem;
    color: #a0a0a0;
`
const ContentGrid = styled.div`
    flex-basis: 100%;
    padding: 48px 0;
    ul{
    display: flex;
    flex-wrap: wrap ;
    justify-content: space-between;
    li{
        flex-basis: 100%;
        text-align: center;
        @media screen and (min-width: 640px) {
            flex-basis: 50%;
        }
        
        @media screen and (min-width: 1024px) {
            flex-basis: 25%;
        }
        p:first-child{font-size:1.25rem}
        p:last-child{font-size:1rem; padding-bottom:2rem;}
        span{font-size:60px; padding-top:20px; display:block;}
    }
    }

`




function Different() {
    // 그 영역에 도달했는지 체크하는것
    const [isView, setIsView] = useState(false)
    useEffect(()=>{
        const scrollEvent = () =>{
            const rect = document.querySelector("#content").getBoundingClientRect();
            console.log(rect)
            if(rect.top-200 <= window.innerHeight && rect.bottom >= 0)
            // console.log(window.innerHeight);
            // console.log("hihi");
            // 화면에 보이게 설정하려고 true
            setIsView(true);

        }   
        window.addEventListener("scroll",scrollEvent);
        scrollEvent()
        // 언마운트 될때 return이 실행되는데 언마운트 될때도 이벤트가 계속 실행되고 있어서 이벤트를 지워주는것.
        return () =>{
            window.removeEventListener("scroll",scrollEvent)
        }

    },[])

    const data = [
        {
            "title" : "설립일",
            "number" : "2017",
            "desc" : "Date of Foundation"

        },
        {
            "title" : "직원수",
            "number" : "456",
            "desc" : "Number Of Employees"

        },
        {
            "title" : "계약체결",
            "number" : "2431",
            "desc" : "Contract Conclusion"

        },
        {
            "title" : "견적문의",
            "number" : "5461",
            "desc" : "Request for a Quote"

        }

    ]


  return (
  <>
  <Container>
    <ContainerWrap>
        <ContentTitle>
        <Title>Different</Title>
        <Desc>제목에 대한 부가 설명...</Desc>
        </ContentTitle>
        {/* 스타일컴포넌트에는 id나 classname을 줄 수 없어서 ul li형태로 이름주기 위해 써줌 */}
        <ContentGrid>
        <ul>
                {
                    data.map((e,i)=>{
                        return (
              
                    <li  id="content" key={i}>
                    <p>{e.title}</p>
                    <p>{e.number}</p>
                            {
                            isView && <AnimateNumber
                            value={e.number}
                            duration={5000}
                            formatValue={(value)=>`${value.toFixed(0)}`}
                            />
                            }
                    <p>{e.desc}</p>
                    </li>
    
               
                        )
                    })

                }
          </ul>
                
        </ContentGrid>
    </ContainerWrap>
  </Container>

  
  </>

  )
}

export default Different