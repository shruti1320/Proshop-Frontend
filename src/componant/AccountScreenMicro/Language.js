// import React from "react";
// import "./Language.scss";

// export default function Language() {
//   return (
//     <div>
//       <p className="fs-1 fw-bold">Try Proshop in your language</p>
//       <div className="linkstyle">
//       <a href="#">English</a>
//       <a href="#">Gujarati</a>
//       <a href="#">Hindi</a>
//       <a href="#">Marathi</a>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import "./Language.scss";

export default function Language() {
  const languages = [
    "English",
    "Gujarati",
    "Hindi",
    "Marathi",
    "Spanish",
    "French",
    "Dutch",
    "German",
  ];
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  const toggleLanguages = () => {
    setShowAllLanguages(!showAllLanguages);
  };

  return (
    <div>
      <p className="fs-1 fw-bold">Try Proshop in your language</p>
      <div className="linkstyle">
        {showAllLanguages
          ? languages.map((language, index) => (
              <a key={index} href="#">
                {language}
              </a>
            ))
          : languages.slice(0, 4).map((language, index) => (
              <a key={index} href="#">
                {language}
              </a>
            ))}
        {languages.length > 4 && (
          <a href="#" onClick={toggleLanguages}>
            {showAllLanguages ? `Show less` : `+${languages.length - 4} more`}
          </a>
        )}
      </div>
    </div>
  );
}
