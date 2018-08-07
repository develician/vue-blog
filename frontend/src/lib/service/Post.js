import axios from "axios";

export default {
  getPost(id) {
    return axios.get(`/api/posts/${id}`);
  }
};
