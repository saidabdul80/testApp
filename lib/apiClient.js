'use client';
import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'
import axios from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com'; // Replace with your API's base URL

const apiClient = {
  fetchData:async (endpoint,method='GET', data = {}) => {
    const generalLoader = document.querySelector('#generalLoader');
    let url = endpoint.startsWith('http') ? endpoint : `${baseURL}${endpoint}`;
    generalLoader.style.display ='block'
    const fetchConfig = { method, url };    
    if (data) {
      fetchConfig.data = data;
    }

    return axios(fetchConfig)
      .then((response) => {
        generalLoader.style.display ='none'
        return response
      })
      .catch((error) => {
        generalLoader.style.display ='none'
        let text = "Something went wrong"
        if(error.code == "ERR_NETWORK"){
          text = "No internet connection"
        }
        Toastify({
          text:'x '+ text,          
          style: {
            background: "#cc4444",
          }
        }).showToast();
        console.log(error);
      });
  },
};

export default apiClient;
