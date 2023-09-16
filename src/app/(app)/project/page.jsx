"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { Axios } from "../../../hook/axios"
import Link from 'next/link'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";


export default function Page() {
	//const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [data, setData] = useState([])
	const [nameProject, setNameProject] = useState("")
	const [isLoading, setIsLoading] = useState(true);
	const getData = async () => {
		const response = await Axios('/projects');
		setData(response.data)
		setIsLoading(false)
	}
	const [isOpen, setIsOpen] = useState(false)
	
	
const onOpenChange = ()=>{
	if (isOpen){
		setNameProject("")
	setIsOpen(false)
	} {
		setIsOpen(true)
	}
}

const openModal = ()=>{
	setIsOpen(true)
}

const closeModal = ()=>{
	setIsOpen(false)
	setNameProject("")
}

	const createProject = async () => {
		if (nameProject.length > 2) {
			try {
				await Axios.post('/projects', { name: nameProject });
				closeModal()
				getData()
			} catch (e) {
				throw new Error('gagal membuat project')
			}
		}

	}



	useEffect(() => {
		getData()
	}, [])


	return (
		<div className="px-4 py-2">
			<div className="py-2 flex items-center space-x-[10px]">
				<span className="text-blue-300">Projects</span>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
					<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
				</svg>
				{isLoading ? (
					<div className="flex items-center justify-center w-8 h-8 rounded-full text-center  animate-spin">
						<svg fill="#493bc4" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M41.9 23.9c-.3-6.1-4-11.8-9.5-14.4-6-2.7-13.3-1.6-18.3 2.6-4.8 4-7 10.5-5.6 16.6 1.3 6 6 10.9 11.9 12.5 7.1 2 13.6-1.4 17.6-7.2-3.6 4.8-9.1 8-15.2 6.9-6.1-1.1-11.1-5.7-12.5-11.7-1.5-6.4 1.5-13.1 7.2-16.4 5.9-3.4 14.2-2.1 18.1 3.7 1 1.4 1.7 3.1 2 4.8.3 1.4.2 2.9.4 4.3.2 1.3 1.3 3 2.8 2.1 1.3-.8 1.2-2.5 1.1-3.8 0-.4.1.7 0 0z"></path></g></svg>
					</div>) : (
					<button onClick={openModal} className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-center text-white shadow-lg">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>

					</button>
				)}


			</div>

			<Modal placement="top" isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Create New Project</ModalHeader>
							<ModalBody>
								<Input autoFocus value={nameProject} onValueChange={(value) => setNameProject(value)} labelPlacement="outside" label="Project Name" type="text" required placeholder="Examples :  project, cashier" />

							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={closeModal}>
									Cancel
								</Button>
								<Button color="primary" onPress={createProject}>
									Create
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
			<AnimatePresence>
				<ul className="space-y-4">
					{data.results && data.results.map((item, index) => (
						<motion.li key={item.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.2 * (index + 1) }}

						>
							<Link href={`/project/${item._id}`}
								//className="bg-blue-400 text-white rounded px-4 py-1"
								className="flex items-center space-x-2"
							>
								<div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-400 text-white shadow-lg">{item.name[0]}</div>
								<div>{item.name}</div>
							</Link>
						</motion.li>
					))
					}
				</ul>
			</AnimatePresence>
		</div>
	)
}