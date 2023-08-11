import React, { useEffect, useState } from 'react'
import TopNav from '../component/TopNav'
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler } from "react-hook-form";
import { checkSchoolCode, createSchool, getState, getsalesRep } from '../service/school.service';
import { toast } from 'react-toastify';
import { Autocomplete } from '@mui/material';
interface schoolCreate {
    sname: string,
    amount:number,
    email:string,
    phone:number,
    city:string,
    state:string,
    pin:string,
    cname:string,
    rep:string,
    address:string,
    code:string
  }

export default function NewSchool() {

    const [schoolCodeStatus, setSchoolCodeStatus] = useState<boolean>(false);
    const [schoolCode, setSchoolCode] = useState("");
    const [stateList, setStateList] = useState([]);
    const [RepList, setRepList] = useState([]);
    const [selectedState, setSelectedState] = useState<any>(null)
    const [selectedRep, setSelectedRep] = useState<any>(null)
    const [loading, setLoading] = useState(false);

    const { register, formState: { errors}, handleSubmit } = useForm<schoolCreate>();

    const onSubmit: SubmitHandler<schoolCreate> = async(data:schoolCreate) =>{
         setLoading(true)
         const create =  await createSchool(
            schoolCode,
            data.amount,
            data.sname,
            data.email,
            data.phone,
            data.address,
            data.city,
            selectedState,
            data.pin,
            data.cname,
            selectedRep

         )
         console.log(create)
        console.log(data)
    };

    useEffect(() => {
      const Api = async () => {
        const rep = await getsalesRep();
        console.log(rep)
        const st = await  getState();
        setStateList(st?.data?.states)
        setRepList(rep?.data?.salesReps)
      }
      Api();
    }, [])
    const handleSchoolCode =  async(e:any)=>{
        setSchoolCode(schoolCode.replace(/ /g, ''))
        if(schoolCode === "" || schoolCode === undefined){
            toast.error("school Code required", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return false;
        }else if(schoolCode.length !== 5){
            toast.error("5 character school code required", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return false;
        }
        
        e.preventDefault();
        const get = await checkSchoolCode(schoolCode)
        if(get){
            if(get?.status === "error"){
                toast.error(get.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }else if(get?.status === "success"){
                toast.success(get?.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                setSchoolCodeStatus(true)
            }
        }
        // 
        }

  return (
    <>
        <TopNav /> 
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create New School</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 px-3 lg:px-8 ">
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="grid grid-cols-6 align-middle gap-4 justify-start content-center ">
                    <div className=' col-span-2'>
                    <TextField
                    inputProps={
                        { readOnly: schoolCodeStatus,
                            pattern: "^[a-zA-Z0-9 ]+$"
                         }
                    }
                    sx={{
                        width:1,
                    }}
                    required
                    
                    onChange={(e:any)=>setSchoolCode(e.target.value)}
                    
                    id="outlined-error"
                    label="school code"
                    
                    />
                    </div>
                    <div className=' col-span-3'>
                        <button onClick={handleSchoolCode} className=' bg-gray-800 text-white font-medium p-3 mt-1 '>
                            check Code
                        </button>
                    </div>
                </div>
                {
                    schoolCodeStatus ? 
                    (
                       <>
                        <div className="grid w-full  grid-rows-1 md:grid-cols-4 gap-2 mt-3">
                            <div className=' md:col-span-3 '>
                            <TextField
                            sx={{
                                width:1,
                            }}
                            error={errors.sname ? true : false}
                            {...register("sname", {
                                 required: "school name required",
                                 minLength:{
                                    value:3,
                                    message:"minimum 3 characters required"
                                }
                             }
                             )} 
                            id="outlined-error"
                            label="school Name"
                                />
                                {errors.sname ? (
                                    <p role="alert" className="input-error text-red-700">
                                    {errors.sname?.message}
                                    </p>
                                ) : null}
                            </div>
                            <div className=' md:col-span-1 '>
                            <TextField
                            sx={{
                                width:1,
                            }}
                            error={errors.amount ? true : false}
                            type="number"
                            {...register("amount", {
                                required: "amount required",
                            }
                            )} 
                            
                            id="outlined-error"
                            label=" Amount"
                                 />
                                 {errors.amount ? (
                                    <p role="alert" className="input-error text-red-700">
                                    {errors.amount?.message}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <div className="grid w-full  grid-rows-1 md:grid-cols-4 gap-2 mt-3">
                            <div className=' md:col-span-2 '>
                            <TextField
                            type='email'
                            error={errors.email ? true : false}
                            sx={{
                                width:1,
                            }}
                            {...register("email", {
                                required: "email requred",
                            }
                            )} 
                            
                            id="outlined-error"
                            label=" email"
                                />
                                 {errors.email ? (
                                    <p role="alert" className="input-error text-red-700">
                                    {errors.email?.message}
                                    </p>
                                ) : null}
                            </div>
                            <div className=' md:col-span-2 '>
                            <TextField
                            sx={{
                                width:1,
                            }}
                            error={errors.phone ? true : false}
                            type="number"
                            {...register("phone", {
                                required: "school name required",
                                minLength:{
                                   value:10,
                                   message:" 10 characters required"
                               },
                               maxLength:{
                                value:10,
                                message:" 10 characters required"
                            }
                            }
                            )} 
                            
                            id="outlined-error"
                            label=" phone"
                                 />
                                  {errors.phone ? (
                                    <p role="alert" className="input-error text-red-700">
                                    {errors.phone?.message}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                       <div className='my-3'>
                       <TextField
                            sx={{
                                width:1,
                                
                            }}
                            error={errors.address ? true : false}
                            {...register("address", {
                                required: "address requred",
                                minLength:{
                                    value:2,
                                    message:"minimum 2 characters required"
                                }
                            }
                            )} 
                            
                            id="outlined-error"
                            label=" Address"
                                />
                                 {errors.address ? (
                                    <p role="alert" className="input-error text-red-700">
                                    {errors.address?.message}
                                    </p>
                                ) : null}
                       </div>
                       <div className="grid w-full  grid-rows-1 md:grid-cols-6 gap-2 mt-3">
                            <div className=' md:col-span-2 '>
                            <TextField
                            sx={{
                                width:1,
                            }}
                            error={errors.city ? true : false}
                            {...register("city", {
                                required: "city requred",
                                minLength:{
                                    value:2,
                                    message:"minimum 2 characters required"
                                }
                            }
                            )} 
                            
                            id="outlined-error"
                            label="city"
                                />
                                 {errors.city ? (
                                    <p role="alert" className="input-error text-red-700">
                                    {errors.city?.message}
                                    </p>
                                ) : null}
                            </div>
                            <div className=' md:col-span-2 '>
                           <Autocomplete
                    disablePortal
                    options={stateList}
                    getOptionLabel={(option: any) => option.state}
                    sx={{ width: 1, marginBottom: "10px" }}
                    onChange={(event: any, newValue: any | null) => {
                    setSelectedState(newValue?.id);
                    }}
            renderInput={(params) => (
              <>
                <TextField
                  error={
                    selectedState == null
                      ? errors.state
                        ? true
                        : false
                      : false
                  }
                  {...params}
                  label="select state"
                  {...register("state", {
                    required: "state  required",
                  })}
                />
                {selectedState == null ? (
                  errors.state ? (
                    <p role="alert" className="input-error text-red-700">
                      {errors.state?.message}
                    </p>
                  ) : null
                ) : null}
              </>
            )}
          />

                                 
                            </div>
                            <div className=' md:col-span-2 '>
                            <TextField
                            sx={{
                                width:1,
                            }}
                            type="number"
                            error={errors.pin ? true : false}
                            {...register("pin", {
                                required: "pin requred",
                                minLength:{
                                    value:6,
                                    message:" 6 characters required"
                                },
                                maxLength:{
                                    value:6,
                                    message:" 6 characters required"
                                }
                            }
                            )} 
                            
                            id="outlined-error"
                            label=" Pin code"
                                 />
                                  {errors.pin ? (
                                    <p role="alert" className="input-error text-red-700">
                                    {errors.pin?.message}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <div className="grid w-full  grid-rows-1 md:grid-cols-4 gap-2 mt-3">
                            <div className=' md:col-span-2 '>
                            <TextField
                            sx={{
                                width:1,
                            }}
                            error={errors.cname ? true : false}
                            {...register("cname", {
                                required: "cname requred",
                                minLength:{
                                    value:3,
                                    message:" 3 characters required"
                                }
                            }
                            )} 
                            
                            id="outlined-error"
                            label="Co-ordinator Name"
                                />
                                 {errors.cname ? (
                                    <p role="alert" className="input-error text-red-700">
                                    {errors.cname?.message}
                                    </p>
                                ) : null}
                            </div>
                            <div className=' md:col-span-2 '>
                            <Autocomplete
                    disablePortal
                    options={RepList}
                    getOptionLabel={(option: any) => `${option.f_name} ${option.l_name}`}
                    sx={{ width: 1, marginBottom: "10px" }}
                    onChange={(event: any, newValue: any | null) => {
                    setSelectedRep(newValue?.id);
                    }}
            renderInput={(params) => (
              <>
                <TextField
                  error={
                    selectedState == null
                      ? errors.rep
                        ? true
                        : false
                      : false
                  }
                  {...params}
                  label="select state"
                  {...register("rep", {
                    required: "sales rep  required",
                  })}
                />
                {selectedRep == null ? (
                  errors.rep ? (
                    <p role="alert" className="input-error text-red-700">
                      {errors.rep?.message}
                    </p>
                  ) : null
                ) : null}
              </>
            )}
          />
                            </div>
                        </div>
                        <div className=" text-center my-4 ">
                        <button  type='submit'  className=' bg-green-800 text-white font-medium p-3 w-[40%] mt-1 '>
                            Create School
                        </button>
                        </div>
                       </>
                        
                    )
                        :
                        null
                }
            </form>
          </div>
        </main>
    </>
  )
}
