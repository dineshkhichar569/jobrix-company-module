//! Get initials from a name (Dinesh Khichar → DK)
export const getAvatarInitials = (name = "") => {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
};

//! Give the avatar a color based on the name
export const getAvatarColor = (name = "") => {
  const palette = [
    "bg-rose-100 text-rose-700",
    "bg-amber-100 text-amber-700",
    "bg-indigo-100 text-indigo-700",
    "bg-green-100 text-green-700",
    "bg-blue-100 text-blue-700",
    "bg-violet-100 text-violet-700",
  ];
  const sum = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return palette[sum % palette.length];
};

//! for different status different colors
export const getStatusColor = (status) => {
  switch (status) {
    case "Applied":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "Screening":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "Shortlisted":
      return "bg-indigo-100 text-indigo-700 border-indigo-200";
    case "Interview Scheduled":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "Selected":
      return "bg-green-100 text-green-700 border-green-200";
    case "Rejected":
      return "bg-red-100 text-red-700 border-red-200";
    case "On Hold":
      return "bg-orange-100 text-orange-700 border-orange-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};
