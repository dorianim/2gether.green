export const BASE_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/v1"
    : "/api/v1";
