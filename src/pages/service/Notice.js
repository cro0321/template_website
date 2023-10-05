// getDocs 문서 다 가져오는것 orderBy순서 최신순 query어떠 한 프로그램(?)에서 내가 가지고 오고싶은 부분을 가져오는것
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const BoardWrapper = styled.div`
  max-width: 1000px;
  margin: 50px auto;

`
const Title = styled.div`
  padding: 10px 20px;
  font-size: 24px;
  font-weight: bold;
  
`

const List = styled.ul`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
`
const ListItem = styled.li`
  padding: 10px 20px; text-align: center;
  flex-basis: 10%;
  &:nth-child(2){flex-basis:50%} 
  &:nth-child(3){flex-basis:20%} 
  &:nth-child(4){flex-basis:20%} 
`

const ButtonWrap = styled.div`
    display: flex;
    justify-content: flex-end;

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





function Notice() {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    const fetchPosts = async () =>{
      try{
        const q = query(collection(getFirestore(), 'notice'), orderBy ("timestamp", 'desc'));
        //desc - 내림차순 /asc - 오름차순
        // q를 다 가져온다.
        const snapShot = await getDocs(q);
        // firebase에서 doc.data는 전체 content email name nickname timestamp title 이 다 들어가 있는것 그리고 클릭했을때(?)id 값이 필요하니까 id값을 또 따로 저장해준것.
        const postArray = snapShot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setPosts(postArray);
    
      }catch(error){
        console.log(error);
      }
    }
    fetchPosts()
  },[])
  const toggleLike = (index) =>{
    // 1.원래 값을 복사 
    // 2. 복사한 배열의 원하는 인덱스 번호의 값을 변경
    // 3. 그 값을 원래 값에 붙여넣기 
    // 원하는 배열을 복사해서 각각 스테이트값을 변경하려면
    const newLikes = [...likes];
    newLikes[index] = !newLikes[index]
    setLikes(newLikes);
  }


  const [likes, setLikes] = useState(Array(posts.length).fill(1));

  // 데이터가 없을때는 화면이 안보이게 설정하려면?
  if(posts.length === 0){
    return <div>로딩중</div>
  }

  return (
    <>
    
      <BoardWrapper>
        <Title>공지사항</Title>
          <List>
            <ListItem>번호</ListItem>
            <ListItem>제목</ListItem>
            <ListItem>작성자</ListItem>
            <ListItem>작성일</ListItem>
            <ListItem>조회수</ListItem>
            <ListItem>좋아요</ListItem>

          </List>
     
          {
          posts.map((e,i)=>{
              return (
              <List key={i}>
                {/* 최대갯수 ex3개 -0 하면 =3  최대갯수-index값하면 됨 */}
                {/* e는 각각 1개 1개 1개 요소만 나와주는것 그래서 length를 출력 못함 posts는 전~~체 싹~~~다 가져와 주는것*/}
                <ListItem>{posts.length - i}</ListItem>
                <ListItem><Link to ={`/view/notice/${e.id}`}>{e.title}</Link></ListItem>
                <ListItem>{e.nickname}</ListItem>
                {/* timestamp는 유형이라(firestore에서 제공)을 날짜형식으로 바꾼후 스트링(문자열)으로 바꿔서 출력해줘야한다. */}
                <ListItem>{e.timestamp.toDate().toLocaleDateString()}</ListItem>
                <ListItem>{e.view}</ListItem>
                <ListItem onClick={()=>{toggleLike(i)}}>{likes[i]? "༼ つ ◕_◕ ༽つ" : "🤍"}</ListItem>
              </List>
              )
          })

          }
          
          
      <ButtonWrap>
        <Button><Link to="/write/notice"><FontAwesomeIcon icon= {faPen}/>글쓰기</Link></Button>
      </ButtonWrap>
      </BoardWrapper>
    </>
  )
}

export default Notice