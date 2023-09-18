import React, { useEffect, useState } from 'react'

function Example() {
    // Promise - 어떤 값을 반환하거나 오류를 던질거라는 약속! 
    // async / await - 약속의 결과를 기다릴 때 사용하는 문법
    // 성공을 실패로 돌리거나 대기로 돌릴 수 없다.
    // Promise - 3가지 상태가 존재한다. 

    // pending - 대기 / resolved - 성공 / rejected - 실패
    

    // 성공 실패 코드를 써두고 Promise에게 판정을 맡김 판정기계쓰 ex 1+1이 맞음? ㅇㅇ->then ㄴㄴ->catch
    // function에 파라미터 2개 필요 성공 실패

    // Promise는 항상 객체 형태로 반환된다 console찍어보면 객체형태로 나옴
    let data = new Promise(function(resolved,rejected){

        //성공 resolved()
        // 실패 rejected()
        // value값을 넘기고싶다면
            let value = [
            {
                name: "홍길동",
                age: "123"
            }
        ];
        if((1+1) === 2){
            resolved(value[0])
        }else{
            rejected()
        }
        
    });
    
    console.log(data)
    // data가 성공했다면 then 실행
    data.then(function (res) {
        console.log("성공함"+ res.name)
    }).catch(function () {
        // data가 실패했다면 catch 실행
        console.log("오류가 뜸")
    })

    // 새로운 Promise를 생성하고 > 1초뒤에 성공 판정 콘솔창에 메세지 띄우기 

    let dataB = new Promise(function (resolved,rejected) {
        setTimeout(()=>{
            resolved();
        },1000);
    });
    dataB.then(function () {
     console.log("성공")
    })
    
    useEffect(()=>{
        
        
    // 이미지가 로딩이 성공되었다면 > 성공판정
    // 이미지가 로딩이 실패되었다면 > 실패판정
    // 로딩 실패시 > 에러가 발생 > error

    let imgLoading = new Promise(function (resolved,rejected)  {
            resolved()     
        })
        imgLoading.then(function () {
            // alert("이미지 로딩 성공")
        }).catch(function () {
            // alert("이미지 로딩 실패")
        })    
},[])

// async - 함수에만 붙을 수 있다 + function 앞에 사용
// await - async 내에서만 사용 가능 / 단독으로 불가능 - Promise가 실행이 완료되기 전까지는 실행되지 않는다. 
// async 사용시 promise 오브젝트가 자동 반환 (new Promise가 필요 없다는 뜻)
// async는 promise - then(=성공) 사용가능 하지만 실무작업에서는 try(=실패할수도있다)/ catch 문을 많이 사용한다.
// fetch - 함수 사용시 Promise로 반환 > then / catch 사용할수 있다. 

//  then - 성공되었을 때 실행
//  catch - 실패 했을 때 실행
//  finally - 마지막에 완료가 되면 실행(성공이던 실패던 둘다 실행) 잘 사용되진 않음

// try - 오류가 발생할 가능성이 있는 코드를 작성
// catch - 만약 try문에서 실패(오류)가 있다면 해당 함수가 실행된다.
// finally - 마지막에 완료가 되면 실행(성공이던 실패던 둘다 실행) 잘 사용되진 않음 뽜이널리ㅣㅣㅣ 날 알고 감싸 준거니ㅣㅣㅣ 

// https://jsonplaceholder.typicode.com/photos?albumId=1
const [isList, setIsList] = useState()


useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/photos?albumId=1")
    .then(res => res.json())
    .then(data => setIsList(data))

    // 굳~~이 안써도됨
    // .catch(error => console.log(error))
    // .finally(()=>{console.log("데이터 요청 완료")})
},[])




// es6 문법 화살표함수로 사용
    const FetchData = async ()=>{
        try{
            let res = await fetch("https://jsonplaceholder.typicode.com/photos?albumId=1")
            // res가 성공할때 까지 기다린다
            let data = await res.json()
            console.log(data)
        }catch(error){
            console.log(error)
        }finally{
            console.log("데이터 요청끝")
        }
    }
    // async는 함수 형태로 쓰기 때문에 별도로 함수를 실행해주어야 한다. 
    FetchData()

  return (
    <>
    <div>
        {
        isList && isList.map((e,i)=>{
            return(
                <img src={e.url} alt={e.title} key={i}/>
                )
          })
        
        }
    </div>
    </>



  )
}

export default Example