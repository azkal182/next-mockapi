"use client"
import React, { useState, useEffect } from 'react';
import { Input } from "@nextui-org/input";


const data = [
	"person.bio",
	"person.firstName",
	"person.fullName",
	"person.gender",
	"person.sex",
	"person.jobArea",
	"person.jobDescriptor",
	"person.jobTitle",
	"person.jobType",
	"person.lastName",
	"person.middleName",
	"person.prefix",
	"person.sexType",
	"person.suffix",
	"person.zodiacSign",
	"commerce.department",
	"commerce.price",
	"commerce.product",
	"commerce.productAdjective",
	"commerce.productDescription",
	"commerce.productMaterial",
	"commerce.productName",
	"location.buildingNumber",
	"location.cardinalDirection",
	"location.city",
	"location.country",
	"location.countryCode",
	"location.county",
	"location.direction",
	"location.latitude",
	"location.longitude",
	"location.nearbyGPSCoordinate",
	"location.ordinalDirection",
	"location.secondaryAddress",
	"location.state",
	"location.street",
	"location.streetAddress",
	"location.timeZone",
	"location.zipCode"
]

function FormScheme({ formId, onSubmit, errors }) {
	const [inputs, setInputs] = useState([
		{ key: 'id', value: 'objek' },// State untuk menyimpan input key dan value
		{ key: 'name', value: 'person.fullName' },// State untuk menyimpan input key dan value
		{ key: '', value: '' } // State untuk menyimpan input key dan value
	]);
	const [formData, setFormData] = useState({
		endpoint: '',
		scheme: { id: 'objek' }
	});

	// Fungsi untuk menambah input baru
	const addInput = () => {
		setInputs([...inputs, { key: '', value: '' }]);
	};
	// Fungsi untuk menghapus input berdasarkan indeks
	const removeInput = (index) => {
		const newInputs = [...inputs];
		newInputs.splice(index, 1);
		setInputs(newInputs);

		// Update objek Scheme setelah menghapus input
		const newScheme = {};
		newInputs.forEach((input) => {
			if (input.key && input.value) {
				newScheme[input.key] = input.value;
			}
		});
		setFormData({ ...formData, scheme: newScheme });
	};


	// Fungsi untuk mengupdate data yang diinput dan Scheme saat ada perubahan
	const handleInputChange = (name, value, index) => {
		// const { name, value } = event.target;

		const newInputs = [...inputs];
		newInputs[index][name] = value.toLowerCase().trim();
		
		setInputs(newInputs);



		const newScheme = {};
		newInputs.forEach((input) => {
			if (input.key && input.value) {
				newScheme[input.key] = input.value;
			}
		});
		setFormData({ ...formData, scheme: newScheme });

	};

	const handleEndpointChange = (value) => {
		setFormData({ ...formData, endpoint: value.toLowerCase().trim() })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		onSubmit(formData)
//alert(JSON.stringify(formData))
	}

	return (
		<form id={formId} onSubmit={handleSubmit}>
			<h1 className="text-lg font-bold">Resource Name</h1>
			
			<div>
				<Input onValueChange={handleEndpointChange} value={formData.endpoint} color={errors.message ? 'danger':''} errorMessage={errors.message} autoFocus className="lowercase" placeholder="Example: users, comments, article" type="text" autoComplete="off" isRequired/>
			{/*
			{errors && <p className="text-sm text-red-500">{errors.message}</p>}
			*/}
			</div>
			<h1 className="mt-2 text-lg font-bold">Scheme</h1>
			<div className="space-y-2">
				{inputs.map((input, index) => (
					<div className="grid grid-cols-6 gap-2" key={index}>
						<Input
							type="text"
							name="key"
							className="col-span-2"
							placeholder="key"
							autoComplete="off"
							isRequired
							value={input.key}
							onChange={(event) => handleInputChange("key", event.target.value, index)}
						/>
						{/*
            <Input
              type="text"
              name="value"
              className="col-span-3"
              placeholder="Nilai"
              value={input.value}
              onChange={(event) => handleInputChange(event, index)}
            />
            */}
						<div className="col-span-3">
							<Autocomplete name="value" data={data} value={input.value} onChangeInput={(value) => {
								//alert(value)
								handleInputChange("value", value, index)


							}
							} />

						</div>
						
						{ index > 1 && (
						<button className="w-8 h-8 flex items-center justify-center rounded-full p-1 bg-slate-200 shadow rotate-45" type="button" onClick={() => removeInput(index)}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
							</svg>
						</button>
						)}
						
						
						
					</div>
				))}
				<button className="w-8 h-8 flex items-center justify-center rounded-full p-1 bg-slate-200 shadow" type="button" onClick={addInput}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
					</svg>
				</button>
				{/*
				<div>
					<h2>Output:</h2>
					<pre>{JSON.stringify(formData, null, 2)}</pre>
				</div>
				*/}
			</div>
		</form>
	);
}


const Autocomplete = ({ data, value, onChangeInput, ...props }) => {
	const [inputValue, setInputValue] = useState(value);
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	const handleChange = (e) => {
		const newValue = e.target.value;
		setInputValue(newValue);

		// Filter suggestions based on input value
		const filteredSuggestions = data.filter(item =>
			item.toLowerCase().includes(newValue.toLowerCase())
		);
		setSuggestions(filteredSuggestions);

		// Pass the updated value to the parent component
		onChangeInput(newValue);
	};

	const handleSelect = (selectedValue) => {
		setInputValue(selectedValue);
		setSuggestions([]);

		// Pass the selected value to the parent component
		onChangeInput(selectedValue);
		setInputValue(selectedValue)
	};

	return (
		<div className="col-span-3 relative">
			<Input
				type="text"
				value={inputValue}
				onChange={handleChange}
				placeholder="Search..."
				autoComplete="off"
				isRequired
				{...props}
			/>
			{suggestions.length > 0 && (
				<ul className="bg-gray-100 p-2 absolute z-10 right-0 overflow-scroll max-h-32 w-48 mt-2 rounded" >
					{suggestions.map((item, index) => (
						<li className="py-1" key={index} onClick={() => handleSelect(item)}>
							{item}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
export default FormScheme;
