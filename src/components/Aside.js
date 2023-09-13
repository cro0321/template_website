import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { toggleTheme } from '../store'
    const ASide = styled.div`
        position: fixed;
        right: 20px;
        bottom: 20px;
        border: 1px solid #ddd;
        background-color: ${({$isdark})=> ($isdark === 'light' ? "#fff" : "#333")};
        border-radius: 5px;
        cursor: pointer;
        width: 50px; height: 50px; line-height: 50px;
        text-align: center;
        svg{
          color : ${({$isdark})=> ($isdark === 'light' ? "#333" : "#fff")};
        }
    `


//app.js에서 만든 이벤트를{ThemeSelect}넣어주면 만들수있다.
//themeConfig를 받아와서 icon에 넣어준다
function Aside() {

  const theme = useSelector(state => state.dark);
  const dispatch = useDispatch()

  return (

   
    <ASide $isdark = {theme} onClick={()=>{dispatch(toggleTheme())}}>
        <FontAwesomeIcon icon = {theme ==='light' ? faMoon : faSun} size='lg'/>
    </ASide>
  )
}

export default Aside