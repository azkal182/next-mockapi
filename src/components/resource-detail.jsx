"use client"
import { useEffect, useState } from "react"
import { Button } from "@nextui-org/button";
import { Axios } from "../hook/axios"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";
import toast from 'react-hot-toast';

export default function ResourceDetail({ title, resourceOnClick, data }) {
	//const [data, setData] = useState([])

	const [dataResource, setDataResource] = useState('{"":"azkal"}')
	const [isOpen, setIsOpen] = useState(false)
	const [width, setWidth] = useState(0); // Inisialisasi state dengan class Tailwind CSS


	const generateData = async (projectId, resourceId, count) => {
		try {
			const response = await Axios(`/projects/${projectId}/resources/${resourceId}/generate?count=${count}`)
			toast.success('Successfully generated data!');
		} catch (e) {
			throw new Error('error generate data')
		}
	}

	const getResourceData = async (projectId, endpoint) => {
		const { data } = await Axios(`/api/${projectId}/${endpoint}`)
		setDataResource(JSON.stringify(data, null, 2))
	}

	const openModal = (projectId, endpoint) => {
		setIsOpen(true)
		getResourceData(projectId, endpoint)
	}

	const colseModal = () => {
		setIsOpen(false)
		setDataResource("")
	}

	const onOpenChange = () => {

		if (isOpen) {
			setIsOpen(false)
			setDataResource("")
		} else {
			setIsOpen(true)
		}
	}
	const changeWidth = () => {
		// Fungsi ini akan memperbarui state lebar saat tombol diklik
		setWidth(75); // Ganti dengan class lebar yang diinginkan
	};


	const handleMouseOver = (e) => {
		const button = e.target;
		const buttonWidth = button.offsetWidth;
		const mouseX = e.nativeEvent.offsetX;
		const percentage = (mouseX / buttonWidth) * 100;

		//	alert(`Mouse berada di posisi ${percentage}% dari lebar button.`);
	};

	const handleClick = (e) => {
		const button = e.target;
		const buttonWidth = button.offsetWidth;
		const mouseX = e.nativeEvent.offsetX;
		const percentage = (mouseX / buttonWidth) * 100;
		setWidth(percentage.toFixed());

		resourceOnClick({ endpoint: data.endpoint, count: percentage.toFixed() })
		generateData(data.projectId, data._id, percentage.toFixed())


	};


	return (
		<div className="rounded ml-4 p-1 group hover:border">
			<div className="w-28 text-xs text-center">
				{title}
			</div>
			<div className="flex items-center space-x-4">
				<div onMouseOver={handleMouseOver}
					onClick={handleClick}
					className="relative text-center flex items-center bg-gray-100 w-28 h-7 rounded p-0.5">
					<div className="absolute text-sm inset-0 flex items-center justify-center">
						{/*		{width}
					*/}
						{data.count ? data.count : 0}
					</div>
					<div style={{ width: `${data.count ? data.count : 0}%`, transition: 'width 0.5s' }} className="bg-blue-500 h-full rounded"></div>

				</div>
				<div className="flex opacity-0 group-hover:opacity-100 items-center space-x-2">
					<button onClick={() => {
						openModal(data.projectId, data.endpoint)
					}} className="bg-gray-300 text-xs px-2 py-1 rounded">Data</button>
					<button className="bg-gray-300 text-xs px-2 py-1 rounded">Edit</button>
					<button className="bg-gray-300 text-xs px-2 py-1 rounded">Delete</button>
				</div>
			</div>



			<Modal placement="top" isOpen={isOpen} scrollBehavior="inside" onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Resource Data</ModalHeader>
							<ModalBody>
								<p className="text-xs">Edit/replace data for users resource. Data must be an array and a valid JSON.</p>
								<Textarea
									maxRows="50"
									onValueChange={(value) => {
										setDataResource(value)
									}}
									labelPlacement="outside"
									placeholder="Enter your description"
									value={dataResource}
									className="text-xs"
								/>


							</ModalBody>
							<ModalFooter className="flex">
								<div className="grid grid-cols-2 w-full">
									<Button color="danger" variant="light" onPress={onClose}>
										CANCEL
									</Button>
									<Button color="primary" onPress={colseModal}>
										UPDATE
									</Button>
								</div>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>







		</div>
	)
}