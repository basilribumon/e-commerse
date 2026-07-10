import api from "./api";

const loginAdmin = async (credentials) => {
  const response = await api.get("/admins");

  const admin = response.data.find(
    (a) => a.email === credentials.email && a.password === credentials.password,
  );

  if (!admin) {
    throw new Error("Invalid Admin Email or Password");
  }

  return admin;
};

export default { loginAdmin };
