import {useState, useEffect} from "react"
import validation from "./validation";
import { useHistory } from "react-router-dom";
import UserStore from "./UserStore";

const useLoginForm = (submitForm) => 
{
    const [values, setValues] = useState({
        email: "",
        password: "",
        role: ""
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

        let result = await fetch("http://localhost:8666/sign-up", {
            method: 'POST',
            body: JSON.stringify(item),
            headers:{
                "Content-Type":'application/json',
                "Accept": 'application/json'
            }
        })
        result= await result.json()

        if(result && result.success){
            UserStore.isLoggedIn = true;
            UserStore.email = result.email;
        }
        else if(result && result.success === false)
        {
            alert(result.msg);  
        }
        
        history.push("/")
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && dataIsCorrect) {
            submitForm(true);
        }
    }, [errors]);

    return { handleChange, handleFormSubmit, errors, values }
}

export default useLoginForm;