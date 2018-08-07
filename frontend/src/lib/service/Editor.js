import axios from "axios";

export default {
  writePost({ title, body, tags }) {
    return axios.post("/api/posts", { title, body, tags });
  },
  editPost({ id, title, body, tags }) {
    return axios.patch(`/api/posts/${id}`, { title, body, tags });
  }
};
