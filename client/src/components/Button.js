export const Button = ({
  type = "",
  textColor = "white",
  buttonColor = "blue-600",
  hoverColor = "blue-700",
  textSize = "xl",
  text = "",
  onclick=null
}) => {
  return (
    <button type="button"
      class={`type=${type} h-fit text-${textColor} bg-${buttonColor} hover:bg-${hoverColor} text-${textSize} py-2 px-4 rounded-full`} 
      onClick ={onclick}
    >
      {text}
    </button>
  );
};
