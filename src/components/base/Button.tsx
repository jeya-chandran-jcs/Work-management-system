import React from "react"
import type { ButtonProps } from "../../types/data"


 function Button({text,style,handleSubmit,type,disabled}:ButtonProps) {

  return <button className={style} type={type} onClick={handleSubmit} disabled={disabled}>{text}</button>
}


export default React.memo(Button)