import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'


const Page = styled.div`
    position: fixed;
    width: 100%; height: 100%;
    background-color: #f6f6f6;
    left: 0; top: 0;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 0 2%;
    box-sizing: border-box;

`
const PageContent = styled.div`
    max-width: 1200px;
    height: 600px;
    margin: auto;
    line-height: 1.4;
    padding: 40px;
    background-color: #fff;
    border-radius: 10px;
    width: 100%;
    /* 크로스브라우징에 영향이 있음 그래서 box-shadow를 줄 떄 -webkit이 붙는다. */
    -webkit-box-shadow: 0 15px 15px -10px rgba(0,0,0,0.1);
    box-shadow: 0 15px 15px -10px rgba(0,0,0,0.1);
    text-align: center;
    h3{
        font-size: 165px;
        font-weight: bold;
        margin-bottom: 50px;
        color: #262626;
        span{
            color: #00b7ff;
        }
    }
    p{
        margin-bottom: 20px;
         font-size: 40px;
         font-weight: bold;;
         span{
             color: red;
         }
    }
`
const Button = styled.button`
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 10px 30px;
    border-radius: 5px;
    cursor: pointer;

`

function Notpage() {
    const navigate = useNavigate();
    const [countDown, setCountDown] = useState(500);
    // 로딩됐을때실행을 위해 useEffect

    useEffect(()=>{
        if(countDown>0){
            const timer = setTimeout(()=>{
                // 1초마다 초가 내려가야하니까 기존 coountDown에서 -1 
                setCountDown(countDown-1)
            // 카운트 다운이니까 1초마다 실행
            },1000)
            // 혹시모를 버그 방지를 위해서 timer을 멈춰준다 
            return ()=> clearTimeout(timer);
          

           
        }else{
            navigate('/')

        }

        // countDown 이되고 navigate 이동이 생겼을때만 재실행
    }, [countDown, navigate])




return (

    <Page>
        <PageContent>
            <h3>4<span>0</span>4</h3>
            <p>페이지를 찾을 수 없습니다.</p>
            <p>주소를 다시 한번 확인해주세요</p>
            <p><span>{countDown}</span>초 후에 이동 됩니다.</p>
            <Button onClick={()=>{navigate('/')}}>메인으로 가기</Button>
        </PageContent>
    </Page>

  )
}

export default Notpage
