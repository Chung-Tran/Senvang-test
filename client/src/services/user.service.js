import axiosClient from "../config/axios";

export const login = async (values) => {
    const { data } = await axiosClient.post("/auth/login", values);
    return data;
};

export const fetchUsers = async ({ queryKey }) => {
    const [_key, { page = 1, pageSize = 10, ...filters } = {}] = queryKey;
    const params = { page, pageSize, ...filters };
    const { data } = await axiosClient.get("/users", { params });
    return data;
};

export const createUser = async (values) => {
    const { data } = await axiosClient.post("/users", values);
    return data;
};

export const updateUser = async ({ id, values }) => {
    console.log(values)
    const { data } = await axiosClient.put(`/users/${id}`, values);
    return data;
};

export const deleteUser = async (id) => {
    const { data } = await axiosClient.delete(`/users/${id}`);
    return data;
};