import NavBar from "../../components/layouts/navbar"

const AppLayout = ({children}) =>{
	return (
		<>
		<NavBar />
				<main>
					{children}
				</main>
		</>
		)
}

export default AppLayout