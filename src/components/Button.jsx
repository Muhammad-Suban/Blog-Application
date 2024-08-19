import React from 'react'

function Button({
    children,
    type="button",
    className="",
    bgcolor="bg-red-600",
    textColor="text-white",
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${className} ${bgcolor} ${textColor} `}{...props}>{children}</button>
  )
}

export default Button
