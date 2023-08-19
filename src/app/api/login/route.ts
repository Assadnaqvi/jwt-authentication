import {getJWTSecretKey} from "@/lib/auth";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"; 

export async function POST(request:NextRequest){
    const body=await request.json();
    if(body.username==="admin"&& body.password==="admin"){

    const jwt=await new SignJWT({
        username:body.username,
        role:"admin",
    })
.setProtectedHeader({alg:"HS256"})
.setIssuedAt()
.setExpirationTime("1m")
.sign(new TextEncoder().encode(getJWTSecretKey()));
cookies().set("token",jwt,{
    httpOnly:true,
});

return NextResponse.json({accessToken:jwt},{status:200});


    }
return NextResponse.json({Error:"Failed To Create Token"},
{status:400})
}