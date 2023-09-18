
import React, { useState } from 'react'
import styled from 'styled-components'
import { firebaseAuth, signInWithEmailAndPassword } from './../firebase'
import {useNavigate} from 'react-router-dom'
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore'
import { logIn, loggedIn } from '../store'
import { useDispatch } from 'react-redux'

// 이전페이지로 가기 위해서 필요 useHistory
// 이메일인증과 비밀번호 담는게 필요해서 useSTate 필요 


const Container = styled.div`
    display: flex;
    background-color: #f5f5f5;
    justify-content: center;
    height: calc(100vh - 86px);
    align-items: center;
`
const SignUp = styled.div`
    width: 35vh;
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






function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError]  = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // console.log(navigate)
    // 뒤로가기 해주려면 -1 navigate(-1)
    // navigate(-1)
    const errorMsg = (errorCode) =>{
        const firebaseError = {
            'auth/user-not-found' : "1 혹은 비밀번호가 잘못 되었습니다.",
            'auth/wrong-password' : "2 혹은 비밀번호가 잘못 되었습니다.",
            'auth/invalid-email'  : "3 혹은 비밀번호가 잘못 되었습니다."
        }

        return firebaseError[errorCode] || '알 수 없는 에러가 발생했습니다.'

    }
        // function앞에 async를 붙여주는거쉬 문법쓰... 무언가 시작하겠다는 뜻.
    const LoginForm = async (e) =>{
        e.preventDefault();
        // try안의 코드를 실행하고 성공하면 돌고  만약에 오류가 있다면 catch를 실행
        try{
            // await는 단독사용 불가 function안에서만 사용가능 async와만 사용할 수 있고 앞에 변수를 붙여서 사용 const userLogin = await/ 데이터가 완전히 들어올때까지 기다려달라는뜻 await  ex)공공데이터 가져와서 띄울때 콘솔에 undefine 뜨다가 데이터를 받아오는데 그 undefine값을 띄우지 않고 데이터를 다 받아올때 까지 기다렸다가 데이터를 출력하게 만드는것. 

            // async를 실행 후 await을 실행  signInWithEmailAndPassword(firebaseAuth, email, password) 정보가 userLogin으로 넘어간다. 실패하면 catch로 넘어감
            const userLogin = await signInWithEmailAndPassword(firebaseAuth, email, password)
            // 정상 로그인시에는 토큰정보와 user에 아이디도 나와줌  이메일이나 아이디 틀렸다면 오류~ auth/user-not-found 다 틀렸을때도 이런 오류 당연함~ 신기하다...  uid 고유 id  accessToken
            
            // 유저정보만 나옴
            const user = userLogin.user;
            console.log(userLogin)
            // 세션스토리지에 users에 user.uid값을 저장한다. 새로고침할때마다 사라짐 
            sessionStorage.setItem("users", user.uid)
            dispatch(logIn(user.uid));
            // collection은 하나의 문서를 가지고 오겠다 FireStore에서 users라는 키값의 user.uid라는 내용을
            const userDoc = doc(collection(getFirestore(),"users"),user.uid)
            const userDocSnapshot = await getDoc(userDoc)
            // console.log(userDocSnapshot.data())
            if(userDocSnapshot.exists()){
                const userData = userDocSnapshot.data();
                dispatch(loggedIn(userData));
                // 로그인 성공시 페이지가 뒤로가기 되면서 메인 나옴!
                navigate(-1);
            }
        }catch(error){
            // 에러코드 반환
            setError(errorMsg(error.code));
            console.log(error.code)
        }
    }

  return (
    <>
    <Container>
        <SignUp>
            <Title>로그인</Title>
            {email} {password}
            {/* form 으로 데이터 작성시 엔터치면 먹힘 onClick은 안먹힘 */}
            <form onSubmit={LoginForm}>
                <InputWrapper>
                {/* required input에서 있는지 없는지 확인하는 코드 */}
                    <Input type="email" className='email' placeholder='이메일' onChange={(e)=>{setEmail(e.target.value)}} required/>
                    <Label>이메일</Label>
                </InputWrapper>
                <InputWrapper>
                    <Input type="password" className='password' placeholder='비밀번호' onChange={(e)=>{setPassword(e.target.value)}} required/>
                    <Label>패스워드</Label>
                </InputWrapper>
                <Button>로그인</Button>
            </form>
            <p>{error}</p>
        </SignUp>
    </Container>
    
</>
  )
}

export default Login