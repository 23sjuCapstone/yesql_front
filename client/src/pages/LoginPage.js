import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

function LandingPage() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("userId=", userId, userPassword);
  }, [userId, userPassword]);

  const [isValid, setIsValid] = useState(true);
  const [enteredValue, setEnteredValue] = useState("");
  const goalInputChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

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
          alert("로그인 되었습니다.");
          localStorage.setItem("userId", userId);
        } else {
          alert("로그인에 실패하였습니다. 아이디나 비밀번호를 확인해주세요.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const goToDatabase = () => {
    navigate("/database");
  };

  const goToMain = () => {
    navigate("/visual");
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
            <label
              for="email"
              class="block text-sm font-semibold leading-6 text-gray-900"
            >
              User ID
            </label>
            <div class="mt-2">
              <input
                type="text"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                class="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yesql sm:text-sm sm:leading-6 required:border-red-500 invalid:border-red-500"
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
                value={userPassword}
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
                required
                class="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yesql sm:text-sm sm:leading-6 required:border-red-500 invalid:border-red-500"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              class="flex w-full justify-center rounded-md bg-yesql px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => Login()}
            >
              Sign in
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
          New to yeSQL?
          <a
            href="/register"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            {" "}
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
