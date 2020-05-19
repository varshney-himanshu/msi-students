let api = "";

if (process.env.NODE_ENV === "production") {
  api = "https://backend-eta-eight.now.sh";
} else {
  api = "http://localhost:5000";
}

export default api;
