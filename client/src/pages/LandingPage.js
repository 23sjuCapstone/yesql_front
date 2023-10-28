import React from "react";
import img from "../img/LandingPageBackgroundLeft.png";
import img2 from "../img/LandingPageBackgroundRight.png";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="LandingPage">
      <div class="relative h-screen">
        <div class="absolute bottom-0 left-0 z-0">
          <img src={img} />
        </div>
        <div class="absolute inset-y-0 right-0 z-10">
          <img src={img2} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-9xl text-yesql-blue z-20 mb-20 text-center">
            yeSQL
          </p>
          <ul className="flex flex-row space-x-32">
            <li className="text-2xl">
              <Link to="/">튜토리얼</Link>
            </li>
            <li className="text-2xl">
              <Link to="/login">로그인</Link>
            </li>
            <li className="text-2xl">
              <Link to="/register">회원가입</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
