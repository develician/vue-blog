import axios from "axios";
import queryString from "query-string";

export default {
  getPostList({ tag, page }) {
    return axios.get(`/api/posts?${queryString.stringify({ tag, page })}`);
  }
};
