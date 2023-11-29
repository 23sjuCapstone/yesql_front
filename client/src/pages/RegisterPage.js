import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import logo from "../img/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";

function LandingPage() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [isDubplicated, setisDubplicated] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [idCheckMessage, setIdCheckMessage] = useState("");
  const isValid = userId !== "" && isSame === true;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("userId=", userId, userPassword, userPasswordCheck);
    console.log("isdup= ", isDubplicated);
    // setIsCheck(false);
  }, [userId, userPassword, userPasswordCheck, isDubplicated]);

  function idDuplicateCheck() {
    const url = "http://yesql-api.shop:8080";
    axios
      .post(url + "/auth/checkDuplicatedId", {}, { params: { userId: userId } })
      .then((response) => {
        if (response.data) {
          if (userId === "") {
            // alert("아이디를 입력해주세요.");
            setIsCheck(false);
            setIdCheckMessage("아이디를 입력해주세요.");
          } else {
            // alert("아이디를 사용할 수 있습니다.");
            setIsCheck(true);
            setIdCheckMessage("아이디를 사용할 수 있습니다.");
          }
        } else {
          // alert("아이디를 사용할 수 없습니다.");
          setIsCheck(false);
          setIdCheckMessage("중복된 아이디입니다.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // alert("Request Failed");
        setIsCheck(true);
      });
  }

  function auth() {
    console.log(isSame(), isDubplicated);
    if (
      userId === "" ||
      userPasswordCheck === "" ||
      userPassword === "" ||
      !isSame() ||
      !isDubplicated
    ) {
      alert("아이디나 비밀번호를 확인해주세요.");
    } else {
      const url = "http://yesql-api.shop:8080";
      axios
        .post(
          url + "/auth/register",
          {},
          { params: { userId: userId, userPassword: userPassword } }
        )
        .then((response) => {
          console.log("Response Data:", response);
          Login();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Request Failed");
        });
    }
  }

  //비밀번호, 비밀번호 확인 같은지 확인하는 함수
  function isSame() {
    if (userPassword === userPasswordCheck) {
      return true;
    } else {
      return false;
    }
  }

  function Login() {
    const url = "http://yesql-api.shop:8080";
    localStorage.removeItem("userId");
    axios
      .post(
        url + "/auth/login",
        {},
        { params: { userId: userId, userPassword: userPassword } }
      )
      .then((response) => {
        console.log("Response Data:", response.data);
        console.log(userId, userPassword);
        if (response.data.isSuccess) {
          localStorage.setItem("userId", userId);
          goToWelcome();
        } else {
          alert("로그인에 실패하였습니다. 아이디나 비밀번호를 확인해주세요.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  //join in 버튼 -> login 페이지 이동
  const goToLogin = () => {
    navigate("/login");
  };
  const goToLanding = () => {
    navigate("/");
  };
  const goToWelcome = () => {
    navigate("/welcome");
  };

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
        <li className="my-10 text-center text-6xl font-bold leading-9 tracking-tight text-yesql list-none">
          <div className="flex items-center justify-center font-black text-yesql text-xl">
            <img src={logo} width="280" height="" onClick={goToLanding} />
          </div>
        </li>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6">
          <div>
            {/* <div className="relative"> */}
            <label
              for="email"
              class="text-sm font-semibold leading-6 text-gray-900"
            >
              User ID
            </label>
            <button
              class="float-right rounded-3xl bg-yesql px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => idDuplicateCheck()}
              type="button"
            >
              id check
            </button>
            {/* </div> */}

            <div class="mt-2">
              <input
                className={`${
                  !isDubplicated
                    ? "border-2 border-red-500 focus:outline-none"
                    : "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yesql"
                } block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                type="text"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
              />
            </div>
            <span style={isCheck ? { color: "green" } : { color: "red" }}>
              {idCheckMessage}
            </span>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password-check"
                class="block text-sm font-semibold leading-6 text-gray-900"
              >
                Password Check
              </label>
            </div>
            <div class="mt-2">
              <input
                id="password-check"
                name="password-check"
                type="password"
                class="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yesql sm:text-sm sm:leading-6 required:border-red-500 invalid:border-red-500"
                value={userPasswordCheck}
                onChange={(e) => {
                  setUserPasswordCheck(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-semibold leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                class="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yesql sm:text-sm sm:leading-6 required:border-red-500 invalid:border-red-500"
                value={userPassword}
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              class="flex w-full justify-center rounded-md bg-yesql px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => auth()}
            >
              Join in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LandingPage;
