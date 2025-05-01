import axios from "axios";

const BASE_URL = `http://localhost:5000/api/`;


// ==========||   AUTHENTICATION APIS   ||========== //

// Function to CALL REGISTER
const register = async (email: string, password: string, phonenumber: number, address: string) => {
    try {
        const response = await axios.post(BASE_URL + 'users/register', {
            email: email,
            password: password,
            phonenumber: phonenumber,
            address: address
        });
        return response.data;
    } catch (err) {
        throw new Error('Lỗi: ', err as undefined);
    }
};

// Function to CALL LOGIN
const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(BASE_URL + 'users/login', {
            email: email,
            password: password
        });
        return response.data;
    } catch (err) {
        throw new Error('Lỗi: ', err as undefined);
    }
};