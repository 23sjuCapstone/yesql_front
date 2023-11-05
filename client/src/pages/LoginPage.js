import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import img from "../img/visualizationImage.png";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("userId=",userId,userPassword);
  }, [userId, userPassword]);
  
  function Login() {
    const url = "http://yesql-api.shop:8080";
    axios
      .post(
        url + "/auth/login",
        {},
        {   userId: userId, userPassword: userPassword  }
      )
      .then((response) => {
        console.log("Response Data:", response.data);
         if(response.isSuccess){
          alert("로그인 되었습니다.");
          localStorage.setItem("userId", userId);
          FindDatabase();
         }
         else{
          alert("로그인에 실패하였습니다. 아이디나 비밀번호를 확인해주세요.");
         }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function FindDatabase(){
    const url = "http://yesql-api.shop:8080";
    axios
      .get(
        url + "/auth/findDB",
        {},
        {   userId: userId  }
      )
      .then((response) => {
         if(response.isSuccess){
          goToMain();
         }
         else{
          goToDatabase();
         }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const goToDatabase = () => {
    navigate("/database");
  };
  const goToMain =() =>{
navigate("/visual");
  }
  return (
    <div className="LoginPage relative h-screen">
      <p className="text-6xl text-yesql-blue pb-12">yeSQL</p>
      <form>
        <div className="flex gap-4">
          <Button
            textColor="black"
            buttonColor="yesql-blue/50"
            hoverColor="blue-700"
            textSize="s"
            text="id&ensp;"
          />
          <div className="login-box flex flex-col border border-black w-80 rounded-xl">
            <Input
              classStyle="border-black"
              type="text"
              name="id"
              placeholder="id"
              maxlength={10}
              onChange={setUserId}
            />
          </div>
        </div>
        <div className="mt-2 flex gap-4">
          <Button
            textColor="black"
            buttonColor="yesql-blue/50"
            hoverColor="blue-700"
            textSize="s"
            text="pw"
          />
          <div className="login-box flex flex-col border border-black w-80 rounded-xl">
            <Input
              classStyle="border-black"
              type="text"
              name="id"
              placeholder="password"
              maxlength={10}
              onChange={setUserPassword}
            />
          </div>
        </div>
        <div className="mt-20">
          <Button onclick={Login} text="Login" />
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

export default LoginPage;
