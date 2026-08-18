import React from "react";
import { REGION } from "../utils/constants";

const ContentHeader = () => {
  return (
    <div className="header">
      <h1 className="header-title mt-4 mb-3 font-24 fw-700">
        {REGION.headerTitle}
      </h1>
      <h5 className="header-description font-12">
        {REGION.headerDescription}{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={REGION.supportUrl}
        >
          our support team
        </a>{" "}
        and we will help you out.
      </h5>
    </div>
  );
};

export default ContentHeader;
