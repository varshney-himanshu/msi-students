let api = "";

if (process.env.NODE_ENV === "production") {
  api = "https://backend.varshney-himanshu.vercel.app";
} else {
  api = "https://backend.varshney-himanshu.vercel.app";
}

export default api;
