import React from "react";
import img from "../img/LandingPageBackgroundLeft.png";
import img2 from "../img/LandingPageBackgroundRight.png";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex h-full flex-col">
      <h1 className="py-10">
        <div className="mx-auto max-w-7xl mt-10 px-4 sm:px-6 lg:px-8">
          <nav className="relative z-50 flex justify-between">
            <div className="flex items-center md:gap-x-12 font-black text-yesql text-xl">
              yeSQL
            </div>
          </nav>
        </div>
      </h1>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mt-10">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-semibold tracking-tight text-slate-900 sm:text-7xl">
          Experience
          <div className="relative whitesoace-nowrap">
            <div className="relative">
              the power of
              <span className="text-yesql"> visualization</span>
            </div>
          </div>
          {/* <span className="relative whitesoace-nowrap">
          <span className="relative"> the power of visualization </span>
        </span> */}
          and learn SQL easily
        </h1>
        <p className="mx-auto mt-14 max-w-2xl text-lg tracking-tight text-slate-700">
          Our platform simplifies the learning process by visually representing
          the query execution steps. Start your SQL journey today and master
          this powerful language with ease
        </p>
        <div className="mt-14 flex justify-center gap-x-10">
          <a
            href="/register"
            className="group flex inline-flex bg-yesql h-9 w-full items-center justify-center py-2 px-4 overflow-hidden rounded-full transition-all duration-300 text-white text-lg font-semibold hover:scale-110 active:duration-75 active:scale-95 sm:w-max focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
            //text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900
          >
            Get Started
          </a>
          <a
            href="/login"
            className="group flex inline-flex bg-yesql h-9 w-full items-center justify-center py-2 px-4 overflow-hidden rounded-full transition-all duration-300 text-white text-lg font-semibold hover:scale-110 active:duration-75 active:scale-95 sm:w-max focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Sing in
          </a>
        </div>
      </div>
      <p class="mt-4 text-center text-sm text-gray-500">
        New to yeSQL?
        <a
          href="#"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          {" "}
          There is a tutorial!
        </a>
      </p>
    </div>
  );
}

export default LandingPage;
