import React from 'react'
import { collection, query, where, getDoc, getFirestore, getDocs } from 'firebase/firestore'
import { firebaseAuth, sendPasswordResetEmail } from '../firebase'
import styled from 'styled-components'
import Modal from '../components/Modal'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Container = styled.div`
    display: flex;
    background-color: #f5f5f5;
    justify-content: center;
    height: calc(100vh - 86px);
    align-items: center;
`
const FindMail = styled.div`
    width: 35vw;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background-color: #fff;
    border-radius: 10px;
    @media screen and (max-width :1024px){
        width: 60vw;
    }
    @media screen and (max-width :640px){
        width: 70vw;
    }
`
const Title = styled.h1`
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
`
const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    padding-left: 45px;
    transition: border-color 0.4s;
    &:focus{
        border-color : #007bff;
        outline: none;
    }
    &::placeholder{opacity: 0;}


`

const InputWrapper = styled.div`
    position: relative;
    margin-bottom: 20px;
    &:last-child{
        margin-bottom: 0; margin-top: 20px;
        justify-content: flex-end;
        display: flex;
        column-gap: 20px;
        a{
            background-color: #40e0d0;
            font-size: 14px;
            text-align: center;
            padding: 5px 20px;
            border-radius: 5px;
            color: #fff;
            &:last-child{
                background-color: #036;
            }
        }
        }
    input:focus+ label,
    /* input에 값이 없다면 유지 */
    input:not(:placeholder-shown) + label{
        top: 4px;
        left: 4px;
        font-size: 8px;
        color: #007bff;
    }
`
const Label = styled.label`
    position: absolute;
    top: 10px; left: 10px;
    font-size: 14px; color : #999;
    transition: all 0.3s;
    /*  */
    pointer-events: none;

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






function Findemail() {


    // 이름과 폰번호 일치하는 사용자 찾을 때 필요 
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [message, setMessage] = useState("");
    const [resultEmail, setResultEmail] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const PhoneNumber = (e) =>{
        let value = e.target.value;
    e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/-{1,2}$/g, "");

    setPhoneNumber(value);
}
const isValidPhone = (phoneNumber) =>{
    const regex = /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/;
    return regex.test(phoneNumber)
}


    const findID = async ()=>{
       
        let errorMessage = "";
         if(name.length === 0){
            setIsModalOpen(true);
            setMessage("이름이 비어있습니다.");
         }else if(!isValidPhone(phoneNumber)){
       
            setMessage("유효한 전화번호를 입력해주세요");
            setIsModalOpen(!isModalOpen)
            return;
        }
        try{
                const userQuery = query(
                    collection(getFirestore(),'users'),
                    // 이름과 폰 넘버가 같은 users를 찾아주기.
                    where("phoneNumber", '==', phoneNumber),
                    where("name", '==' , name)
                );
                const querySnapshot = await getDocs(userQuery);
                console.log(querySnapshot)
            if(querySnapshot.empty){
                setMessage("가입한 계정이 없습니다.");
                setIsModalOpen(!isModalOpen)
                return;
            }

            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            console.log(userData)
            
            const email = userData.email; 
            setResultEmail(email);  

            if(!email)    {
                setMessage("이메일 정보를 찾을 수 없습니다.");
                setIsModalOpen(!isModalOpen)
                return;
            }
            // 정규식 인터넷 검색 ㄱ q보안상 이메일 가려주기.
            const maskEmail = email.replace(/(.{3}).+(@.+)/, "$1*****$2")
            setIsModalOpen(!isModalOpen)
            setMessage(`귀하의 이메일 주소는 ${maskEmail} 입니다.`)
        

        }catch(error){
            setMessage(error);
            setIsModalOpen(!isModalOpen)
        }
    }

    const passwordEdit = ()=>{
        //  자체적으로 제공하는 함수
        sendPasswordResetEmail(firebaseAuth, resultEmail)
        .then(function () {
            setMessage(`귀하의 ${resultEmail.replace(/(.{3}).+(@.+)/, "$1*****$2")}로 메일을 발송 하였습니다.`);
                setIsModalOpen(!isModalOpen)
                return;
            
        }).catch(error =>{
            setMessage(error);
            setIsModalOpen(!isModalOpen)

        })
    }

// 로그인이 안됐을때 정보 수정
const userState = useSelector(state => state.user);
console.log(userState.loggedIn)
  return (
    //   mpa돌리고 프래그먼트에 키값을 주고 싶다면 <React.Fragement key = {i}>로 써준다
 
    <>
        {!userState.loggedIn ? "" : 

        <Container>
            <FindMail>
                <Title>이메일 및 비밀번호 재설정</Title>
                <InputWrapper>
                    <Input type='text' placeholder='이름을 입력해주세요' value={name} onChange={(e)=> setName(e.target.value)}/>
                    <Label htmlFor="name">이름</Label>
                </InputWrapper>
                <InputWrapper>
                    <Input type='text' placeholder='전화번호를 입력해주세요' value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)}
                    // 하이픈2개 +  전화번호 라서 masLength13
                    onInput={PhoneNumber} maxLength={13}/>
                    <Label htmlFor="phoneNumber">전화번호</Label>
                </InputWrapper>

                <p>{message}</p>
                <InputWrapper>
                    <Button onClick={findID}>이메일 찾기</Button>
                </InputWrapper>
        {resultEmail && <Button onClick={passwordEdit}>패스워드 재설정</Button>}
            </FindMail>
        </Container>
        }
        {isModalOpen && <Modal error={message} onClose={()=>{setIsModalOpen(false)}}/>}
    </>
    
  )
}

export default Findemail


