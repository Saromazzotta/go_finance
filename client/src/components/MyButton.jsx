import { useState } from "react"


const MyButton = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    const handleFetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080');
            if (!response) {
                throw new Error("Network response was not okay.");
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <button onClick={handleFetchData}>Click me</button>
            {data && <div>Data: {JSON.stringify(data)}</div>}
            {error && <div>Error: {error}</div>}
        </div>
    )
}


export default MyButton