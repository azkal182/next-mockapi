"use client"
import { useEffect, useState } from "react"
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from 'next/navigation'


export default function Home() {
	const [username, setUsername] = useState("")
	const [name, setName] = useState("")
	const [error, setError] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const [password, setPassword] = useState("")
	const [CPassword, setCPassword] = useState("")
	const router = useRouter()

	const register = async () => {
		setIsLoading(true)
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ username, password, name })
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

		register()
	}

	useEffect(() => {
		const token = getCookie('token')
		if (token) {
			router.push('/project')
		}
	}, [])

	useEffect(() => {
		if (password && CPassword && password !== CPassword) {
			setError({ password: "Password dan confirmPassword harus sama", CPassword: 'Password dan confirmPassword harus sama' })
		} else {
			setError({ password: "", CPassword: "" })
		}
		if (name) {
			setError({ name: '' })
		}

		if (username) {
			setError({ username: '' })
		}

	}, [name, username, password, CPassword])

	return (
		<>
			<div className="">
				<div className="w-full p-8 mt-32">
					<h1 className="text-center text-xl">Register</h1>
					{error.message && <p className="text-red-500 text-sm text-center">{error.message}!</p>}
					<form className="space-y-4" onSubmit={handleSubmit}>
						<Input
							autoFocus
							validationState={error.name ? 'invalid' : ''}
							errorMessage={error.name ? error.name : ''}

							onChange={((e) => setName(e.target.value))}
							value={name}
							type="text"
							label="Name"
							placeholder="Name"
							autoComplete="off"
							required
							labelPlacement="outside"
						/>
						<Input
							validationState={error.username ? 'invalid' : ''}
							errorMessage={error.username ? error.username : ''}
							required
							onChange={((e) => setUsername(e.target.value))}
							value={username}
							type="text"
							label="Username"
							placeholder="username"
							autoComplete="off"
							labelPlacement="outside"
						/>
						<Input
							validationState={error.password ? 'invalid' : ''}
							errorMessage={error.password ? error.password : ''}
							onChange={((e) => setPassword(e.target.value))}
							required
							value={password}
							type="password"
							label="Password"
							autoComplete="off"
							placeholder="password"
							labelPlacement="outside"
						/>
						<Input
							validationState={error.CPassword ? 'invalid' : ''}
							errorMessage={error.CPassword ? error.CPassword : ''}
							onChange={((e) => setCPassword(e.target.value))}
							required
							value={CPassword}
							type="password"
							label="Confirm Password"
							autoComplete="off"
							placeholder="Confirm password"
							labelPlacement="outside"
						/>
						<Button type="input" className="w-full" isLoading={isLoading}>Submit</Button>
					</form>
				</div>
			</div>

		</>
	)
}