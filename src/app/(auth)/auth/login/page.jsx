"use client"
import { useEffect, useState } from "react"
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from 'next/navigation'


export default function Home() {
	const [username, setUsername] = useState("")
	const [error, setError] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const [password, setPassword] = useState("")
	const router = useRouter()

	const login = async () => {
		setIsLoading(true)
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ username, password })
		});
		if (!response.ok) {
			if (response.status !== 500) {
				const errorText = await response.json();
				setError(errorText.errors);
				//console.log(JSON.stringify(errorText,null,2))
			//	alert(JSON.stringify(errorText.errors,null,2))
				return setIsLoading(false)
			} else {
				throw new Error('failed fetch data')
			}
		}
		const data = await response.json()
		
		setCookie("token", data.token)
		setIsLoading(false)
		router.push('/project')
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		login()
	}

	useEffect(() => {
		const token = getCookie('token')
		if (token) {
			router.push('/project')
		}
	}, [])

	return (
		<>
			<div className="">
				<div className="w-full p-8 mt-32">
					<h1 className="text-center text-xl">Login</h1>
					{error.message && <p className="text-red-500 text-sm text-center">{error.message}!</p>}
					<form className="space-y-4" onSubmit={handleSubmit}>
						<Input
							onChange={((e) => setUsername(e.target.value))}
							value={username}
							type="text"
							label="Username"
							placeholder="username"
							autoComplete="off"
							labelPlacement="outside"
						/>
						<Input
							onChange={((e) => setPassword(e.target.value))}
							value={password}
							type="password"
							label="Password"
							autoComplete="off"
							placeholder="password"
							labelPlacement="outside"
						/>
						<Button type="input" className="w-full" isLoading={isLoading}>Submit</Button>
					</form>
				</div>
			</div>

		</>
	)
}