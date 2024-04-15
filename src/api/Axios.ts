import axios from 'axios';

export const Api = axios.create({
  baseURL: 'https://batalia3.1ft4vjov9vox.us-south.codeengine.appdomain.cloud'
});

export default Api;