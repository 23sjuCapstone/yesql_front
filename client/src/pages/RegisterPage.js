import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import img from "../img/visualizationImage.png";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const isValid = userId !== "" && isSame === true;
  const navigate = useNavigate();
  var isDubplicated = false;

  //출력 확인용
  useEffect(() => {
    console.log("userId=",userId,userPassword, userPasswordCheck);
  }, [userId, userPassword, userPasswordCheck]);
  
   function idDuplicateCheck(){
     const url = "http://yesql-api.shop:8080";
     axios
     .post(
       url + "/auth/checkDuplicatedId",
       {},
       { params: { userId: userId } }
     )
     .then((response) => {
      if(response.data){
        isDubplicated=true;
        alert("아이디를 사용할 수 있습니다.");
      }
       else{
        alert("아이디를 사용할 수 없습니다.");
       }
     })
     .catch((error) => {
       console.error("Error:", error);
       alert("Request Failed");
     })

   }
   
  function auth() {
    if(userPassword == "" || !isSame() || isDubplicated){
      alert("아이디나 비밀번호를 확인해주세요.")
    }
    else{
      const url = "http://yesql-api.shop:8080";
      axios
        .post(
          url + "/auth/register",
          {},
          { params: { userId: userId, userPassword: userPassword } }
        )
        .then((response) => {
          console.log("Response Data:", response);
          alert("회원가입에 성공하셨습니다.");
          goToLogin();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Request Failed");
        })
        // .finally(() => {
        //   alert("Request Completed");
        // });
    }
    
  }
  function message(){
    alert("클릭");
  }

  //비밀번호, 비밀번호 확인 같은지 확인하는 함수
  function isSame() {
    if (userPassword === userPasswordCheck) {
      return true;
    } else {
      return false;
    }
  }

  //join in 버튼 -> login 페이지 이동
  const goToLogin = () => {
    navigate("/login");
  };
  const goToLanding = () =>{
    navigate("/");
  }

  // //에러메세지용 padding 관리
  // const handlePasswordChange = () => {
  //   if (userPasswordCheck !== "" && !isSame()) {
  //     setjoininPaddingsize(24);
  //   } else {
  //     setjoininPaddingsize(28);
  //   }
  // };

  // //useEffect로 실시간 출력
  // useEffect(() => {
  //   handlePasswordChange();
  // }, [userPasswordCheck, isSame]);

  return (
    <div className="RegisterPage relative h-screen">
      <li className="text-6xl text-yesql-blue pb-12 list-none">
        <Link to="/">yeSQL</Link>
      </li>
      <form>
        <div className="flex gap-4">
          <div className="register-box flex flex-col border border-black w-80 rounded-xl">
            <input type="text" placeholder="id" class="py-2.5 pl-6 bg-transparent rounded-md shadow-sm 
            focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500
            " value={userId} onChange={(e) => {
              console.log(e.target.value);
              setUserId(e.target.value);
            }}>
              
            </input>
            
            <Input
              classStyle="border-t border-b border-black"
              type="password"
              name="password"
              placeholder="password"
              maxlength={20}
              onChange={setUserPassword}
            />
            <Input
              type="password"
              name="password-check"
              placeholder="password check"
              maxlength={20}
              onChange={setUserPasswordCheck}
            />
          </div>

          <Button
          onclick={idDuplicateCheck}
            type="idcheck"
            textColor="black"
            buttonColor="yesql-blue/50"
            hoverColor="blue-700"
            text="id check"
          />
        </div>

        <div
          className="mt-2"
          const disabled={isValid ? false : true}
          //onClick={() => goToLogin()}
        >
          {userPasswordCheck !== "" && !isSame() && (
            <p className="passwordCheck text-sm text-red-600 font-thin">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
          <Button onclick={auth} type="joinin" text="join in" />
        </div>
      </form>
      <div class="absolute bottom-0 right-0">
        <div className="img opacity-50">
          <img src={img} />
        </div>
      </div>
    </div>
  );
};

const Input = ({
  classStyle = "",
  type = "",
  name = "",
  placeholder = "",
  maxlength = 0,
  onChange = null
}) => {
  return (
    <input
      className={`py-2.5 pl-6 bg-transparent ${classStyle}`}
      type={type}
      name={name}
      placeholder={placeholder}
      size="20"
      maxLength={maxlength}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    ></input>
  );
};

export default RegisterPage;
