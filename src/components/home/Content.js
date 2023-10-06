import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    padding-bottom: 48px;
`
const ContainerWrap = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    padding: 0 2%;
`
const ContentTitle = styled.div`
    width: 100%;
    margin-top: 3rem;
    text-align: center;
    margin-bottom: 1.25rem;
    position: relative;
    &::after{
        content: "";
        position: absolute;
        width: 3%;
        /* width: 2.5%; */
        height: 2px;
        background-color: #111;
        left: 50%; bottom: 45%; translate : (-50%, -50%);
        /* left: 40.5%; top: 0; */
    }

`
const Title = styled.h3`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;

`
const Desc = styled.p`
    font-size: 0.875rem;
    color: #a0a0a0;
`
const ContentGrid = styled.div`
    flex-basis: 100%;
    display: flex;
    flex-wrap: wrap ;
    justify-content: space-between;
`
const ContentItem = styled.div`
    flex-basis: 100%;
    margin-bottom: 0.75rem;
    position: relative;
    @media screen and (min-width: 640px){
        flex-basis: 48.5%;
        margin-bottom: 1.25rem;
    }
    @media screen and (min-width: 1024px){
        flex-basis: 23.5%;
        margin-bottom: 0;
    }
    img{width:100%;}
    div{
        padding: 1rem 1.25rem;
        background-color: rgba(225,225,225,0.2);
        text-align:center;
        position: absolute;
        bottom: 0;
    h3{
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    p{
        /* ... 표현할때 첫째줄에 ... whitespace 둘째줄에서 ...표현하고싶을때*/
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    }
        
    
`


function Content() {
    const data = [
        {
            "img": "https://via.placeholder.com/280x340",
            "title": "컨텐츠 제목 1",
            "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Harum odit sit excepturi nulla recusandae repellendus dolorem provident saepe."
        },
        {
            "img": "https://via.placeholder.com/280x340/143",
            "title": "컨텐츠 제목 2",
            "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Harum odit sit excepturi nulla recusandae repellendus dolorem provident saepe."
        },
        {
            "img": "https://via.placeholder.com/280x340/444",
            "title": "컨텐츠 제목 3",
            "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Harum odit sit excepturi nulla recusandae repellendus dolorem provident saepe."
        },
        {
            "img": "https://via.placeholder.com/280x340/051",
            "title": "컨텐츠 제목 4",
            "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Harum odit sit excepturi nulla recusandae repellendus dolorem provident saepe."
        }

    ]

    return (
        <>
            <Container>
                <ContainerWrap>
                    <ContentTitle>
                        <Title>컨텐츠 제목구간</Title>
                        <Desc>해당 컨텐츠 설명구간 Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptatibus id quod molestiae eveniet, deserunt ratione porro voluptate nostrum. Perferendis quos repellat dolores, facere provident corporis aut architecto doloremque aliquam?</Desc>
                    </ContentTitle>
                    <ContentGrid>
                        {data.map((e, i) => {
                            return (
                                <ContentItem key={i}>
                                    <img src={e.img} alt={e.title} />
                                    <div>
                                        <h3>{e.title}</h3>
                                        <p>{e.desc}</p>
                                    </div>
                                </ContentItem>
                            )

                        })

                        }
                    </ContentGrid>
                </ContainerWrap>
            </Container>
        </>
    )
}

export default Content