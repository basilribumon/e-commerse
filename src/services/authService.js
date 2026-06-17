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
  console.log("Email:", email);
  console.log("Password:", password);

  const response = await api.get("/users");

  console.log("All Users:", response.data);

  const user = response.data.find(
    (u) =>
      u.email.trim() === email.trim() &&
      u.password.trim() === password.trim()
  );

  console.log("Matched User:", user);

  if (!user) {
    throw new Error("Invalid Email or Password");
  }

  return user;
},
};

export default authService;