"use client"
import { useEffect, useState } from "react"
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from 'next/link'
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, cn } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";


import ResourceDetail from "../../components/resource-detail"
import FormScheme from "../../components/form-scheme"
import Autocomplete from "../../components/autocomplete"

export default function Page({ params }) {
	const [data, setData] = useState([])
	const [listApi, setListApi] = useState([])
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [width, setWidth] = useState('w-32'); // Inisialisasi state dengan class Tailwind CSS
	const [count, setCount] = useState(0);
	const targetCount = 50; // Angka target yang ingin dicapai
	const duration = 1000; // Durasi animasi dalam milidetik


	const changeWidth = () => {
		// Fungsi ini akan memperbarui state lebar saat tombol diklik
		setWidth(75); // Ganti dengan class lebar yang diinginkan
	};
	const getData = async () => {
		const response = await fetch(`http://localhost:2000/projects/${params.resourceId}/resources`, {
			headers: {
				"authorization": "bearer b4e8c7b6-32a0-4560-9dcc-bb52e7cc71bf"
			}
		});
		if (!response.ok) {
			throw new Error('failed fetch data')
		}
		const data = await response.json()
		setData(data.data)

	}

	const getListApi = async () => {
		const response = await fetch(`http://localhost:2000/list-api`, {
			headers: {
				"authorization": "bearer b4e8c7b6-32a0-4560-9dcc-bb52e7cc71bf"
			}
		});
		if (!response.ok) {
			throw new Error('failed fetch data')
		}
		const data = await response.json()
		setListApi(data.data)

	}

	const handleMouseOver = (e) => {
		const button = e.target;
		const buttonWidth = button.offsetWidth;
		const mouseX = e.nativeEvent.offsetX;
		const percentage = (mouseX / buttonWidth) * 100;

		alert(`Mouse berada di posisi ${percentage}% dari lebar button.`);
	};

	const handleClick = (e) => {
		const button = e.target;
		const buttonWidth = button.offsetWidth;
		const mouseX = e.nativeEvent.offsetX;
		const percentage = (mouseX / buttonWidth) * 100;
		setWidth(percentage.toFixed());

		//	alert(`Mouse diklik di posisi ${percentage.toFixed()}% dari lebar button.`);
	};

	useEffect(() => {
		getData()
		getListApi()
	}, [])

	useEffect(() => {
		let startCount = 0;
		let startTime = null;

		const updateCount = (timestamp) => {
			if (!startTime) startTime = timestamp;
			const progress = timestamp - startTime;
			const percentage = Math.min(1, progress / duration);
			const newCount = Math.floor(percentage * (targetCount - startCount) + startCount);

			setCount(newCount);

			if (percentage < 1) {
				requestAnimationFrame(updateCount);
			}
		};

		requestAnimationFrame(updateCount);
	}, []);

	return (
		<div className="p-4">
			<div className="py-2 flex items-center space-x-2 justify-between">
				<span className="text-blue-300">Projects</span>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
					<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
				</svg>

				<div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-400 text-center text-white">
					P
				</div>


				<div>
					Product
				</div>

				<div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-300 text-center">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
					</svg>

				</div>

				<div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-300 text-center">
					<Dropdown>
						<DropdownTrigger>

							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
							</svg>

						</DropdownTrigger>
						<DropdownMenu aria-label="Static Actions">
							<DropdownSection title="ACTIONS" showDivider>

								<DropdownItem key="new">Collabolatirs</DropdownItem>
								<DropdownItem key="copy">Magic link</DropdownItem>
							</DropdownSection>


							<DropdownItem key="new">Clone</DropdownItem>
							<DropdownItem key="copy">Edit</DropdownItem>
							<DropdownItem key="copy">Delete</DropdownItem>

						</DropdownMenu>
					</Dropdown>


				</div>


			</div>
			<ScrollShadow className="rounded-lg border border-2">
				<div className="bg-slate-100 p-2">
					<h1 className="text-lg font-bold">API endpoint</h1>
					<div className="whitespace-nowrap">
						{`http://localhost:2000/api/${params.resourceId}/:endpoint`}
					</div>
				</div>
				<div className="p-2 flex items-center space-x-2">
					<Button onPress={onOpen} size="sm" color="primary" variant="shadow">NEW RESOURCE</Button>

					<Modal placement={"top-center"} isOpen={isOpen} onOpenChange={onOpenChange}>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1"></ModalHeader>
									<ModalBody>

							<FormScheme/>

									</ModalBody>
									<ModalFooter>
										<Button color="danger" variant="light" onPress={onClose}>
											Close
										</Button>
										<Button color="primary" onPress={onClose}>
											Action
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>



					<Button size="sm">GENERATE ALL</Button>
					<Button size="sm">RESET ALL</Button>
				</div>
			</ScrollShadow>
			<ul className="space-y-2">
				{data && data.map((item) => (
					<li key={item.id}>
						<ResourceDetail data={item} title={item.endpoint} resourceOnClick={(id, count) => alert(id)} />
					</li>
				))
				}
			</ul>








		</div>
	)
}
