// src/components/ActionCard.jsx
import React from "react";
import { ArrowRightCircle } from "lucide-react";

const ActionCard = ({ icon: Icon, title, description, color, onClick }) => {
  return (
    <div className={`action-card ${color}`} onClick={onClick}>
      <div className="icon-wrapper">
        <Icon size={28} />
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <div className="divider"></div>

      <div className="arrow-icon">
        <ArrowRightCircle size={22} />
      </div>
    </div>
  );
};

export default ActionCard;
