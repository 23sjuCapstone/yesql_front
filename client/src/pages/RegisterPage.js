import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function LandingPage() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordCheck, setUserPasswordCheck] = useState("");
  const [isDubplicated, setisDubplicated] = useState(true);
  const isValid = userId !== "" && isSame === true;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("userId=", userId, userPassword, userPasswordCheck);
    console.log("isdup= ", isDubplicated);
  }, [userId, userPassword, userPasswordCheck, isDubplicated]);

  function idDuplicateCheck() {
    const url = "http://yesql-api.shop:8080";
    axios
      .post(url + "/auth/checkDuplicatedId", {}, { params: { userId: userId } })
      .then((response) => {
        if (response.data) {
          if (userId === "") {
            alert("아이디를 입력해주세요.");
          } else {
            setisDubplicated(true);
            alert("아이디를 사용할 수 있습니다.");
          }
        } else {
          setisDubplicated(false);
          alert("아이디를 사용할 수 없습니다.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Request Failed");
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
          alert("회원가입에 성공하셨습니다.");
          goToLogin();
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

  //join in 버튼 -> login 페이지 이동
  const goToLogin = () => {
    navigate("/login");
  };
  const goToLanding = () => {
    navigate("/");
  };

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
        <li className="my-10 text-center text-6xl font-bold leading-9 tracking-tight text-yesql list-none">
          <Link to="/">yeSQL</Link>
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
