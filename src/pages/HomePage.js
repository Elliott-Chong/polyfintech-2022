import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import undraw_bitcoin from "../images/undraw_bitcoin.svg";

function HomePage() {
  const { loadUser } = useGlobalContext();
  React.useEffect(() => {
    loadUser();
  }, []);
  return (
    <main className="text-white py-16">
      <div className="px-28 flex gap-8">
        <div className="text-7xl font-bold">
          Focused on{" "}
          <span className="text-[#eeb902]">
            convenience, reliability & security
          </span>
          , your <span className="text-[#97cc04]">comprehensive portfolio</span>{" "}
          will advance your opportunities
          <div className="text-xl text-[#d0d0d0] font-normal mt-6">
            Portbonder is a one stop platform for collecting and verifying your
            certificates using web3 technologies.
            <br />
            <br /> For users: You will be able to keep a comprehensive portfolio
            of all your past certificates.
            <br />
            <br /> For recruiters: You will be able to verify all your
            applicants' certificates and track record.
          </div>
          <Link
            to="/profile"
            className="py-2 px-4 inline-block text-xl border-2 border-white transition hover:-translate-y-[3px]"
          >
            Get Started!
          </Link>
        </div>

        <img
          src={undraw_bitcoin}
          className="w-[600px] max-h-[600px] brand-img"
          alt="bitcoin iamge"
        />
      </div>
    </main>
  );
}

export default HomePage;
