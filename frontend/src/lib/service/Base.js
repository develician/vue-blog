import axios from "axios";

export default {
  login(password) {
    return axios.post(`/api/auth/login`, { password });
  },
  checkLogin() {
    return axios.get("/api/auth/check");
  },
  logout() {
    return axios.post("/api/auth/logout");
  },
  removePost(id) {
    return axios.delete(`/api/posts/${id}`);
  }
};
