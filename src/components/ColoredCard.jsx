import React from "react";

const colorVariants = {
  success: {
    border: "border-green-400",
    bg: "bg-green-50",
    text: "text-green-700",
    link: "text-green-600 hover:text-green-800",
    button:
      "border border-green-500 text-green-700 hover:bg-green-600 hover:text-white",
  },
  warning: {
    border: "border-yellow-400",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    link: "text-yellow-600 hover:text-yellow-800",
    button:
      "border border-yellow-500 text-yellow-700 hover:bg-yellow-500 hover:text-white",
  },
  info: {
    border: "border-blue-400",
    bg: "bg-blue-50",
    text: "text-blue-700",
    link: "text-blue-600 hover:text-blue-800",
    button:
      "border border-blue-500 text-blue-700 hover:bg-blue-600 hover:text-white",
  },
};

const ColoredCard = ({ variant = "success", title, text, link }) => {
  const styles = colorVariants[variant] || colorVariants.success;

  return (
    <div
      className={`w-full sm:w-[90%] md:w-[80%] mx-auto my-4 rounded-md border ${styles.border} ${styles.bg} p-6 shadow-sm`}
    >
      <p className={`mb-4 ${styles.text}`}>
        {text}{" "}
        {link && (
          <a href={link.url} className={`${styles.link} underline`}>
            {link.text}
          </a>
        )}
      </p>
      <button
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${styles.button}`}
      >
        Read more
      </button>
    </div>
  );
};

export default ColoredCard;
