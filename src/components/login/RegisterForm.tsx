import React, { useRef, useState } from 'react'
import { auth } from "../../googleSignIn/config.ts"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import type { RegisterUserProps} from '../../types/data.ts'
import { FirebaseError } from 'firebase/app'
import { API } from '../../global.ts'
import { useMutation } from '@tanstack/react-query'
import { postData } from '../../Api/postData.ts'
import { useNavigate } from '@tanstack/react-router'
import Button from '../base/Button.tsx'
import Input from '../base/Input.tsx'
import ErrorModal from '../miniComp/ErrorModal.tsx'
import FormCheck from '../../utility/FormCheck.ts'





export default function RegisterForm() {
    const [data, setData] = useState<RegisterUserProps>({ UID: "", name: "", email: "", password: "", confirmPassword: "", role: "employee", department: "" })
    const [error, setError] = useState<string | null>(null)
    const [show, setSHow] = useState<boolean | null>(null)
    const adminRef = useRef<HTMLSelectElement | null>(null)
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: (newUserData: RegisterUserProps) => postData({ url: API, data: newUserData }),
        onSuccess: () => navigate({ to: "/login" }),
        onError: (err) => {
            console.error(err)
            setError(err.message)
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
         const { name, value } = e.target;

        const processedValues = (name === "email")
            ? value.toLowerCase()
            : value;

        setData((prev) => ({...prev,[name]: processedValues}));
        console.log("value",value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        
        if(!FormCheck(data)) return

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(userCredential.user, { displayName: data.name })
            const newData = {
                ...data,
                UID: userCredential?.user.uid
            }
            mutation.mutate(newData)

        }
        catch (err: unknown) {
            console.log(err)
            if (err instanceof FirebaseError) {
                switch (err.code) {
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
            else if (err instanceof Error) {
                setError("server error")
            }
        }

    }

    return (

        <div className='min-h-screen flex  w-full relative '>
            {/* left side */}
            <div className='bg-gradient-to-r from-green-200 to-white w-[30%] flex flex-col justify-center items-center gap-2'>

                <h1 className='text-2xl font-extrabold text-gray-700 ' style={{ fontFamily: "cursive" }}>Already an employee then</h1>
                <h1 className='text-2xl font-extrabold text-gray-700 ' style={{ fontFamily: "cursive" }}>Lets Get to Work! 💼</h1>
                <p className='w-3/4 text-center font-extrabold text-xl text-green-800 font-serif'>  Access your tasks, stay updated,</p>
                <p className='text-green-800 font-bold text-lg font-serif'>and collaborate with your team in real time!</p>
                <a href='/login' className='font-bold text-3xl text-green-700 text-center mt-2 underline' style={{ fontFamily: "cursive" }}>Login 📝</a>
            </div>

           {/* logo */}
            <div className='w-1/4 flex justify-start items-center absolute top-6 left-3 space-x-1 '>
                <img src="https://th.bing.com/th/id/R.c84102556606a346c0ddcafbee4ecb73?rik=1QDP1j7PCQzwxA&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fteamwork-transparent-background%2fteamwork-transparent-background-23.png&ehk=5NyTHXOsWiBMprJhWu4mlAztWrqR%2fqYgM3TXFzBeZXc%3d&risl=&pid=ImgRaw&r=0" className='w-24 h-18 object-contain inline-block' />
                <h1 className='font-sans text-xl font-bold inline'>Work <span className='text-green-600 font-extrabold text-2xl'>Stack</span></h1>
            </div>
            {/* righrt side */}

            <div className='w-[70%] flex justify-center items-center '>
                <form className='w-full max-w-xl  px-6 py-4  flex flex-col items-center justify-center gap-6' onSubmit={handleSubmit}>
                    <h1 className='text-3xl font-extrabold text-gray-700 text-center'>Register Your Account</h1>
                    <div className='w-3/4 h-[1px] bg-green-600 mx-auto my-2'></div>



                    <Input type={"text"} name={"name"} placeHolder={"Enter Your Name"} value={data.name}
                        style={'w-[85%] h-11 px-4 py-2 bg-white rounded-xl border border-gray-400 text-lg font-medium text-gray-600 focus:outline-none focus:bg-green-50 focus:ring-2 focus:ring-green-300 focus:border-none'}
                        handleChange={handleChange} id={"name"} />

                    <Input type={"email"} name={"email"} placeHolder={"Enter Your Email"} value={data.email}
                        style={'w-[85%] h-11 px-4 py-2 bg-white rounded-xl border border-gray-400 text-lg font-medium text-gray-600 focus:outline-none focus:bg-green-50 focus:ring-2 focus:ring-green-300 focus:border-none'}
                        handleChange={handleChange} id={"email"} />

                    <div className='w-[85%] flex justify-between items-center'>
                        <Input type={"password"} name={"password"} placeHolder='Create a  Password' value={data.password}
                            style={'w-[48%] h-11 px-4 py-2 bg-white rounded-xl border border-gray-400 text-lg font-medium text-gray-600 focus:outline-none focus:bg-green-50 focus:ring-2 focus:ring-green-300 focus:border-none'}
                            handleChange={handleChange} id={"password"} required={true} />

                        <Input type={"password"} name={"confirmPassword"} placeHolder='Confirm Password' value={data.confirmPassword}
                            style={'w-[48%] h-11 px-4 py-2 bg-white rounded-xl border border-gray-400 text-lg font-medium text-gray-600 focus:outline-none focus:bg-green-50 focus:ring-2 focus:ring-green-300 focus:border-none'}
                            handleChange={handleChange} id={"ConfirmPassword"} required={true} />

                    </div>
                    

                    <div className='w-[85%] flex justify-center items-center space-x-2'>
                        <label className='text-gray-800 font-semibold'>Role: </label>
                        <select required onChange={handleChange} name='role' value={data.role} ref={adminRef} className='w-1/2  h-11 px-4 py-2 bg-white rounded-xl border border-gray-400 text-lg font-medium text-gray-600 focus:outline-none focus:bg-green-50 focus:ring-2 focus:ring-green-300 focus:border-none'>
                            <option value="employee" className='w-full bg-white' >Employee</option>
                            <option value="admin" className='w-full bg-white'>Admin</option>
                        </select>
                    </div>


                    <div className='w-[85%] flex flex-col gap-4'>

                        <label className='text-gray-800 font-semibold mx-auto '>Department: </label>
                        <div className='w-full flex justify-center items-center'>
                            {["HR", "Finance", "Developer", "Admin"].map((role, index) => (
                                <div className={`flex  w-full gap-2 justify-center items-center  ${role === "Admin" ? "w-3/4" : "w-full"}`} key={index}>
                                    <label className='text-black font-semibold'>

                                        <Input type={"radio"} name={"department"} value={role} checked={data.department === role} handleChange={handleChange}
                                            style={"mr-2 w-4 h-4 accent-green-600 font-serif"} disabled={data.role === "admin" && role !== "Admin"} required={true} id={"department"} />
                                        {role}
                                    </label>
                                </div>


                            ))}
                        </div>
                    </div>

                    {error && <p className='text-red-400 font-semibold text-sm'>{error}</p>}



                    <Button style={'w-[60%] mt-4 h-12 bg-green-500 text-white font-bold text-lg px-3 py-2 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out '}
                        type={"submit"} text={"Register"} handleSubmit={handleSubmit} />




                </form>
                {show && error ?
                    <ErrorModal visible={show} message={error} onClose={() => setSHow(false)} />
                    : null}
            </div>

        </div>


    )
}
