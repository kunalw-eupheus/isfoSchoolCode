import instance from "./instance"


export const userLogin =async (email:string,password:string) => {
    try{
        const get = await instance.post('/auth/login',{
            email,
            password
        })
        return get.data
        

    }catch(e:any){
        return {
            status:"error",
            message:"invalid login credentials"
        }
    }
}