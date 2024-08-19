import React, { useId } from "react";

function Input(
  { 
    childern, 
    className = "", 
    type = "text", 
    label, 
    // placeholder, 
    ...props 
  },ref) 

  {
    const id = useId();
  return (
    <div className="w-full">
      {label && 
        <label className="inline-block mb-1 pl-2 font-bold"  htmlFor={id}>
          {label}
        </label>
      }
      <input 
      type={type} 
      ref={ref}
  
      {...props}
      className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      id={id} />
    </div>
  );
}

export default React.forwardRef(Input);
