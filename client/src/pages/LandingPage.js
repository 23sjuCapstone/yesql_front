import React from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="flex h-full flex-col">
      <h1 className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="relative z-50 flex justify-between">
            <div className="flex items-center md:gap-x-12 font-black text-yesql text-xl">
             <img src={logo} width='121.35' height='15'/>
            </div>
          </nav>
        </div>
      </h1>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mt-10">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-semibold tracking-tight text-slate-900 sm:text-7xl">
          <span className="giveshadow">눈</span>으로 하는 편한
          <div className="relative whitesoace-nowrap">
            <div className="relative">
              <span className="giveshadow">SQL 공부</span>
            </div>
          </div>
          경험해보세요
        </h1>
        <p className="mx-auto mt-14 max-w-2xl text-lg tracking-tight text-slate-700">

        </p>
        <div className="mt-16 flex justify-center gap-x-10 lg:mt-4">
          <a
            href="/register"
            className="group flex inline-flex bg-yesql h-9 w-full items-center justify-center py-2 px-4 overflow-hidden rounded-full transition-all duration-300 text-white text-lg font-semibold hover:scale-110 active:duration-75 active:scale-95 sm:w-max focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            시작하기
          </a>
          <a
            href="/login"
            className="group flex inline-flex bg-yesql h-9 w-full items-center justify-center py-2 px-4 overflow-hidden rounded-full transition-all duration-300 text-white text-lg font-semibold hover:scale-110 active:duration-75 active:scale-95 sm:w-max focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            로그인
          </a>
        </div>
      </div>
      <p class="mt-4 text-center text-sm text-gray-500">
        이 처음이신가요?
        <a
          href="#"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          {" "}
          튜토리얼 보기
        </a>
      </p>
    </div>
  );
}

export default LandingPage;
