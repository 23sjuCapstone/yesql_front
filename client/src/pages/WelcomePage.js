import React from "react";
import logo from "../img/logo.png";
import jiwon from "../img/jiwon.png";
import sungyeon from "../img/sungyeon.png";
import minkyung from "../img/minkyung.png";
import johyun from "../img/johyun.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./WelcomePage.css";

function WelcomePage() {
  const navigate = useNavigate();

  const goToLanding = () => {
    navigate("/");
  };
  return (
    <body className="welcomeBody">
      <div className="flex h-full flex-col">
        <h1 className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="relative z-50 flex justify-between">
              <div className="flex items-center md:gap-x-12 font-black text-yesql text-xl">
                <img
                  src={logo}
                  width="121.35"
                  height="15"
                  onClick={goToLanding()}
                />
              </div>
            </nav>
          </div>
        </h1>
        <div class="group flex inline-flex justify-center">
          <img
            style={{ visibility: "hidden" }}
            src={jiwon}
            width="55"
            height="55"
            class="mr-3 mt-5 mb-5"
          ></img>
          <img
            style={{ visibility: "hidden" }}
            src={sungyeon}
            width="55"
            height="55"
            class="mr-5 ml-5 mt-7 mb-7"
          ></img>
          <img
            style={{ visibility: "hidden" }}
            src={minkyung}
            width="55"
            height="55"
            class="mr-5 ml-5 mt-3 mb-3"
          ></img>
          <img
            style={{ visibility: "hidden" }}
            src={johyun}
            width="55"
            height="55"
            class="m-5"
          ></img>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mt-10">
          <h1 className="mx-auto max-w-4xl font-display text-7xl font-semibold tracking-tight text-slate-900 sm:text-6.5xl">
            <div className="mb-4">
              <span>Welcome !</span>
            </div>
            <span className="giveshadow">{localStorage.getItem("userId")}</span>
            님
          </h1>
          <p className="mx-auto mt-14 max-w-2xl text-lg tracking-tight text-slate-700"></p>
          <div className="mt-16 flex justify-center gap-x-10 lg:mt-4">
            <a
              href="/visual"
              className="button group flex inline-flex bg-yesql h-9 w-full items-center justify-center py-2 px-4 overflow-hidden rounded-full transition-all duration-300 text-white text-lg font-semibold hover:scale-110 active:duration-75 active:scale-95 sm:w-max focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              시작하기
            </a>
          </div>
        </div>
        <p class="group flex inline-flex justify-center mt-4 text-center text-sm text-gray-500">
          <div>
            <img
              src={logo}
              width="59"
              height="15"
              className="group flex inline-flex justify-center overflow-hidden "
            />
            이 처음이신가요? &ensp;
            <a
              href="/tutorial"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              // className="group flex inline-flex justify-center"
            >
              {" "}
              튜토리얼 보기
            </a>
          </div>
        </p>
      </div>
    </body>
  );
}

export default WelcomePage;
