import type { RegisterUserProps } from "../types/data";


export default function FormCheck(data:RegisterUserProps):boolean {
    const {name,email,password,confirmPassword,role,department}=data

    if(!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() || !role.trim() || !department.trim()){
        alert("please fill all the fields")
        return false
    }

    if(password !== confirmPassword)
    {
        alert("password doesnt match")
        return false
    }
    if(password.length<6) {
        alert("Password must be atleast 6 letters")
        return false
    }

    return true
}
