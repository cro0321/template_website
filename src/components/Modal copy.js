import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const ModalBackground = styled.div`
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background-color: rgba(0,0,0,0.7);
    z-index: 999;
    display: flex; justify-content: center; align-items: center;
`
const ModalContent = styled.div`
    flex-basis: 360px;
    background-color: #fff;
    padding: 60px 20px 40px;
    border-radius: 8px;
    display: flex; justify-content: center;
    flex-wrap: wrap;
    >svg{
        flex-basis: 100%;
        font-size: 80px;
        color:red;

    }
    >p{
        font-size: 16px; font-weight: bold; margin: 24px 0;
    }
`
const Button = styled.button`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #007bff;
    border: none;
    color: #fff;
    cursor: pointer;
`


function Modal(props) {
  return (
    
    // isModal 이 true일때만 보여준다 (값이 있거나 참일때만)
    <ModalBackground>
        <ModalContent>
            <FontAwesomeIcon icon={faTriangleExclamation}/>

            <p>{props.error}</p>
            {/*  onClick={()=>{setIsModal(!isModal)}} */}
            <Button >확인</Button>
        </ModalContent>
    </ModalBackground>
    
  )
}

export default Modal