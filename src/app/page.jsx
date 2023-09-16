"use client"
import { useEffect, useState } from "react"
import { Button } from "@nextui-org/button";
import {getCookie} from "cookies-next"
import {Axios} from "../hook/axios"
import Link from 'next/link'
import {useRouter} from "next/navigation"

export default function Page() {
	const router = useRouter()
const token = getCookie('token')

useEffect(()=>{
	if (token){
		router.push('/project')
	} else {
		
	}
},[token])

	return (
		<div className="flex items-center justify-center mt-28">
					<Link href={`/auth/login`}
							className="bg-blue-500 text-white rounded px-4 py-1">
							Login
						</Link>
								<Link href={`/auth/login`}
							className="bg-blue-500 text-white rounded px-4 py-1 ml-4">
							Register
						</Link>
		</div>
	)
}