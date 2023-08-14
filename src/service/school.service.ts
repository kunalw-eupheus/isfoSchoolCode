import Cookies from "js-cookie"
import instance from "./instance"
import { useDispatch } from "react-redux"
import { logout } from "../store/authReducer"


export const checkSchoolCode =async (code:string) => {
    try{
        const get = await instance.post('/school/schoolCodeCheck',{
            schoolCode:code,
        },
        {
            headers: {
                Authorization:Cookies.get('token')
            }
        }
        )
        return get.data
        

    }catch(e:any){

        if( e.response.status === 401 || e.response.status === 403){
            Cookies.remove("token")
            logout()
            window.location.href = "/";
        }
        if( e.response.status === 422){
            return {
            status:"error",
            message:"School Code Already Exists"
        }
        }
        return {
            status:"error",
            message:"server error"
        }
    }
}

export const getState =async () => {
    try{
        const get = await instance.get('/states',
        {
            headers: {
                Authorization:Cookies.get('token')
            }
        }
        )
        return get.data
        

    }catch(e:any){
        if( e.response.status === 401 || e.response.status === 403){
            Cookies.remove("token")
            logout()
            window.location.href = "/";
        }
        return {
            status:"error",
            message:"server error"
        }
    }
}
export const getsalesRep =async () => {
    try{
        const get = await instance.get('/salesReps',
        {
            headers: {
                Authorization:Cookies.get('token')
            }
        }
        )
        return get.data
        

    }catch(e:any){
        if( e.response.status === 401 || e.response.status === 403){
            Cookies.remove("token")
            logout()
            window.location.href = "/";
        }
        return {
            status:"error",
            message:"server error"
        }
    }
}

export const getAllSchool =async () => {
    try{
        const get = await instance.get('/school/allSchools',
        {
            headers: {
                Authorization:Cookies.get('token')
            }
        }
        )
        return get.data
        

    }catch(e:any){
        if( e.response.status === 401 || e.response.status === 403){
            Cookies.remove("token")
            logout()
            window.location.href = "/";
        }
        return {
            status:"error",
            message:"server error"
        }
    }
}

export const createSchool = async (schoolCode:string,
    amount:number,
    schoolName:string,
    schoolEmail:string,
    schoolPhone:number,
    schoolAddress:string,
    city:string,
    stateId:string,
    pincode:string,
    coordinatorName:string,
    salesRepId:number
    ) =>{
    try{
        const get = await instance.post('/school/create',{
            schoolCode,
            amount,
            schoolName,
            schoolEmail,
            schoolPhone,
            schoolAddress,
            city,
            stateId,
            pincode,
            coordinatorName,
            salesRepId
        },
        {
            headers: {
                Authorization:Cookies.get('token')
            }
        }
        )
        return get.data
        

    }catch(e:any){
        console.log(e)
        if( e.response.status === 401 || e.response.status === 403){
            Cookies.remove("token")
            logout()
            window.location.href = "/";
        }
        return {
            status:"error",
            message:"server error"
        }
    }
}


