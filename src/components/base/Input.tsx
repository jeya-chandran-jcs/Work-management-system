import type { InputProps } from "../../types/data";

export default function Input({name,value,handleChange,type,style,placeHolder,id,readOnly,checked ,disabled}:InputProps) {
    console.log("input comp is running")
  return (
    <input name={name} value={value} onChange={handleChange} type={type} className={style} placeholder={placeHolder} id={id} readOnly={readOnly} checked={checked} disabled={disabled}/>
  )
}



