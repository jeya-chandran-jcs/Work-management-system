import React, {  useState } from 'react'
import {auth} from "../../googleSignIn/config.ts"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getData } from '../../Api/getData.ts'
import { API } from '../../global.ts'
import type { UserProps } from '../../types/data.ts'
import Button from '../base/Button.tsx'
import Input from '../base/Input.tsx'
import ErrorModal from '../miniComp/ErrorModal.tsx'


type LoginProps=Pick<UserProps, "email" | "password">



export default function LoginForm() {
    const [userData,setUserData]=useState<LoginProps>({email:"",password:""})
    const [loginError,setLoginError]=useState<string>("")
    const [show,setShow]=useState<boolean>(false)
    const navigate=useNavigate()

    const {data,error} =useQuery({
        queryKey:["users"],
        queryFn:()=>getData(API)
    })

    if(error)
    {
        console.log(error)
    }

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        setUserData((prev)=>({...prev,[name]:value}))
    }

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
     
        try{
            setShow(false)
            await signInWithEmailAndPassword(auth,userData.email,userData.password)
            
            const filteredRole=data?.find((user:UserProps)=>user.email===userData.email)
            
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
        catch(err)
        {
            setShow(true)

            if(err instanceof Error && "code" in err && typeof err.code==="string")
            {
                 if(err.code==="auth/invalid-credential")
                    {
                        setLoginError("invalid email or password")
                    }
                    else{
                        setLoginError("something went wrong")
                    }
                    console.error(err.code)
            }
        }   
    }
    return(
        <div className='min-h-screen flex  w-full relative'>
            <div className='w-1/4 flex justify-start items-center absolute top-6 left-3 space-x-1'>
                <img src="https://th.bing.com/th/id/R.c84102556606a346c0ddcafbee4ecb73?rik=1QDP1j7PCQzwxA&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fteamwork-transparent-background%2fteamwork-transparent-background-23.png&ehk=5NyTHXOsWiBMprJhWu4mlAztWrqR%2fqYgM3TXFzBeZXc%3d&risl=&pid=ImgRaw&r=0" className='w-24 h-18 object-contain inline-block'/>
                <h1 className='font-sans text-xl font-bold inline'>Work <span className='text-green-600 font-extrabold text-2xl'>Stack</span></h1>
            </div>
            {/* left side */}

            <div className='w-[70%] flex justify-center items-center '>
                    <form className='w-full max-w-xl  px-6 py-4  flex flex-col items-center justify-center gap-2' onSubmit={handleSubmit}>
                        <h1 className='text-3xl font-extrabold text-gray-700 text-center'>Login To Your Account</h1>

                        <p className='text-center pt-14 font-serif text-lg font-medium'>Login Using Social Networks</p>
    
                        <div className='flex justify-around items-center w-1/4'>
                           <i className=""><img src="https://imagepng.org/wp-content/uploads/2019/08/google-icon-1.png " className='w-7 h-7 object-contain '/></i>
                           <i className="fa-solid fa-envelope font-bold text-2xl text-blue-500"></i>  
                           <i className="fa-solid fa-phone font-bold text-2xl text-green-500"></i>  
                        </div>

                          <div className='w-full   my-2 flex  items-center'>
                            <div className='w-full bg-gray-300 h-[1px] rounded-lg'></div><p className='px-1 text-md text-gray-500'>or</p><div className='w-full bg-gray-300 h-[1px] rounded-lg'></div>
                         </div>

                        <div className='flex flex-col gap-4 w-full '>
                             <Input type={"email"} name={"email"} placeHolder={"Enter Your Email here..."} value={userData.email} style={'w-full h-11 px-4 py-2 bg-green-50 rounded-xl border border-gray-400 text-lg font-medium text-gray-600 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-300 focus:border-none'}
                             handleChange={handleChange} id={"email"}/>

                            <Input type={"password"} name={"password"} placeHolder={"password"} value={userData.password} style={'w-full h-11 px-4 py-2 rounded-xl border bg-green-50 border-gray-400 text-lg font-medium text-gray-600 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-300 focus:border-none'}
                            handleChange={handleChange} id={"password"}/>
                        </div>

                        <Button style={'w-[60%] mt-4 h-12 bg-green-500 text-white font-bold text-lg px-3 py-2 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out '} text={"Login"} type={"submit"} handleSubmit={()=>null}/>
                        
                  {loginError && show ? 
                   <ErrorModal visible={show} message={loginError} onClose={()=>setShow(false)}/>
                        : null    
                  }

                    </form>
            </div>
            
            {/* rihghht side */}
            {/* <div className='w-[35%] h-screen bg-green-200 relative bg-no-repeat cover' style={{backgroundImage:`url(https://th.bing.com/th/id/OIP.DtvOGzT7-FYCS0pG-jl5aQHaEK?rs=1&pid=ImgDetMain&cb=idpwebpc2)`}}> */}
            <div className='bg-gradient-to-r from-white to-green-200 w-[30%] flex flex-col justify-center items-center gap-2'>
                {/* <div className='absolute bg-blue/800-60 backdrop-blur-0 z-0 inset-0'></div> */}
                <h1 className='text-3xl font-extrabold text-gray-700 'style={{fontFamily:"cursive"}}>New Here?</h1>
                <p className='w-3/4 text-center font-extrabold text-xl text-green-800 font-serif'>Join now to manage your tasks,</p>
                <p className='text-green-800 font-bold text-lg font-serif'> collaborate with your team, and boost productivity!</p>
                <a href='/register' className='font-bold text-3xl text-green-700 text-center mt-2 underline' style={{fontFamily:"cursive"}}>Register 📝</a>
            </div>
            
        </div>
        // cursive
        
        // <div className='min-h-screen relative flex justify-center items-center bg-cover bg-center'style={{backgroundImage:`url(https://wallpapers.com/images/hd/2440x1440-office-background-2440-x-1440-82eeic10fd5b1qb6.jpg)`}} >
        //     <div className='absolute bg-blue/800-60 backdrop-blur-0 z-0 inset-0'></div>
        //     <form onSubmit={handleSubmit} className='w-full max-w-xl border border-gray-300 rounded-lg flex flex-col  items-center gap-6 py-4 shadow-lg bg-white/10 backdrop-blur-md z-1'>
              
        //          <div className='w-full flex flex-col justify-center'>
        //             <h1 className='font-bold text-2xl mx-auto text-gray-800 mb-4 '>Login</h1>
        //         <div className='w-3/4 h-[2px] bg-gray-600 mx-auto'></div>
        //         </div>

        //         <Input type={"email"} name={"email"} placeHolder={"email"} value={userData.email} style={'w-3/4 px-3 py-2 text-md border border-gray-600 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring=blue-400 hover:border-blue-400'}
        //         handleChange={handleChange} id={"email"}/>

        //         <Input type={"password"} name={"password"} placeHolder={"password"} value={userData.password} style={'w-3/4 px-3 py-2 text-md border border-gray-600 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring=blue-400  hover:border-blue-400'}
        //         handleChange={handleChange} id={"password"}/>
              
        //         <Button style={'w-3/4 font-bold text-md bg-blue-400 rounded-md text-center px-4 py-3 '} text={"Login"} type={"submit"} handleSubmit={()=>null}/>
        //             <div className='w-3/4 '><a href='/register' className='block text-center font-semibold text-md cursor-pointer hover:underline'>Don't have an account Create one!</a></div>
        //         <div className='w-full flex flex-col items-center gap-2'>
        //             <p className='mx-auto font-bold text-lg '>or</p>
        //             <div className='bg-gray-500 h-[2px] w-2/4 ' ></div>
        //             <div className='flex justify-around items-center w-1/4'>
        //                 <i className=""><img src="https://imagepng.org/wp-content/uploads/2019/08/google-icon-1.png " className='w-7 h-7 object-contain '/></i>
        //                 <i className="fa-solid fa-envelope font-bold text-2xl text-blue-500"></i>  
        //                 <i className="fa-solid fa-phone font-bold text-2xl text-green-500"></i>  
        //             </div>
        //         </div>

        //         {loginError && show ? 
        //            <>
        //            <div className='fixed inset-0 bg-gray-800/60 z-40 '></div>
        //              <div className='fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-full max-w-sm bg-white rounded-lg shadow-lg border border-black'>
                    
        //                 <div className='flex flex-col justify-around gap-2 border border-b bg-white w-full'>
        //                        <div className='flex justify-end items-center w-full p-2 bg-black'>
        //                             {/* <button className='text-lg font-bold text-white px-2 border border-white rounded-sm' onClick={()=>setShow(false)}>X</button> */}
        //                             <Button style={"text-lg font-bold text-white px-2 border border-white rounded-sm"} handleSubmit={()=>setShow(false)} type={"submit"} text={"x"}/>
        //                         </div> 
        //                         <p className='py-4 text-md font-semibold px-2 text-center'>
        //                             {loginError}
        //                         </p>
        //                 </div>
                        
        //             </div>
        //            </>
        //                 : null    
        //     }
        //     </form>
        // </div>
    )
}
