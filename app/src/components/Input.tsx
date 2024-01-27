import React from 'react'
import { TextInput } from "@tremor/react";
import '../styles/Input.css'

type Props = {
    label?: string;
    value: string;
    inputChange: (value: string) => void;
    type?: string;
}

const Input = ({label = "Username", value, inputChange, type="text"}: Props) => {
  return (
    <div className="inputbox w-full">
          <input className='ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 border-none' required={true} type={type} value={value} onChange={(e) => {
            inputChange(e.target.value);
        }}></input>
        <span className="inputSpan">{label}</span>
        <i></i>
    </div>
  )
}

export default Input