import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import img from "../img/visualizationImage.png";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

const DataBasePage = () => {
  const [userDatabaseId, setUserDatabaseId] = useState("");
  const [startPaddingsize, setstartinPaddingsize] = useState(28);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  function auth() {
    const url = "http://yesql-api.shop:8080";
    axios
      .post(url + "/auth/register", {}, { params: { userId: userId } })
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

  //join in 버튼 -> login 페이지 이동
  const goToMain = () => {
    navigate("/main");
  };

  //에러메세지용 padding 관리
  const handleDatabaseChange = () => {
    if (userDatabaseId !== "") {
      setstartinPaddingsize(8);
    } else {
      setstartinPaddingsize(9);
    }
  };
  //useEffect로 실시간 출력
  useEffect(() => {
    handleDatabaseChange();
  }, [userDatabaseId]);

  return (
    <div className="DataBasePage relative h-screen">
      <p className="text-6xl text-yesql-blue pb-12 font-medium ml-10">
        Welcome!
      </p>
      <p className="text-3xl pb-12 text-gray-300 ">
        데이터베이스 이름을 설정해주세요
      </p>
      <form>
        <div className="flex gap-4 ml-16">
          <div className="register-box flex flex-col border border-black w-64 rounded-xl">
            <Input
              classStyle="border-b border-black"
              type="text"
              name="id"
              maxlength={10}
              onChange={setUserDatabaseId}
            />
          </div>
        </div>
        <div className="ml-16 mt-2">
          {userDatabaseId == "" && (
            <p className="text-sm text-red-600 font-thin">이름을 지어주세요</p>
          )}
        </div>

        <div className="ml-32" onClick={() => goToMain()}>
          <div className={`mt-${startPaddingsize}`}>
            <Button type="startbtn" text="start!" textSize="3xl" />
          </div>
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
      className={`py-2.5 pl-2 bg-transparent ${classStyle}`}
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

export default DataBasePage;
