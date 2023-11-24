export const Button = ({
  type = "",
  textColor = "white",
  buttonColor = "yesql",
  hoverColor = "blue-700",
  textSize = "xl",
  text = "",
  onclick = null,
  buttontype = "button"
}) => {
  return (
    <button
      type={buttontype}
      class={`type=${type} h-fit text-${textColor} bg-${buttonColor} hover:bg-${hoverColor} text-${textSize} py-2 px-4 rounded-full`}
      onClick={onclick}
    >
      {text}
    </button>
  );
};
