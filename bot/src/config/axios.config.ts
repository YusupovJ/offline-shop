import axios from "axios";
import envConfig from "./env.config";

const query = axios.create({
  baseURL: envConfig.API_BASE_URL,
});

export default query;
