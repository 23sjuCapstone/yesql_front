import React from "react";
import tutorital from "../img/tutorial.png";
import "./TutorialPage.css";

function TutorialPage() {
  return (
    <body className="tutorialBody relative ">
      <div>
        <img src={tutorital} className="torutialImg"></img>
      </div>
      <a
        href="/login"
        className="startButton flex inline-flex w-400 bg-yesql items-center justify-center py-2 px-4 overflow-hidden rounded-full transition-all duration-300 text-white text-lg font-semibold sm:w-max focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        시작하기
      </a>
    </body>
  );
}
export default TutorialPage;
