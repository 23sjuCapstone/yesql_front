import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import img from "../img/visualizationImage.png";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Main = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [joininPaddingsize, setjoininPaddingsize] = useState(28);
  const isValid = userId !== "" && isSame === true;
  const navigate = useNavigate();

  //출력 확인용
  // useEffect(() => {
  //   console.log(userId, userPassword, userPasswordCheck);
  // }, [userId, userPassword, userPasswordCheck]);

  function auth() {
    const url = "http://yesql-api.shop:8080";
    axios
      .post(
        url + "/auth/register",
        {},
        { params: { userId: userId, userPassword: userPassword } }
      )
      .then((response) => {
        console.log("Response Data:", response);
        alert("Request Successful");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Request Failed");
      })
      .finally(() => {
        alert("Request Completed");
      });
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

  //에러메세지용 padding 관리
  const handlePasswordChange = () => {
    if (userPasswordCheck !== "" && !isSame()) {
      setjoininPaddingsize(24);
    } else {
      setjoininPaddingsize(28);
    }
  };

  //useEffect로 실시간 출력
  useEffect(() => {
    handlePasswordChange();
  }, [userPasswordCheck, isSame]);

  return (
    <div className="Main relative">
      <div className="text-5xl mb-16 border-y border-indigo-500">
        <p className="ml-5 mt-2.5 mb-2.5  text-yesql-blue font-bold">yeSQL</p>
      </div>
      <div class="ml-16 mr-16 grid grid-cols-2 gap-4">
        <div>
          <div className="register-box border mb-4 border-black w-auto h-96 rounded-xl">
            {/* <Input
              type="text"
              size="auto"
              maxlength={1000}
              onChange={setUserId}
            /> */}
          </div>
          <div className="register-box border border-black w-auto h-96 rounded-xl">
            {/* <Input type="text" maxlength={1000} onChange={setUserId} /> */}
          </div>
        </div>

        <div className="register-box border border-black w-auto rounded-xl">
          {/* <Input type="text" maxlength={10} onChange={setUserId} /> */}
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
  onChange = null,
  size = ""
}) => {
  return (
    <input
      className={`py-2.5 pl-6 bg-transparent ${classStyle}`}
      type={type}
      name={name}
      placeholder={placeholder}
      size={size}
      maxLength={maxlength}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    ></input>
  );
};

export default Main;
