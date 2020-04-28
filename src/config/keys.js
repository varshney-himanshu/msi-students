let api = "";

if (process.env.NODE_ENV === "production") {
  api = "";
} else {
  api = "http://localhost:5000";
}

export default api;
