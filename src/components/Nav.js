import { faArrowRightFromBracket, faLock, faUser, faChevronDown, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Mnav from './Mnav'
import { useSelector } from 'react-redux'

// a.active가 클릭했을때 active가 되면서 활성화 되는 기능 리액트 자체 제공하는 것


const NavContent =styled.div`
    width: 100%;
    position: sticky;
    top: 0;
    border-bottom: 1px solid rgba(225,225,225,0.3);
    background-color: #fff;
    z-index: 40;
`
const NavWrap =styled.div`
    max-width: 1280px;
    margin: 0 auto; display: flex; justify-content: space-between; align-items: center;
    padding: 10px 2%;
`
const NavLog =styled.div`
    img{width:100%;}
`
const NavList =styled.div`
    display: flex; justify-content: space-between; flex-basis: 66.66667%;
    @media screen and (max-width:1024px){
        display: none;
    }
    ul{
        display: flex; justify-content: space-between; flex-basis: 100%;
        li{
            position: relative; flex-basis: 25%; text-align: center;
           
        }
        
        a.active{
            font-weight: bold;
            color: orange;
        }
    }
`

const StyledIcon = styled(FontAwesomeIcon)`
    transition: all 0.5s;
    font-size: 12px;
    vertical-align: baseline;
    transform: rotate(${({$isopen})=> $isopen === "true" ? "180deg": "0"});
`

const NavSubmenu = styled.ul`
    position: absolute;
    background-color: rgb(30,41,59);
    transition: 0.5s;
  
    flex-wrap: wrap;
    text-align: center;
    /* 기본문법 $ {} (){}로 propes 값을 받아주고 => 함수형태로 작성 isopen이 "true" 일때 $height 아닐때 0px */
    height: ${({$isopen, $height}) => ($isopen === "true" ? $height : "0px")}; 
    overflow: hidden; 
    li{
        flex-basis: 100% !important;
        padding: 10px 0;
        a{
            color:#fff
        }
    }
    

`
const NavMember =styled.div`
    ul{
        display: flex; column-gap: 20px;
        
        a.active{
            font-weight: bold;
            color: orange;
        }
    }
    @media screen and (max-width: 1024px){
        display: none;
    }
   

`

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



// css
const Container = styled.div`
    width: 320px; 
    height: 100%;
    position: fixed;
    background-color: #f9fafb;
    /* 스타일 컴포넌트 안에서만 사용가능 예를들어 아래 미디어 스크린의 ul에는 propes가 적용되지 않는다. 적용시켜주려면 ul만의 스타일컴포넌트를 따로 작성해서 propes를 써주어야한다.  */
    right: ${({$isopen})=> $isopen ? "0px" : "-320px" };
    top: 0;
    padding: 48px;
    box-sizing: border-box;
    z-index: 40;
    transition: all 0.5s;
    > ul{
        margin-top: 24px;
        >li{
            padding: 20px; border-bottom: 1px solid #ddd;
            font-weight: bold;
            cursor: pointer;
        }
    }

`
const Msubmenu = styled(NavSubmenu)`
  
    width: 100%;
    position: relative;
    /* 투명  : transparent / unset : 초기화 background : none */
    background-color : unset;
    text-align: left;
    li{
        padding-left: 15px;
        a{color : #000;}
    }
 
  

  
`


// 위의 스타일을 그대로 가지고 오고싶을때는 div를 없애고  ()열고 안에 그 안에 스타일 변수 이름을 넣어주면 된다. 
const MsubmenuMember = styled(NavMember)`
    margin-top: 45px;
    ul{
        justify-content: center;
        li{
            border: 1px solid #ddd;
            padding: 10px; border-radius: 4px;
            background-color: purple;
            &:nth-child(2){
            background-color: green;
            
        }
        
        a{
            color: #fff;
            
        }
       
    }
    
            }
                @media screen and (max-width: 1024px){
                display: block;
            }

`



// userState props 받아서 쓸 경우 {userState2} 중괄호 꼭!!! 써주기
function Nav({userState2}) {

    const userState = useSelector(state => state.user);
    const [isHeight , setIsHeight]  = useState();

    const SubMenuHeight = (e)=>{
    const list = document.querySelectorAll(".sub_list")[e];
        // console.log(list);
    const listLength = list.querySelectorAll("li").length;
        // console.log(listLength);
        const value = listLength * 43+"px";
        // console.log(value)
        return setIsHeight(value)
    }
    
    
    
    // index번호가 0번부터나오기 때문에 -1로 isActive값을 설정
    const [isActive, setIsActive] = useState(-1)
    const [isActive2, setIsActive2] = useState(false);
    // 변수명 ['company'][0].title  사용방법 
    const SubData = {
        company: [
            {
                title:"인사말",
                link : "/company/greetings"
            },
            {
                title:"연혁",
                link : "/company/history"
            },
            {
                title:"내부전경",
                link : "/company/interior"
            },
            {
                title:"오시는길",
                link : "/company/directions"
            }
            
        ], 
        business: [
            {
                title:"사업소개",
                link : "/company/business-1"
            },
            {
                title:"사업소개2",
                link : "/company/business-2"
            },
            {
                title:"사업소개3",
                link : "/company/business-3"
            }
        ], 
        product: [
            {
                title:"제품소개",
                link : "/company/prodouct-1"
            },
            {
                title:"제품소개2",
                link : "/company/prodouct-2"
            },
            {
                title:"제품소개3",
                link : "/company/prodouct-3"
            }
        ], 
        service: [
            {
                title:"공지사항",
                link : "/service/notice"
            },
            {
                title:"온라인 상담",
                link : "/service/online"
            },
            {
                title:"질문과 답변",
                link : "/service/qna"
            },
            {
                title:"갤러리",
                link : "/service/gallery"
            }
        ], 
    }
    // 배열형태
    const SubMenu = [
        ["인사말", "연혁", "내부전경" , "오시는길"],
        ["사업소개", "사업소개2", "사업소개3"],
        ["제품소개", "제품소개2", "제품소개3"],
        ["공지사항", "온라인 상담", "질문과 답변", "갤러리"]
    ]
    const SubMenuLink = [
        ["/company/greetings", "/company/history", "/company/interior", "/company/directions"],
        ["/business/business-1","/business/business-2", "/business/business-3"],
        ["/prodouct/prodouct-1","/prodouct/prodouct-2","/prodouct/prodouct-3"],
        ["/service/notice", "/service/online","/service/qna" ,"/service/gallery"]
    ]


    //배열 형태 
    // const Nav = [
    //     ["회사소개", "사업소개", "제품소개" , "고객센터"],
    //     ["/company", "/business", "product", "/service"]
    // ]
    // json object 형태 
    const Nav = [
        {
            title: "회사소개",
            link : "company"
        },
        {
            title: "사업소개",
            link : "business"
        },
        {
            title: "제품소개",
            link : "product"
        },
        {
            title: "고객센터",
            link : "service"
        }
    ]
    



    return (

 <>
    <NavContent>
        <NavWrap>
            <NavLog>
                <NavLink to="/">
                    <img src="https://via.placeholder.com/120x60" alt="로고"/>
                </NavLink>
            </NavLog>
            <NavList>
                <ul>
                    {
                        // Nav에 배열이 2개 들어가 있고 첫번째 배열만 돌려줘야해서 [0] 을해준다
                        // Nav[0].map((e,i)=>{
                        //     return (
                        //         <li><NavLink to={Nav[1][i]}>{e}</NavLink></li>
                        //     )
                        // })
                        
                        Nav.map((e,i)=>{
                            return(
                                // isActive가 i와 같을때 on 나오게 해주고 mouseOut일때는 -1값이라 나오지 않게 해야함.
                                <li onMouseOver={()=>{setIsActive(i); SubMenuHeight(i) }} 
                                    //SubMenuHeight === i ? '' : ''
                                    onMouseOut={()=>{setIsActive(-1);}} key={i}><NavLink to={`/${e.link}`}>{e.title}</NavLink><StyledIcon icon={faChevronDown} $isopen={isActive === i ? "true" : "false"}/>
                                    {/*  style={{height: isActive === i && isHeight}} */}
                                    {/* 그냥 쓰게 되면 속성으로 잡히고(누군가 데이터를 볼 수 있음 콘솔찍었을때) $를 쓰고 넘기게 되면 데이터로 볼 수 없게된다(콘솔에 안찍힘)소문자를 권장한다. boolean 속성으로 그냥 true/false 쓰지말고(경고창뜸) 문자열로 묶어서 "true"  "false" 로 쓰기 */}
                                    <NavSubmenu className={`sub_list`} $isopen={isActive === i ? "true" : "false" } $height = {isHeight} >
                                        {
                                            // return 생략하고 쓸때 {} 빼고 
                                            SubData[e.link].map((el,index)=>
                                                <li key={index}><NavLink to ={el.link}>{el.title}</NavLink></li>
                                              
                                            )
                                        }
                                    </NavSubmenu>
                                </li>
                            )
                        })
                    }
                </ul>
      
            </NavList>
            <NavMember>
                <ul>
                    <li>
                        <NavLink to={userState2.data?.nickname? "/logout" : "/login"}>
                            <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> {userState2.data?.nickname? "로그아웃" : "로그인"}
                        </NavLink>
                    </li>
                   {
                    userState.data?.nickname ? 
                    // 참일때 로그인 상태
                    <li>
                        <NavLink to="/modify">
                            <FontAwesomeIcon icon={faUserPen}></FontAwesomeIcon> 정보수정
                        </NavLink>
                     </li>
                    :
                    
                    <li>
                        <NavLink to="/member">
                            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> 회원가입
                        </NavLink>
                      </li> 

                   }
                </ul>
            </NavMember>
        </NavWrap>
    </NavContent> 
  
  {/* true  false인 경우에만 부정을 !표로 줄일 수 있다. isActive2 === true ? 'on' : ""   ->isActive2 ? 'on' : ""  -> 비어있는 값이 있다면 isActive2 && 'on' 이렇게 축약해서 나타낼수있다.*/}
    <Hamburger  className={isActive2 && 'on' } onClick={()=>{setIsActive2(!isActive2)}}>
            
            {
                //배열을 3개 돌리는데 아무런 데이터 없이 undefinde 값이 3개 돌아감. 그 배열의 데이터가 없거나 필요 없을때 i값만 필요할 때 앞쪽의 파라미터를 _로 표현한다.
                Array(3).fill().map((_,i)=>{
                    return (
                        <div key={i}></div>
                    )
                })
            }

    </Hamburger>


    <Container $isopen={isActive2}>
        <MsubmenuMember>
                <ul>
                    <li>
                        <NavLink to={userState2.data?.nickname? "/logout" : "/login"}>
                            <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> {userState2.data?.nickname? "로그아웃" : "로그인"}
                        </NavLink>
                    </li>
                    <li>
                        
                        <NavLink to="/member">
                            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> 회원가입
                        </NavLink>
                    </li>
                </ul>
        </MsubmenuMember>
            <ul>
            {   
            // 모밭일 버전은 마우스오버가 없음 / 터치와 클릭은 드래그가 되고 안되고의 차이 
                Nav.map((e,i)=>{
                    return(
                        <li key={i} onClick={()=> {
                            SubMenuHeight(i);
                           (isActive !== i ? setIsActive(i) : setIsActive(-1));
                           }}>{e.title}
                            <Msubmenu className='sub_list' $isopen={isActive === i ? "true" : "false"} $height={isHeight}>
                                {
                                    SubData[e.link].map((el,index) => {
                                        return(
                                            <li key={index}><NavLink to={el.link}>{el.title}</NavLink></li>
                                        )
                                    })
                                }
                            </Msubmenu>
                        </li>
                    )
                })
            }
            </ul>
    </Container>
  
  
  {/* 모바일네비 */}
  
   

 </>
  )
}

export default Nav