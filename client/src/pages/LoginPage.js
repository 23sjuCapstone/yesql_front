import React from "react";

import { Button } from "../components/Button";
import img from "../img/visualizationImage.png";

function LoginPage() {
  return (
    <div className="LoginPage relative h-screen">
      <p className="text-6xl text-yesql-blue pb-12">yeSQL</p>
      <form>
        <div className="flex gap-4">
          <Button
            textColor="black"
            buttonColor="yesql-blue/50"
            hoverColor="blue-700"
            textSize="s"
            text="id&ensp;"
          />
          <div className="login-box flex flex-col border border-black w-80 rounded-xl">
            <Input
              classStyle="border-black"
              type="text"
              name="id"
              placeholder="id"
              maxlength={10}
            />
          </div>
        </div>
        <div className="mt-2 flex gap-4">
          <Button
            textColor="black"
            buttonColor="yesql-blue/50"
            hoverColor="blue-700"
            textSize="s"
            text="pw"
          />
          <div className="login-box flex flex-col border border-black w-80 rounded-xl">
            <Input
              classStyle="border-black"
              type="text"
              name="id"
              placeholder="password"
              maxlength={10}
            />
          </div>
        </div>
        <div className="mt-20">
          <Button text="Login" />
        </div>
      </form>
      <div class="absolute bottom-0 right-0">
        <div className="img opacity-50">
          <img src={img} />
        </div>
      </div>
    </div>
  );
}

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

export default LoginPage;
