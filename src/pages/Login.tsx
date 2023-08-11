import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { userLogin } from '../service/auth.service';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

import { login } from '../store/authReducer';
interface LoginForm {
  email:string,
  password:string
}
export default function Login() {

  const { register, formState: { errors }, handleSubmit } = useForm<LoginForm>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<LoginForm> = async(data) => {
    setLoading(true)
    const get:any = await userLogin(data.email,data.password);
      if(get.status === 'error'){
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
          setLoading(false)
      }else if(get.status === 'success'){
        Cookies.set("token",`${get.data?.user?.token}`)
        Cookies.set("user",`${get.data?.user?.email}`)
        dispatch(login());
        navigate("/user/create-school");
      }
        
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-20 w-auto"
        src="https://www.eupheus.in/static/media/logo.f9fd97ff89ac44ae2b1f.png"
        alt="Your Company"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} >
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              {...register("email", {
                required: "email required",
            }
            )} 
              type="email"
              
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.email ? (
                                    <p role="alert" className="input-error text-red-700">
                                    {errors.email?.message}
                                    </p>
                                ) : null}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              {...register("password", {
                required: "password required",
            }
            )} 
              type="password"
              autoComplete="current-password"
              
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
              {errors.password ? (
                                    <p role="alert" className="input-error text-red-700">
                                    {errors.password?.message}
                                    </p>
                                ) : null}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading ? true : false}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? "Logging..." : "Sign In"}
          </button>
        </div>
      </form>

    
    </div>
  </div>
  )
}
