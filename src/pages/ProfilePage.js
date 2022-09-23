import React from "react";
import { useGlobalContext } from "../context";
import axios from "axios";
import CertCard from "../components/CertCard";
import avatar from "../images/avatar-round.png";

function ProfilePage() {
  const { state } = useGlobalContext();
  const { user, loading } = state;
  const [certs, setCerts] = React.useState([]);

  React.useEffect(() => {
    if (!user || loading) return;

    let fetchCerts;
    if (user.organisation) {
      fetchCerts = async () => {
        try {
          const response = await axios.get(
            `/api/certs/organisation/${user._id}`
          );
          setCerts(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    } else {
      fetchCerts = async () => {
        try {
          const response = await axios.get(`/api/certs/user/${user._id}`);
          setCerts(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    }
    fetchCerts();
  }, [user, loading]);

  if (!user?.organisation)
    return (
      <div className="px-28 py-12">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || avatar}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover"
            referrerPolicy="no-referrer"
          />
          <h1 className="text-3xl">{user?.name}</h1>
        </div>

        <section className="mt-10 grid-cols-3 gap-4 grid">
          {certs.map((cert) => {
            return <CertCard key={cert._id} cert={cert} />;
          })}
          {certs.length === 0 && (
            <>
              <h1>No certificates yet!</h1>
            </>
          )}
        </section>
      </div>
    );
  else {
    return (
      <div className="px-28 py-12">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || avatar}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover"
            referrerPolicy="no-referrer"
          />
          <h1 className="text-3xl">{user?.name} ( Organisation )</h1>
        </div>

        <h1 className="mt-10 text-2xl">Issued Certs</h1>
        <section className="mt-10 grid-cols-3 gap-4 grid">
          {certs.map((cert) => {
            return (
              <CertCard
                organisation={user?.organisation}
                key={cert._id}
                cert={cert}
              />
            );
          })}
          {certs.length === 0 && (
            <>
              <h1>No certificates yet!</h1>
            </>
          )}
        </section>
      </div>
    );
  }
}

export default ProfilePage;
