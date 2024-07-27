import React, { useId } from "react";

function Input(
  { 
    childern, 
    className = "", 
    type = "text", 
    label, 
    placeholder, 
    ...props 
  },ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && 
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      }
      <input 
      type={type} 
      ref={ref}
      {...props}
      className={``}
      key={id} />
    </div>
  );
}

export default React.forwardRef(Input);
