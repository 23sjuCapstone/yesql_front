export const Button = ({
  type = "",
  textColor = "white",
  buttonColor = "yesql-blue",
  hoverColor = "blue-700",
  textSize = "xl",
  text = ""
}) => {
  return (
    <button
      class={`type=${type} h-fit text-${textColor} bg-${buttonColor} hover:bg-${hoverColor} text-${textSize} py-2 px-4 rounded-full`}
    >
      {text}
    </button>
  );
};
