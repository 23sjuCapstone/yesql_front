import React, { useEffect } from "react";
import { Button } from "../components/Button";
import img from "../img/visualizationImage.png";
import axios from "axios";

const RegisterPage = () => {
  // useEffect(() => {
  //   axios.get("/test/log").then((response) => {
  //     alert("success");
  //   });
  // }, []);

  return (
    <div className="RegisterPage relative h-screen">
      <p className="text-6xl text-yesql-blue pb-12">yeSQL</p>
      <form>
        <div className="flex gap-4">
          <div className="register-box flex flex-col border border-black w-80 rounded-xl">
            <Input
              classStyle="border-b border-black"
              type="text"
              name="id"
              placeholder="id"
              maxlength={10}
            />
            <Input
              classStyle="border-b border-black"
              type="password"
              name="password"
              placeholder="password"
              maxlength={20}
            />
            <Input
              type="password"
              name="password-check"
              placeholder="password check"
              maxlength={20}
            />
          </div>
          <Button
            textColor="black"
            buttonColor="yesql-blue/50"
            hoverColor="blue-700"
            textSize="xs"
            text="id check"
          />
        </div>
        <div className="mt-28">
          <Button text="join in" />
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
}) => {
  return (
    <input
      className={`py-2.5 pl-6 bg-transparent ${classStyle}`}
      type={type}
      name={name}
      placeholder={placeholder}
      size="20"
      maxLength={maxlength}
    ></input>
  );
};

export default RegisterPage;
