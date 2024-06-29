export const checkValidData = (email,password,name)=>{
    const isEmailValid= /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(email);
    const isPasswordValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if(!isEmailValid) return "Email ID is not valid";
    if(!isPasswordValid) return "Password is not valid ! Length of password should be >=8 with Lowercase ,Uppercase ,number and special character";
    return null;
};