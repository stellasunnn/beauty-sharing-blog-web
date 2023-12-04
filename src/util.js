export const CATEGORIES = [
  { name: "skincare", color: "#e3a04f" },
  { name: "eyes", color: "#b8d38f" },
  { name: "face", color: "#e96d29" },
  { name: "lips", color: "#eab308" },
  { name: "brushes", color: "#ef5767" },
  { name: "fragrance", color: "#14b8a6" },
  { name: "nails", color: "#ff9b6a" },
  { name: "gift sets", color: "#d08a8a" },
];

export function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
