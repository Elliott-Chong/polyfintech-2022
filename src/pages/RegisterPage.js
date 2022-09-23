import React from "react";
import { useGlobalContext } from "../context";

function RegisterPage() {
  const { registerUser } = useGlobalContext();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    confirmpassword: "",
    name: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <form
          className="flex flex-col gap-4 my-4"
          onSubmit={(e) => {
            e.preventDefault();
            registerUser(
              formData.email,
              formData.password,
              formData.confirmpassword,
              formData.name
            );
          }}
        >
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className="form-input"
            type="text"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <input
            className="form-input"
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            required
            value={formData.confirmpassword}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="font-bold border-2 border-white px-4 py-1 transition hover:-translate-y-[3px] self-start"
          >
            Register
          </button>
        </form>
      </div>
    </main>
  );
}

export default RegisterPage;
