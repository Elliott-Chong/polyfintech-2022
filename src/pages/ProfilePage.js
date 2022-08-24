import React from "react";
import { useGlobalContext } from "../context";
import axios from "axios";
import CertCard from "../components/CertCard";

function ProfilePage() {
  const { state } = useGlobalContext();
  const { user } = state;
  const [certs, setCerts] = React.useState([]);

  React.useEffect(() => {
    if (!user) return;
    const fetchCerts = async () => {
      try {
        const response = await axios.get(`/api/certs/user/${user._id}`);
        setCerts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCerts();
  }, [user]);
  return (
    <div className="px-28 py-12">
      <div className="flex items-center gap-4">
        <img
          src={user?.avatar}
          alt="profile"
          className="rounded-full"
          referrerPolicy="no-referrer"
        />
        <h1 className="text-3xl">{user?.name}</h1>
      </div>

      <section className="mt-10 grid-cols-3 gap-4 grid">
        {certs.map((cert) => {
          return <CertCard key={cert._id} cert={cert} />;
        })}
      </section>
    </div>
  );
}

export default ProfilePage;
