const BASE_URL =
    import.meta.env.MODE === "development"
    ? "http://localhost:3001/api"
    : "/api";

export default BASE_URL;
