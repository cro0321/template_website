import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';
import { useState } from 'react';
// addDocument 문서 인증 서버시간 
import { addDoc, collection, doc, getFirestore, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
// link NavLink 차이점 active의 차이임 active
//useNavigate는 navgate를 강제로 이동시킬때
import { Link,  useNavigate, useParams } from 'react-router-dom';
import { faList, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'



const ButtonWrap = styled.div`
    display: flex;
    justify-content: space-between;

`
const Button = styled.button`
    border-radius: 0.5rem;
    margin: 20px 0px;
    background-color: rgb(126,34,206);
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: bold;
    color : #fff;
    display: flex; align-items: center;
    outline: none;
    border: none;
    cursor: pointer;
    &:nth-child(1){
            background-color: rgb(29,78,216);
    }
    a{color: #fff;}
    svg{margin-right:12px;}
`


function Ckeditor({ title, postData }) {
    const memberProfile = useSelector(state => state.user);
    const [isModal, setIsModal] = useState(false);
    const navigate = useNavigate();
    const {board, view} = useParams();
    const [writeData, setWriteData] = useState("");
    // console.log(memberProfile)
    const [message, setMessage] = useState("");
    const [editorInstance, setEditorInstance] = useState(null);
    // 갤러리
    const [fileUrl, setFileUrl] = useState("");


    useEffect(()=>{
        if(postData){
            setWriteData(postData.content);
        }
    },[postData])
    
    
    const dataSubmit = async () =>{
        console.log(title.length)
        if(title.length === 0){
            setIsModal(!isModal);
            setMessage("제목을 입력해주세요");
            return;
            
        }else if(writeData.length === 0){
            setIsModal(!isModal);
            setMessage("내용을 입력해주세요");
            return;
        }

        try{

            if(board && view){
                const postRef = doc(getFirestore(),board, view);
                await updateDoc(postRef,{
                    title : title,
                    content : writeData
                })
                alert("게시글이 성공적으로 수정되었습니다.")
            }else{
                // input으로 데이터 넘길때 files[0]-> 파일정보 가져오는 기본문법
                const fileInput = document.querySelector("#file").files[0];
                console.log(fileInput)
                if(fileInput){
                    uploadToFirebase(fileInput)
                }
                // 접속한 board값을 체크해줘서 가져와주면 되는데 그게useParams를 사용해서 가져와준다.
                // 문서를 추가(어떤 데이터베이스에(스토어를인증, 접속한 데이터베이스에))
                await addDoc(collection(getFirestore(),board),{
                    title : title,
                    content : writeData, 
                    //조회수
                    view : 1,
                    // 고유id
                    uid : memberProfile.uid,
                    name : memberProfile.data.name,
                    email : memberProfile.data.email,
                    nickname : memberProfile.data.nickname,
                    file : fileUrl,
                    timestamp : serverTimestamp()
                })
                alert("게시글이 성공적으로 등록 되었습니다.");
            }
            // 글이 성공적으로 떴을때
            navigate(`/service/${board}`)

        }catch(error){
            setIsModal(!isModal);
            setMessage(error);
        }
    
    }

    const uploadToFirebase = async (file) =>{
        //  reF(인증, '폴더명/' + file.파일명) 파이어베이스에 미리 만드는게 x 이렇게 만들어주면 파이어베이스에 폴더가 만들어짐.
        const storageRef = ref(getStorage(), 'images/' + file.name);
        const upload = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) =>{
            upload.on('state_changed',
            (snapshot) =>{

            },


            (error) =>{ reject(error)},
            ()=>{
                getDownloadURL(upload.snapshot.ref).then((result)=>{
                    resolve(result)
                    console.log(result)
                    setFileUrl(result)
                })
                
            }
            
            )

        
        })
    }
    function UploadAdapter (editor){
        // ck에디터 5 이미지 업로드  파이어베이스에 만들어준 Storage의  allow read, write: if true <-값이 true로 되어줘야함.
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>{
            return {
                upload : async ()=>{
                    const file = await loader.file;
                    const downURL = await uploadToFirebase(file);
                    return { default : downURL}
                }
            }
        }
    }


    return (
        <>
                {
                    isModal && <Modal error ={message} onClose={()=>{setIsModal(false)}}/>

                }
   
            <CKEditor
                editor={ClassicEditor}
                data = {writeData}

                config={{
                    placeholder: "내용을 입력하세요.",
                    // ckeditor에 사진 업로드 하려면 직접 만들어줘야함 뭐를? 플러그인을 ckediotr 공식 홈페이지에 내용 있음.
                    extraPlugins : [UploadAdapter]
                }}
                onReady={editor => {
                    setEditorInstance(editor);
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setWriteData(data)
                    console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
            <input type='file' id='file'/>
            <ButtonWrap>
                <Button><Link to="/service/notice"><FontAwesomeIcon icon= {faList}/>목록</Link></Button>
                <Button onClick={dataSubmit}><FontAwesomeIcon icon= {faPen}/>완료</Button>
            </ButtonWrap>

        </>
    )
}

export default Ckeditor