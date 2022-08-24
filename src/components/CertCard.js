import React from "react";

function CertCard({ cert }) {
  const date_of_issue = new Date(cert.date_of_issue);

  return (
    <div className="border-2 border-white p-6 space-y-4">
      <h1 className="text-3xl font-bold">{cert.title}</h1>
      <p>{cert.description}</p>
      <div className="flex justify-between">
        <span>{date_of_issue.toLocaleDateString("en-US")}</span>
      </div>
    </div>
  );
}

export default CertCard;
