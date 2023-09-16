"use client"
import { useState, useEffect } from 'react';
import {Axios} from "../../hook/axios"
export default function Project(){ 
	const [data, setData] = useState([])
	const [value, setValue] = useState("/protected")
	
	const getData = async () =>{
		const response= await Axios(value)
		setData(response.data)
	}
	
	const onValueCahnge = (e) => {
		setValue(e.target.value)
	}
	
	return (
		<>
		<div>hello</div>
		<input type="text" onChange={onValueCahnge} value={value} />
		<button onClick={getData}>fetch</button>
		
		<pre>{JSON.stringify(data, null,2)}</pre>
		</>
		);
}