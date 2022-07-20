import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { geoApiUrl, geoApiOptions } from "../../api";

const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null);

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    const loadOptions = (inputValue) => {
        return fetch(`${geoApiUrl}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
        .then((response) => response.json())
        .then((response) => {
            return {
                options: response.data.map((city) => {
                    return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`
                    }
                })
            };
        })
        .catch(err => console.error(err));
    }

    return (
        <AsyncPaginate placeholder="Search for city" 
        debounceTimeout={600} 
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}></AsyncPaginate>
    );
}

export default Search;