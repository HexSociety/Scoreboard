"use client";
import React from "react";
import { useIssues } from "../hooks/useIssues";

const IssueCard = () => {
  const { issues } = useIssues();

  return (
    <div>
      {issues.map((issue) => (
        <div key={issue.id}>{issue.title}
        </div>
      ))}
    </div>
  );
};

export default IssueCard;
