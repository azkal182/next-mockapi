"use client"
import { useState, useEffect } from "react"
import { Pacifico } from 'next/font/google'
import { Axios } from "../../hook/axios"
import { HiLogout, HiOutlineMail } from "react-icons/hi";
import {useRouter} from "next/navigation"
import {deleteCookie} from "cookies-next"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, cn, Button } from "@nextui-org/react";
// If loading a variable font, you don't need to specify the font weight
const pacifico = Pacifico({ weight: '400', subsets: ['latin'] })


export default function NavBar() {
	const [user, setUser] = useState({})
const router= useRouter()
	const getUser = async () => {
		try {
			const { data } = await Axios('/users/current')
			
			setUser(data.user)
		} catch (e) {
			//throw new Error('gagal mendapatkan user')
		}
	}

	useEffect(() => {
		getUser()
	}, [])

	return (
		<nav className="px-4 py-2 flex items-center justify-between bg-slate-100">
			<div className={`${pacifico.className} text-2xl`}>
				mockapi.io
			</div>

			<div className={`${pacifico.className} text-xl`}>
				<Dropdown>
					<DropdownTrigger className="bg-slate-300 p-1.5 rounded-full h-8 w-8">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
						</svg>
					</DropdownTrigger>
					<DropdownMenu aria-label="Static Actions">
						<DropdownSection title={user? 'hi, ' + user.name+'!':'no'}>
							<DropdownItem startContent={<HiOutlineMail />}>Update Email</DropdownItem>
							<DropdownItem onClick={()=>{
								deleteCookie('token')
								router.push('/auth/login')
							}} startContent={<HiLogout />}>Logout</DropdownItem>
						</DropdownSection>
					</DropdownMenu>
				</Dropdown>
			</div>

		</nav>
	)
}