import React from "react";
import { useNavigate } from "react-router-dom";

const domains = [
  { name: "Film", image: "film-image.jpg" },
  { name: "Music", image: "music-image.jpg" },
  { name: "Direction", image: "direction-image.jpg" },
  { name: "Singing", image: "singing-image.jpg" },
  { name: "Dancing", image: "dancing-image.jpg" },
];

function Dashboard() {
  const navigate = useNavigate();

  const handleDomainClick = (domainName) => {
    navigate(`/domain/${domainName}`);
  };

  return (
    <div className="dashboard">
      <h2>Select a Domain</h2>
      <div className="domains">
        {domains.map((domain) => (
          <div
            key={domain.name}
            className="domain"
            onClick={() => handleDomainClick(domain.name)}
          >
            <img
              src={domain.image}
              alt={domain.name}
              style={{ width: "200px", cursor: "pointer" }}
            />
            <p>{domain.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
