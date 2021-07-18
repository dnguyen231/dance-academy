
export const validation = (values) => {

    let errors={};

    if(!values.firstname){
        errors.firstname="First Name is required.";
    }

    if(!values.lastname){
        errors.lastname="Last Name is required.";
    }

    if(!values.dob){
        errors.dob="DOB is required.";
    }

    if(!values.phone){
        errors.phone="Phone Number is required.";
    }

    if(!values.address){
        errors.address="Address is required.";
    }

    if(!values.email){
        errors.email="Email is required.";
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="Email is invalid.";
    }
    if(!values.password){
        errors.password="Password is required.";
    }else if(values.password.length < 5){
        errors.password="Password must be more than five characters"
    }

    return errors;
    
}

export default validation;