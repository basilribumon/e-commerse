import api from "./api";

const authService = {
  register: async (userData) => {
    const response = await api.post(
      "/users",
      userData
    );

    return response.data;
  },

login: async (email, password) => {
  console.log(email);
  console.log(password);

  const response = await api.get(
    `/users?email=${email}&password=${password}`
  );

  console.log(response.data);

  return response.data[0];
},
};

export default authService;