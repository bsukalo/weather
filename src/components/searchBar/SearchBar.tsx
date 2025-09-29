import { useState } from "react";
import "./SearchBar.css";

interface Props {
	onSearch: (query: FormDataEntryValue | null) => void;
}

const SearchBar = ({ onSearch }: Props) => {
	const [citySearch, setCitySearch] = useState("");
	const search = (formData: FormData) => {
		onSearch(formData.get("query"));
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCitySearch(e.target.value);
	};

	return (
		<form action={search}>
			<div className="searchbar-container">
				<div className="searchbar">
					<input
						type="text"
						value={citySearch}
						name="query"
						placeholder="Search for a city..."
						onChange={handleChange}
					></input>
					<button type="submit">Search</button>
				</div>
			</div>
		</form>
	);
};

export default SearchBar;
