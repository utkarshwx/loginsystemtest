import toast from 'react-hot-toast';

/**Validate username */
export async function usernameValidate(values){
    const error = usernameVerify({}, values);
    return error;
}

/**Validate Password */
export async function passwordValidate(values){
    const error = passwordVerify({}, values);
    return error;
}

/**Validate reset Password */
export async function resetPasswordValidate(values){
    
    const error = passwordVerify({}, values);

    if (values.password !== values.confirmpassword) {
        error.confirmpassword = toast.error('Passwords do not match');
    }
    return error;
}

/**Validate Email */
export async function emailValidate(values){

    const error = emailVerify({}, values);
    return error;
}

/**Validate Email */
function emailVerify(error = {}, values){
    if(!values.email){
        error.email= toast.error('Email is required');
    }
    else if(values.email.includes(' ')){
        error.email= toast.error('Invalid email');
    }
    return error;
}

/**Validate Password */
function passwordVerify(error = {}, values){

    /* eslint-disable */
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        error.password= toast.error('Password is required');
    }
    else if(values.password.includes(' ')){
        error.password= toast.error('Invalid password');
    }else if(values.password.length < 8){
        error.password= toast.error('Password must be at least 8 characters');
    }else if(!specialChars.test(values.password)){
        error.password= toast.error('Password must contain special characters');
    }
    return error;
}

/**Validate Username */
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username= toast.error('Username is required');
    }
    else if(values.username.includes(' ')){
        error.username= toast.error('Invalid username');
    }
    return error;
}
