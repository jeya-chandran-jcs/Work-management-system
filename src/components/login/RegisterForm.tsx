import React, { useRef, useState } from 'react'
import { auth } from "../../googleSignIn/config.ts"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import type { UserProps } from '../../types/data.ts'
import { FirebaseError } from 'firebase/app'
import { API } from '../../global.ts'
import { useMutation } from '@tanstack/react-query'
import { postData } from '../../Api/postData.ts'
import { useNavigate } from '@tanstack/react-router'


type RegisterUserProps=Pick<UserProps,"UID" | "name" | "email" | "password" | "confirmPassword" | "role" | "department">


export default function RegisterForm() {
    const [data, setData] = useState<RegisterUserProps>({ UID:"",name: "", email: "", password: "", confirmPassword: "", role: "employee", department: "" })
    const [error, setError] = useState<string | null>(null)
    const [show, setSHow] = useState<boolean | null>(null)
    const adminRef=useRef<HTMLSelectElement | null>(null)
    const navigate = useNavigate()
   
    const mutation =useMutation({
        mutationFn:(newUserData:RegisterUserProps)=>postData({url:API,data:newUserData}),
        onSuccess:()=>navigate({to:"/login"}),
        onError:(err)=>{
            console.error(err)
            setError(err.message)
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if(data.password !== data.confirmPassword)
        {
            alert("password doesnt match")
            return
        }

        if(data.password.length<6)
        {
            setError("password must be atleast minimum 6 characters")
            return
        }
        try{
            const userCredential=await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(userCredential.user,{displayName:data.name})
            const newData={
                ...data,
                UID:userCredential?.user.uid
            }
            mutation.mutate(newData)
            // try{
            //     await fetch(API,{
            //         method:"POST",
            //         headers:{
            //             "Content-Type":"application/json"
            //         },
            //         body:JSON.stringify(newData )
            //     })
            // }
            // catch(err)
            // {
            //     console.log("couldnt update user in mock api")
            //     console.error(err)
            // }
            //navigate("/login")
        }
        catch(err:unknown)
        {
            console.log(err)
            if(err instanceof FirebaseError)
            {
                switch (err.code){
                    case "auth/weak-password":
                        setError("password should be atleast 6 characters");
                        break
                    case "auth/email-already-in-use":
                        setError("email is already in use");
                        break;
                    case "auth/invalid-email":
                    setError("invalid email");
                    break;
                    default:
                        setError("something went wrong")
                    }
            }
            else if(err instanceof Error)
            {
                setError("server error")
            }
        }

    }

    return (

        <div className='min-h-screen flex justify-center items-center relative bg-cover bg-center' style={{ backgroundImage: `url(https://wallpaperaccess.com/full/1164874.jpg)` }} >
            <div className='absolute bg-blue/800-60 backdrop-blur-sm z-0 inset-0'></div>

            <form onSubmit={handleSubmit} className='w-full max-w-xl border border-gray-300 rounded-lg flex flex-col  items-center gap-6 py-4 shadow-lg bg-white/10 backdrop-blur-md z-1'>

                <div className='w-full flex flex-col justify-center'>
                    <h1 className='font-bold text-2xl mx-auto text-gray-800 mb-4 '>Register</h1>
                <div className='w-3/4 h-[1px] bg-gray-600 mx-auto'></div>
                </div>
                <input type="text" name="name" placeholder='Enter Your Name' value={data.name} className='w-[85%] px-3 py-2 text-md border border-gray-600 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring=blue-400 hover:border-blue-400'
                    onChange={handleChange} />

                <input type="email" name="email" placeholder='Enter Your Email' value={data.email} className='w-[85%] px-3 py-2 text-md border border-gray-600 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring=blue-400 hover:border-blue-400'
                    onChange={handleChange} />

                <div className='w-[85%] flex justify-between items-center'>
                    <input type="Password" name="password" placeholder='Create a  Password' value={data.password} className='w-[48%] px-3 py-2 text-md border border-gray-600 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring=blue-400  hover:border-blue-400'
                        onChange={handleChange} required/>

                    <input type="Password" name="confirmPassword" placeholder='Confirm Your Password' value={data.confirmPassword} className='w-[48%] px-3 py-2 text-md border border-gray-600 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring=blue-400 hover:border-blue-400'
                        onChange={handleChange} required/>
                </div>
                {error && <p className='red'>{error}</p>}

                <div className='w-[85%] flex justify-center items-center'>
                    <label className='text-white font-semibold'>Role: </label>
                    <select required onChange={handleChange} name='role' value={data.role} ref={adminRef} className='w-1/2  mx-2 px-3 py-2 border border-gray-600 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-400 bg-white text-black'>
                        <option value="employee" className='w-full' >Employee</option>
                        <option value="admin" className='w-full'>Admin</option>
                    </select>
                </div>


                <div className='w-[85%] flex flex-col gap-4'>

                    <label className='text-white font-semibold mx-auto'>Department: </label>
                    <div className='w-full flex justify-center items-center'>
                        {["HR","Finance","Developer","Admin"].map((role,index)=>(
                            <div className={`flex  w-full gap-2 justify-center items-center  ${role==="Admin" ? "w-3/4" : "w-full" }`} key={index}>
                            <label className='text-black font-semibold'>
                                <input type="radio" name="department" value={role} checked={data.department === role } onChange={handleChange} className='mr-2 w-4 h-4' 
                                  disabled={data.role === "admin" && role !== "Admin"} required
                                />
                                {role}
                            </label>
                        </div>

                      
                        ))}
                    </div>
                </div>

                {error && <p className='red'>{error}</p>}


                <button className='w-[85%] font-bold text-md bg-blue-400 rounded-md text-center px-4 py-3 text-white '>Register</button>

                <div className='w-[85%] flex justify-between'>
                    <a className='text-gray-800 font-bold text-md' href='#'>Forgot Password?</a>
                    <a className='text-gray-800 font-bold text-md cursor-pointer' onClick={() => navigate({to:"/login"})}>Already have an account!!</a>
                </div>


            </form>
            {show && error ? <div className='absolute w-[20%]  top-[42%] left-[42%] bg-white rounded border border-black' >
                <div className='flex justify-end items-center border-b border-2 pb-4'>
                    <button className='text-black font-semibold text-md bg-white border  ' onClick={() => setSHow(false)}>X</button>
                </div>
                <p className='font-md text-lg mx-auto px-6 py-8'>{error}</p>
            </div> : null}
        </div>
    )
}
