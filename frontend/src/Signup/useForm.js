import {useState, useEffect} from "react"
import validation from "./validation";
import { useHistory } from "react-router-dom";


const useForm = (submitForm) => 
{
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        dob: "",
        phone: "",
        address: "",
        email: "",
        password: "",
    }
    );

    const history = useHistory();

    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect ] = useState(false);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    async function handleFormSubmit() {
        setErrors(validation(values));
        setDataIsCorrect(true);

        let item = values;
        console.log(item);

        // let result = await fetch("", {
        //     method: 'POST',
        //     body: JSON.stringify(item),
        //     headers:{
        //         "Content-Type":'application/json',
        //         "Accept": 'application/json'
        //     }
        // })
        // result= await result.json()
        // localStorage.seItem("user-info", JSON.stringify(result))
        // history.push("/add")
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            submitForm(true);
        }
    }, [errors]);

    return { handleChange, handleFormSubmit, errors, values }
}

export default useForm;