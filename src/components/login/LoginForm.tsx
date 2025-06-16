import React, {  useState } from 'react'
import {auth} from "../../googleSignIn/config.ts"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getData } from '../../Api/getData.ts'
import { API } from '../../global.ts'


type Props={
    email:string,
    password:string
}

export default function LoginForm() {
    const [userData,setUserData]=useState<Props>({email:"",password:""})
    const [loginError,setLoginError]=useState<string>("")
    const [show,setShow]=useState<boolean>(false)
    const navigate=useNavigate()

    const {data,error} =useQuery({
        queryKey:["users"],
        queryFn:()=>getData(API)
    })

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        setUserData((prev)=>({...prev,[name]:value}))
    }

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        try{
            setShow(false)
            await signInWithEmailAndPassword(auth,userData.email,userData.password)
            
            const filteredRole=data?.find((user)=>user.email===userData.email)
            
            console.log("filteredRoel",filteredRole.role)
            sessionStorage.setItem("user",filteredRole.role)
            sessionStorage.setItem("userID",filteredRole.id)
            
            

            setTimeout(()=>{
                if(filteredRole.role==="admin")
                {
                    navigate({to:"/admin-home"})
                    console.log("6 admin")
                }
                else if(filteredRole.role==="employee"){
                    navigate({to:`/user-home/${filteredRole.id}`})
                }
                else { 
                    throw new Error("user not found")
                } 
            },500)
        }
        catch(err:any)
        {
            setShow(true)
             if(err.code==="auth/invalid-credential")
            {
                setLoginError("invalid email or password")
            }
            else{
                setLoginError("something went wrong")
            }
            console.error(err)
        }
    }
    return(
        
        <div className='min-h-screen relative flex justify-center items-center bg-cover bg-center'style={{backgroundImage:`url(https://wallpaperaccess.com/full/1164874.jpg)`}} >
            <div className='absolute bg-blue/800-60 backdrop-blur-sm z-0 inset-0'></div>
            <form onSubmit={handleSubmit} className='w-full max-w-xl border border-gray-300 rounded-lg flex flex-col  items-center gap-6 py-4 shadow-lg bg-white/10 backdrop-blur-md z-1'>
                {/* <h1 className='font-bold text-lg mx-auto '>Login</h1> */}
                 <div className='w-full flex flex-col justify-center'>
                    <h1 className='font-bold text-2xl mx-auto text-gray-800 mb-4 '>Login</h1>
                <div className='w-3/4 h-[2px] bg-gray-600 mx-auto'></div>
                </div>
                <input type="email" name='email' placeholder='email' value={userData.email} className='w-3/4 px-3 py-2 text-md border border-gray-600 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring=blue-400 hover:border-blue-400'
                onChange={handleChange}/>
                <input type="password" name="password" placeholder='password' value={userData.password} className='w-3/4 px-3 py-2 text-md border border-gray-600 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring=blue-400  hover:border-blue-400'
                onChange={handleChange}/>
                <button className='w-3/4 font-bold text-md bg-blue-400 rounded-md text-center px-4 py-3 '>Login</button>
                    <div className='w-3/4 '><a href='/register' className='block text-center font-semibold text-md cursor-pointer hover:underline'>Don't have an account Create one!</a></div>
                <div className='w-full flex flex-col items-center gap-2'>
                    <p className='mx-auto font-bold text-lg '>or</p>
                    <div className='bg-gray-500 h-[2px] w-2/4 ' ></div>
                    <div className='flex justify-around items-center w-1/4'>
                        <i className=""><img src="https://imagepng.org/wp-content/uploads/2019/08/google-icon-1.png " className='w-7 h-7 object-contain '/></i>
                        <i className="fa-solid fa-envelope font-bold text-2xl text-blue-500"></i>  
                        <i className="fa-solid fa-phone font-bold text-2xl text-green-500"></i>  
                    </div>
                </div>

                {loginError && show ? 
                   <>
                   <div className='fixed inset-0 bg-gray-800/60 z-40 '></div>
                     <div className='fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-full max-w-sm bg-white rounded-lg shadow-lg border border-black'>
                    
                        <div className='flex flex-col justify-around gap-2 border border-b bg-white w-full'>
                               <div className='flex justify-end items-center w-full p-2 bg-black'>
                                    <button className='text-lg font-bold text-white px-2 border border-white rounded-sm' onClick={()=>setShow(false)}>X</button>
                                </div> 
                                <p className='py-4 text-md font-semibold px-2 text-center'>
                                    {loginError}
                                </p>
                        </div>
                        
                    </div>
                   </>
                        : null    
            }
            </form>
        </div>
    )
}
