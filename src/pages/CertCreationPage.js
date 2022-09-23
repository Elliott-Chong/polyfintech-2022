import React from "react";
import { useGlobalContext } from "../context";

function CertCreationPage() {
  const {
    state: { user, loading },
    createCert,
  } = useGlobalContext();
  React.useEffect(() => {
    if (!loading && user && !user.organisation) {
      window.location.href = "/profile";
    }
  }, [loading, user]);

  const [formData, setFormData] = React.useState({
    recipient: "",
    title: "",
    description: "",
    grade: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createCert(formData);
  };

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <form className="flex flex-col gap-4 my-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="recipient"
            id=""
            placeholder="recipient email"
            className="form-input"
            onChange={handleChange}
          />
          <input
            type="text"
            name="title"
            id=""
            placeholder="title"
            className="form-input"
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            id=""
            placeholder="description"
            className="form-input"
            onChange={handleChange}
          />
          <input
            type="text"
            name="grade"
            id=""
            placeholder="grade"
            className="form-input"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="font-bold border-2 border-white px-4 py-1 transition hover:-translate-y-[3px] self-start"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default CertCreationPage;
