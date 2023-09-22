import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
// deleteDoc삭제 기능
import {addDoc, collection, deleteDoc, doc, getDoc, getFirestore, increment, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPen, faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';




const Container = styled.div`
    background-color: #f5f5f5;
    height: calc(100vh- 86px);
    padding: 50px 0;

`
const ContentWrap = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid rgba(151,157,172,0.28);
    border-radius: 10px;
`

const Content = styled.div`
    border-bottom: 1px solid rgba(151,157,172,0.28);
    padding-bottom: 5px;
    > div{
        margin-top: 12px;
        width: 50%;
        display: flex; justify-content: space-between;
    }
`

const ButtonContent = styled.div`
    display: flex;
    justify-content: space-between;
`

const ButtonWrap = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    column-gap: 20px;
    &:nth-child(2) > button:nth-child(1){background-color: #115e59;}
    &:nth-child(2) > button:nth-child(2){background-color: #901c1c;}
`

const Button = styled.button`
    border-radius: 0.5rem;
    margin: 20px 0px;
    background-color: #1d4ed8;
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: bold;
    color : #fff;
    display: flex; align-items: center;
    outline: none;
    border: none;
    cursor: pointer;
    &:nth-of-type(2){
            background-color: #7e22ce;
    }
    a{color: #fff;}
    svg{margin-right:12px;}
`
// 댓글알바 댓글조작 
const CommentWrap = styled.div``
const Comment = styled.div``


function View() {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState("");
    const { board, view } = useParams();
    const boards = ["notice", "online", "qna", "gallery"];
    const [isModal, setIsModal] = useState(false);
    const navigate = useNavigate();
    const [post, setPost] = useState();
    console.log(post)
    const [message, setMessage] = useState("");
    const userState = useSelector(state => state.user);
    const uid = sessionStorage.getItem("users");
    const [userUid, setUserUid] = useState(uid)
    
useEffect(()=>{

    const postRef = doc(getFirestore(), board, view);
    const commentRef = collection(postRef, "comments");

    const q = query(commentRef, orderBy("timestamp", "desc"));

    const dataSnap = onSnapshot(q, (item)=>{
      const fetchComment = item.docs.map(doc =>({
        id: doc.id,
        ...doc.data()
    }))
    setComments(fetchComment)
    })
    return dataSnap;
},[board,view])

    const viewCnt = async(board, view) =>{
        const viewRef = doc(getFirestore(), board, view);
        await updateDoc(viewRef ,{
            // 조회수 : 증감함수(!) -> 1씩증가
            view : increment(1)
        })

    }

useEffect(() => {
    
 
        const fetchData = async ()=>{
            const postRef = doc(getFirestore(), board, view);
            const postSnapShot = await getDoc(postRef);
        
            // postSnapShot에 데이터가 있는지 화인하는 코드 .exists()
            if(postSnapShot.exists()){
                setPost(postSnapShot.data())
                // 문서가 있을때만 카운트 되게
                viewCnt(board, view)
                setUserUid(postSnapShot.data().uid);


            }else{
                setIsModal(true)
                setMessage("해당 문서가 존재하지 않습니다.")
            }
            // if문에 의해서 안의 함수들이 다 실행되고 나서(문서를 다 가져오고 난 후 ) 조회수가 올라가줘야 하기 떄문에 if문 다 끝나고 실행시켜줌 파라미터로 board 값과 view를 받아와줘야함 
            // fetchData()실행
        }
        fetchData()
}, [board, view])

const memberProfile = useSelector(state => state.user);
    // 내가 쓴 글인지 체크해서 다른아이디면 글쓰기 삭제 수정 못하게 하기(비회원 포함) 내가 쓴 글에서만 글 수정삭제 나오게하고 관리자 아이디에서 글 수정삭제 다 나오게하기.
console.log(memberProfile)

const addComment = (view =>{
    const postRef = doc(getFirestore(), board, view);
    const commentRef = collection(postRef, "comments");
    // 파이어베이스 데이터베이스에 필드안에 commnet라는 공간을 또 만들어서 댓글을 저장하는 넉김적이 넉김넉김
    addDoc(commentRef, {
        text: comment,
        nickname : userState&&userState.data.nickname,
        timestamp : serverTimestamp()

    })

})

 function formatDate(data) {
    if(data){
        const date = data.toDate();
        const year = date.getFullYear();
        // getMonth가 0부터 시작해서 +1
        const month = String(date.getMonth()+1).padStart(2,"0");
        const day = String(date.getDate()).padStart(2,"0");
        return `${year}-${month}-${day}`
    }
 }




    
    const deletePost = async () =>{
        if(window.confirm("정말로 삭제하시겠습니까?")){
            // 인증 ->게시판 ->원하는 문서 
            const docRef = doc(getFirestore(), board , view);
            
            await deleteDoc(docRef);

            alert("게시물이 삭제 되었습니다.");
            navigate(`/service/${board}`)

        }
     }
     
    if (!boards.includes(board)){
        return (
            <>
                {
                    isModal && <Modal error="잘못된 게시판입니다!" onClose={() => { setIsModal(false); navigate('/') }} />
                }
            </>

        )
    }

    if(isModal){
        return(
            <Modal error={message} onClose={() => {setIsModal(false); navigate(`/service/${board}`) }} /> 
      
        )
    }

    if (!post) {
        return (
            <div>로딩중</div>
        )
    }



    // const wow = () =>{
    //     if( post.uid === memberProfile.uid){
    //         <ButtonWrap >
    //                     <Button onClick={()=>{navigate(`/edit/${board}/${view}`)}}  ><FontAwesomeIcon icon = {faPenSquare}/> 수정</Button>
    //                     <Button onClick={deletePost}><FontAwesomeIcon icon = {faTrash}/> 삭제</Button>
    //                 </ButtonWrap> 
    //     }else if(post.uid === "s0NWelwP8WTNZuyvHRWzISprshC3"){
    //         <ButtonWrap >
    //         <Button onClick={()=>{navigate(`/edit/${board}/${view}`)}}  ><FontAwesomeIcon icon = {faPenSquare}/> 수정</Button>
    //         <Button onClick={deletePost}><FontAwesomeIcon icon = {faTrash}/> 삭제</Button>
    //     </ButtonWrap> 
    //     }else{
    //         back()
    //     }
    // // }
    return (
        <>
     
        <Container>
            <ContentWrap>
     
                <Content>
                    <h2>{post.title}</h2>
                    <div>
                        <span>이름 : {post.nickname}</span>
                        <span>작성일 : {post.timestamp.toDate().toLocaleDateString()}</span>
                        <span>조회수 : {post.view}</span>
                    </div>
                </Content>
            {/* // 비회원일때 튕겨내줌 */}
                  
            {/* react에서 에디터일때 innerHtml하는방법 */}
            <div dangerouslySetInnerHTML={{__html: post.content}} />
            <CommentWrap>
                {
                    // 비회원일때 댓글쓰기 막아주기 위해서 uid &&
                      uid  && 
                <Comment>

                    <textarea value={comment} onChange={(e)=> setComment(e.target.value)}/>
                    <Button onClick={()=>{addComment(view)}}>댓글달기</Button>
                </Comment>
                }   
            </CommentWrap>
                <ul>
                {
                    comments.map((e,i)=>{
                        return(
                            // {e.timestamp.toDate().toLocaleDateString()} formatDate
                            <li key={i}>{e.text}<span>{formatDate(e.timestamp)}</span></li>
                        )
                    })
                }
                </ul>
            
                <ButtonContent>
                    <ButtonWrap>
                        <Button onClick={()=> {navigate(`/serive/${board}`)}}><FontAwesomeIcon icon = {faList}/> 목록</Button>
                        <Button onClick={()=> {navigate(`/write/${board}`)}}><FontAwesomeIcon icon = {faPen}/> 글쓰기</Button>
                    </ButtonWrap>
                    {
                        uid && uid === userUid &&
                    <ButtonWrap >
                        <Button onClick={()=>{navigate(`/edit/${board}/${view}`)}}  ><FontAwesomeIcon icon = {faPenSquare}/> 수정</Button>
                        <Button onClick={deletePost}><FontAwesomeIcon icon = {faTrash}/> 삭제</Button>
                    </ButtonWrap> 

                    }
                
                  
                </ButtonContent>
             
            </ContentWrap>
            <img src="https://firebasestorage.googleapis.com/v0/b/reacttemplate-af3d7.appspot.com/o/582092-minion-desktop.png?alt=media&token=77472939-42d9-47e6-bd6d-bec98f29bad8" alt="" />
        </Container>
        

        </>
    )
}

export default View