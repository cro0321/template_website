import React, { useEffect } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Autoplay, Pagination} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styled from 'styled-components';

// wowjs는 설치 yarn add wowjs설치후 사용 animate.css는 wow안에 있어서 wow설치후 바로 써주면됨
import WOW from 'wowjs';
import 'animate.css'

const TxtData = [
    {
        title: "제목1",
        desc: "부제목",
        desc2: "부제목22",

    },
    {
        title: "제목2",
        desc: "부제목",
        desc2: "부제목22",

    },
    {
        title: "제목3",
        desc: "부제목",
        desc2: "부제목22",

    },
    {
        title: "제목4",
        desc: "부제목",
        desc2: "부제목22",

    },
    {
        title: "제목5",
        desc: "부제목",
        desc2: "부제목22",

    }


]
// styled는 컴포넌트 하나 만들고 스타일 적용시킬 이름...(?) 써주기 const StyleSlide = styled(SwiperSlide)`
const StyleSlide = styled(SwiperSlide)`
    position: relative;
    img{width:100%; height: auto;}
`
const DescContent = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    color: red;
    transform: translate(-50%,-50%);
    h3{
        font-size: 48px;
        text-align: center;
    }
    @media screen and (max-width: 768px) {
        font-size: 16px;
    }
    @media screen and (max-width: 1280px) {
        font-size: 30px;
    }
    p{
        font-size: 24px;
        text-align: center; font-weight: bold;
    @media screen and (max-width: 768px) {
        font-size: 14px;
    }
    @media screen and (max-width: 1280px) {
        font-size: 20px;
    }
    }

`


function Banner() {
    // 로딩이 되고나서 = 마운트 되고나서 실행시켜줄때 useEffect ,[] <-한번만
    useEffect(()=>{
        new WOW.WOW({
            boxClass: "wow",
            animateClass: "animate__animated",
            live: false,
            mobile: true
        }).init();


    },[])

  return (
    <>
    <Swiper 
        // autoplay = {{
        //     delay : 1000,
        //     // 수동으로 넘겼을때도 오토프플레이 적용되는걸 막는것
        //     disableOnInteraction: false
        // }}
        loop={true}
        // 화면에 몇개씩 보일지
        slidesperview={1}
        navigation= {{clickable: true}}
        pagination= {{clickable: true}}
        // 모듈 꼭 써주기 import처럼
        modules={[Autoplay,Navigation, Pagination]}
        // {(swiper)=>{console.log(swiper)}} swiper내용 다 나옴
        // onSwiper={(swiper)=>{console.log(swiper)}}
        // wow는 스크롤에 반응함
        onSlideChange={
            ()=>{
            new WOW.WOW({
                live: false
            }).init()

        }}
    >

    
        {
        TxtData.map((e,i)=>{
            return(
            <StyleSlide key={i}><img src={`./images/${i+1}.${i === 0  || i === 2 ? 'png':'jpg'}`} alt="slide"/>
            <DescContent>
                <h3 className='wow animate__flash'  data-wow-duration="1s" >{e.title}</h3>
                <p className='wow animate__flash'  data-wow-duration="1s" data-wow-delay="0.3s">{e.desc}</p>
                <p className='wow animate__flash'  data-wow-duration="1s" data-wow-delay="0.6s">{e.desc2}</p>
            </DescContent>
            </StyleSlide>
            )
            })
        }
        {/* <SwiperSlide>
            <img src='./images/1.png' alt='slide'/>
        </SwiperSlide>
        <SwiperSlide>
            <img src='./images/2.jpg' alt='slide'/>
        </SwiperSlide>
        <SwiperSlide>
            <img src='./images/3.png' alt='slide'/>
        </SwiperSlide>
        <SwiperSlide>
            <img src='./images/4.jpg' alt='slide'/>
        </SwiperSlide>
        <SwiperSlide>
            <img src='./images/5.jpg' alt='slide'/>
        </SwiperSlide> */}
    </Swiper>
    </>
  )
}

export default Banner