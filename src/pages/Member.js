import React, { useState } from 'react'
import styled from 'styled-components'
// 인증 , 회원가입 코드 
import { firebaseAuth, createUserWithEmailAndPassword } from './../firebase'
// 사용자 UID와 동일한 값까지 저장해주려고 필요함
import { doc, setDoc, getFirestore, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal';
import { logIn } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


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
`
// Input값을 상속 받지 못하는 이유는 두개의 속성이다름 Input Button 속성이라서.
const Button = styled.button`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #007bff;
    border: none;
    color: #fff;
    cursor: pointer;
`

const Password = styled.div`
    position: relative;
    width:100%;
    svg{
        position: absolute;
        right: 10px;
        top: 12.5px;
        cursor: pointer;
    }
`






function Member({ userState3 }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [nickname, setNickname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [eye, setEye] = useState([0, 0]);
    const [isModal, setIsModal] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userUid, setUserUid] = useState("");
    // 내가 접속한 주소가 member가 맞는지 확인하는것. 로그인하고 회원가입 누르면 false가 나오고 아니라면 true가 출력됨     alert(initialMode)
    const initialMode = window.location.pathname.includes("member");
    // console.log(initialMode && userUid)
    useEffect(() => {
        if (!initialMode) {
            // 로그인된 정보를 초기화하고 다시 가져와서 인증하는 코드
            firebaseAuth.onAuthStateChanged((user) => {
                if (user) {
                    setUserUid(user.uid)
                }

            })
        }

    }, [initialMode])



    useEffect(() => {
        if (!initialMode && userUid) {
            const fetchUSerData = async () => {
                const userRef = doc(getFirestore(), "users", userUid);
                const userSnap = await getDoc(userRef);
                // console.log(userSnap.data())
                if (userSnap.exists()) {
                    const data = userSnap.data();
                    setName(data.name)
                    setNickname(data.nickname);
                    setPhoneNumber(data.phoneNumber);
                    setEmail(data.email)
                }
            }
            fetchUSerData();
        }

    }, [initialMode, userUid])


    const toggleEye = (index) => {
        const newEye = [...eye];
        // 원래 있던 eye의 배열값을 복사해 배열을 벗긴다.
        //[[0,0]] > [] 없애는게 ... 표현 > 다시 말해서 같은값이 복사가 된다.
        newEye[index] = !newEye[index];
        // eye를 첫번째를 클릭 했다면 newEye[0]  = 부정 즉  false에서 true로 변경된다. -> [1,0]  0이 false 1이 true 
        // 바뀐 값이 setEye에 저장됨
        setEye(newEye)
        // 그리고 그 값을 쓰기 전용인 setEye에 새로운 배열값을 저장한다.
    }
    const PhoneNumber = (e) => {
        // replace(/[^0-9]/g, '') 숫자를 제외한 모든 문자열 제거 외울필요 없음 전화번호 정규식 검색 ㄱ
        let value = e.target.value;
        e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/-{1,2}$/g, "");

        setPhoneNumber(value);
    }


    const errorMsg = (errorCode) => {
        const firebaseError = {
            // 콘솔창에 키값 에러 메세지가 그대로 뜸 그게  한글로 바뀌어서 출력됨
            'auth/admin-restricted-operation': "빈 데이터가 있습니다.",
            'auth/email-already-in-use': "이미 사용중인 이메일 주소",
            'auth/invalid-email': "유효하지 않은 이메일 주소",
            'auth/operation-not-allowed': "이메일/비밀번호 계정이 비활성화 되어 있습니다.",
            'auth/weak-password': "너무 짧은 비밀번호를 사용하였습니다.(6자리)",

        }

        return firebaseError[errorCode] || '알 수 없는 에러가 발생했습니다.'

    }

    const isValidPhone = (phoneNumber) => {
        // 전화번호 유효성 검사 외우지 말고 검색 ㄱ /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/ 중에 {2,3} 지금은 핸드폰 번호만 필요하니까 지역번호 필요 없음 / {3,4} 중간 자리 전화번호 3자리 또는 4자리 
        const regex = /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/;
        //test로 설정했기 때문에   일치하는 값이   있는지 true / false 값이 나옴 https://ju-note.tistory.com/19
        return regex.test(phoneNumber)
    }

    // 이메일 유효성 검사 react 검색 ㄱ
    const isValidEmail = (email) => {
        const regex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        return regex.test(email);
    }



    const signUp = async (e) => {
        e.preventDefault();

        let errorMessage = "";
        if (name.length === 0) {
            // sighUp이 실행된 순간 name이 없다면 바로 실행됨 
            errorMessage = "이름"
        } else if (nickname.length === 0) {
            errorMessage = "닉네임";
        } else if (!isValidPhone(phoneNumber)) {
            // return값 때문에 실행이 되지 않아서 setIsModal에 따로 주고 return을 걸어준것
            setError("유효한 전화번호를 입력해주세요");
            setIsModal(!isModal)
            return;
        } else if (!isValidEmail(email)) {
            setError("유효한 이메일을 입력해주세요");
            setIsModal(!isModal)
            return;
        } else if (password.length === 0 && initialMode) {
            errorMessage = "비밀번호";
        } else if (passwordConfirm.length === 0 && initialMode) {
            errorMessage = "비밀번호 확인";
        } else if (password !== passwordConfirm && initialMode) {
            setError("비밀번호가 일치하지 않습니다");
            setIsModal(!isModal)
            return;
        }


        if (errorMessage) {
            setError(errorMessage + "이(가) 비어 있습니다.")
            // 
            setIsModal(!isModal)
            return;
        }


        try {
            

            const userProfile = {
                name,
                nickname,
                phoneNumber,
                // 이메일 찾기 비밀번호 재설정까지 정보 추가하려고 이메일 추가함 wow
                email
            }



            // 위의 const {user}가 완전히 실행되기 전까지 setDoc는 동작하지 않는다
            // Wirte페이지의 addDoc의 차이점 내가 id를 직접 지정할 수 있고 add를 하면 랜덤값으로 들어갈 수 있다. 
            if (initialMode) {
                const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
              await setDoc(doc(getFirestore(), "users", user.uid), userProfile)
                sessionStorage.setItem("users", user.uid)
                dispatch(logIn(user.uid));

                alert("회원가입이 완료 되었습니다.");
            } else {
                if(userUid){
                    // 문서의 파이어스토어 인증 users정보의 userUid
                    const userRef = doc(getFirestore(),"users", userUid);
                    await updateDoc(userRef, userProfile);
                    alert("정보 수정이 완료 되었습니다.")
                }else{
                    setError("회원 정보가 없습니다.");
                    setIsModal(!isModal);
                    return;

                }
            }
            navigate('/');

        } catch (error) {
            setError(errorMsg(error.code));
            setIsModal(!isModal)
            console.log(error.code);
        }
    }
    // userState의 값 중에서 loggedIn의 로그인상태(true false)가 필요하기 때문에 
    const userState = useSelector(state => state.user);
    console.log(userState.loggedIn)



    return (
        <>
            {
                // isModal && <Modal error={error} />
                // 작명에 어떤 값  prpoes는 html 속성 처럼 넣어주면 된다.
                isModal && <Modal abcd="1234" error={error} onClose={() => { setIsModal(false) }} />
            }
            {
                //화면 처음에는 안보이게 하기위해 Container위에 위치하고 이미 로그인 상태가 아니라면 Container 자체가 보여주면 되니까 아니라면에 : 넣어주면 된다.
                // ture 일때는 === true생략가능 false를 생략하려면 맨앞에 !
                // && initialMode 후 정보수정 누르면 잘 넘어감(페이지이동) member주소로 들어가게 되면 이미로그인 된 상태라고 튕기게 된다.
                userState.loggedIn && initialMode ? <Modal error="이미 로그인 된 상태입니다." onClose={() => { navigate('/') }} /> :

                    <Container>


                        <SignUp>
                            <Title>{userState.loggedIn ? "정보수정" : "회원가입"}</Title>

                            <Input defaultValue={name} onChange={(e) => { setName(e.target.value) }} type="text" className='name' placeholder='이름' />

                            <Input defaultValue={nickname} onChange={(e) => { setNickname(e.target.value) }} type="text" className='nickname' placeholder='닉네임' />

                            {/* 전화번호 하이픈 추가 정규식 코드라 검색 ㄱㄱ  maxLength 최대길이 제한  */}
                            <Input defaultValue={phoneNumber} maxLength={13} type="text" className='phone' onInput={PhoneNumber} placeholder='전화번호' />

                            <Input type="email" defaultValue={email} className='email' onChange={(e) => { setEmail(e.target.value) }} placeholder='이메일' />
                            {
                                initialMode &&
                                <>

                                    <Password>
                                        <Input type={eye[0] ? 'text' : "password"} className='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='비밀번호' />
                                        <FontAwesomeIcon icon={eye[0] ? faEye : faEyeSlash} onClick={() => { toggleEye(0) }} />
                                    </Password>
                                    <Password>
                                        <Input type={eye[1] ? 'text' : "password"} className='confirm_password' onChange={(e) => { setPasswordConfirm(e.target.value) }} placeholder='비밀번호 확인' />
                                        <FontAwesomeIcon icon={eye[1] ? faEye : faEyeSlash} onClick={() => { toggleEye(1) }} />
                                    </Password>
                                </>

                            }
                            <Button onClick={signUp}>{userState.loggedIn ? "수정" : "가입"}</Button>
                        </SignUp>

                    </Container>
            }
        </>

    )
}

export default Member