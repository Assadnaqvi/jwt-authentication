"use client";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router=useRouter();
   
  const handleSubmit=async (event:any)=>{
    event.preventDefault();
const formData=new FormData(event.target);
const username=formData.get("username");
const password=formData.get("password");

const res=await fetch("/api/login",{

  method:"POST",
  body:JSON.stringify({username,password}),
});

const {accessToken}=await res.json();
console.log(accessToken);
if(accessToken){
  router.push("/");
}else{
  alert("login Failed")
}

  };
  return (
	<div className="flex flex-col gap-8 justify-center items-center w-full h-full">
    <h1>JWT Token</h1>
    
    <form 
    onSubmit={handleSubmit}
    className="flex flex-col gap-8 justify-center items-center"
    >
<label>
Username:
<input

type="text"
name="username"
placeholder="Username"
className="text-black outline-none border border-gray-400 ml-2 rounded-lg"/>



</label>

<label>
password:

<input
type="password"
name="password"
placeholder="password"
className="text-black outline-none border border-gray-400 ml-2 rounded-lg"/>



</label>
<button
type="submit"
className="border bg-blue-300 px-3 py-2 rounded-lg hover:bg-blue-700 hover:text-white">Login</button>




    </form>
    
    
    
    
    </div>
  )
}