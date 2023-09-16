"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"



import Link from 'next/link'

import { ScrollShadow,Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, cn,Button, Input,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";

import { useRouter } from 'next/navigation'
import { HiOutlineTrash, HiOutlinePencilAlt, HiOutlineClipboardCopy, HiLink, HiOutlineUsers } from "react-icons/hi"
import { Axios } from "../../../../hook/axios"
import ResourceDetail from "../../../../components/resource-detail"
import FormScheme from "../../../../components/form-scheme"
import Autocomplete from "../../../../components/autocomplete"
import toast from 'react-hot-toast';


export default function Page({ params }) {
	const [data, setData] = useState([])
	const [errors, setErrors] = useState({})
	const [listApi, setListApi] = useState([])
	//const { isOpen, onOpen, onOpenChange } = useDisclosure();
const router = useRouter()
	const [isOpen, setIsOpen] = useState(false); // Inisialisasi state dengan class Tailwind CSS
	const [width, setWidth] = useState('w-32'); // Inisialisasi state dengan class Tailwind CSS
	const [count, setCount] = useState(0);
	const [projectName, setProjectName] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const targetCount = 50; // Angka target yang ingin dicapai
	const duration = 1000; // Durasi animasi dalam milidetik


	const changeWidth = () => {

		setWidth(75); // Ganti dengan class lebar yang diinginkan
	};
	const getData = async () => {
		const { data } = await Axios(`/projects/${params.resourceId}/resources`
		)
		setData(data.result)
		setIsLoading(false)
		console.log(data.result)

	}
	
	const getProjectName = async () => {
		const { data } = await Axios(`/projects/${params.resourceId}`
		)
		setProjectName(data.result.name)

	}
	
	const deleteProject = async (projectId)=>{
		try {
			await Axios.delete(`/projects/${projectId}`)
			toast.success('Successfully menghapus project!');
			router.push('/project')
		} catch (e) {
			throw new Error('gagal menghapus projects !', e)
		}
	}

	const handleSubmit = async (value) => {
		try {

			const { data } = await Axios.post(`/projects/${params.resourceId}/resources`, {
				...value
			}
			)

			setIsOpen(false)
			getData()

		} catch (e) {
			if (e.response && e.response.status !== 500) {
				setErrors(e.response.data.errors)


			} else {
				throw new Error("Terjadi kesalahan. Silakan coba lagi nanti.");
			}
		}
	}

	const getListApi = async () => {
		const { data } = await Axios(`/list-api`);

		setListApi(data.listApi)

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
		getProjectName()
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
	}, [data]);

	return (
		<div className="px-4 py-2">
			<div className="py-2 flex items-center space-x-[10px] ">

				<Link className="text-blue-400" href="/project">
					Projects
				</Link>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
					<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
				</svg>

				{isLoading ? (
					<div className="flex items-center justify-center w-8 h-8 rounded-full text-center  animate-spin">
						<svg fill="#493bc4" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M41.9 23.9c-.3-6.1-4-11.8-9.5-14.4-6-2.7-13.3-1.6-18.3 2.6-4.8 4-7 10.5-5.6 16.6 1.3 6 6 10.9 11.9 12.5 7.1 2 13.6-1.4 17.6-7.2-3.6 4.8-9.1 8-15.2 6.9-6.1-1.1-11.1-5.7-12.5-11.7-1.5-6.4 1.5-13.1 7.2-16.4 5.9-3.4 14.2-2.1 18.1 3.7 1 1.4 1.7 3.1 2 4.8.3 1.4.2 2.9.4 4.3.2 1.3 1.3 3 2.8 2.1 1.3-.8 1.2-2.5 1.1-3.8 0-.4.1.7 0 0z"></path></g></svg>
					</div>) :

					(
						<>
							<motion.div
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -10 }}
								transition={{ duration: 0.2 }}
								className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-400 text-center text-white uppercase">
								{projectName[0]}
							</motion.div>


							<motion.div
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -10 }}
								transition={{ delay: 0.1, duration: 0.2 }}
							>
								{projectName}
							</motion.div>

							<motion.div initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -10 }}
								transition={{ delay: 0.2, duration: 0.2 }} className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-300 text-center">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
								</svg>

							</motion.div>


							<motion.div
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -10 }}
								transition={{ delay: 0.3, duration: 0.2 }}
								className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-300 text-center">
								<Dropdown>
									<DropdownTrigger>

										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
											<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
										</svg>

									</DropdownTrigger>
									<DropdownMenu aria-label="Static Actions">
										<DropdownSection title="ACTIONS" showDivider>

											<DropdownItem startContent={<HiOutlineUsers className="text-blue-500"/>}>Collabolatirs</DropdownItem>
											<DropdownItem startContent={<HiLink className="text-blue-500"/>}>Magic link</DropdownItem>
										</DropdownSection>

<DropdownSection showDivider>
										<DropdownItem startContent={<HiOutlineClipboardCopy />}>Clone</DropdownItem>
										<DropdownItem startContent={<HiOutlinePencilAlt />}>Edit</DropdownItem>
										</DropdownSection>
										<DropdownItem onClick={()=>{
											deleteProject(params.resourceId)
										}} startContent={<HiOutlineTrash className="text-red-500"/>}>Delete</DropdownItem>

									</DropdownMenu>
								</Dropdown>


							</motion.div>
						</>
					)}


			</div>


			{!isLoading && (
				<motion.div initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}>
					<ScrollShadow className="rounded-lg border border-2">
						<div

							className="bg-slate-100 p-2">
							<h1 className="text-lg font-bold">API endpoint</h1>
							<div className="whitespace-nowrap">
								{`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/${params.resourceId}/:endpoint`}
							</div>
						</div>
						<div className="py-3 px-2 flex items-center space-x-2">
							<Button onPress={() => setIsOpen(true)} size="sm" color="primary" variant="shadow">NEW RESOURCE</Button>

							<Modal placement={"top-center"} isOpen={isOpen} //onOpenChange={isOpen}
							>
								<ModalContent>
									{(onClose) => (
										<>
											<ModalHeader className="flex flex-col gap-1"></ModalHeader>
											<ModalBody>

												<FormScheme errors={errors} formId="createScheme" onSubmit={handleSubmit} />

											</ModalBody>
											<ModalFooter>
												<Button color="danger" variant="light" onPress={() => setIsOpen(false)}>
													Close
												</Button>
												<Button color="primary" type="submit" form="createScheme">
													Save
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
				</motion.div>
			)}

			<ul className="space-y-2 mt-2">
				{data && data.map((item, index) => (
					<motion.li
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ delay: 0.1 * (index + 1), duration: 0.2 }}
						key={item.id}>
						<ResourceDetail data={item} title={item.endpoint} resourceOnClick={(data) => { //alert(data)
							setData((prev) => {
								return prev.map((item) => {
									//alert(JSON.stringify(item,null,2))
									//alert(JSON.stringify({old:item.projectId, new:data.projectId},null,2))
									if (item.endpoint === data.endpoint) {
										return { ...item, count: data.count };
									}

									//alert(JSON.stringify({old:item,new:data},null,2))
									return item; // Pertahankan objek lainnya tanpa perubahan
								});
							});
						}} />
					</motion.li>
				))
				}
			</ul>








		</div>
	)
}
