import React from "react";

function CertCard({ cert, organisation }) {
  const date_of_issue = new Date(cert.date_of_issue);
  console.log(cert);

  return (
    <div className="border-2 border-white p-6 space-y-4">
      <h1 className="text-3xl font-bold">{cert.title}</h1>
      <p>{cert.grade && <>Grade: {cert.grade}</>}</p>
      <p>{cert.description}</p>
      <div className="flex flex-col justify-between">
        <span>{date_of_issue.toLocaleDateString("en-US")}</span>
        {cert.issuer && (
          <span className="font-bold">Issued by: {cert?.issuer?.name}</span>
        )}
        {organisation && (
          <span className="font-bold">Issued to: {cert?.recipient?.name}</span>
        )}
      </div>
    </div>
  );
}

export default CertCard;
