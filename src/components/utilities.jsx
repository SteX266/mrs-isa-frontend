import axios from "axios";

export function useGet(path, data) {
  const token = JSON.parse(localStorage.getItem("userToken"));
  const url = "http://localhost:8080/" + path;
  const requestOptions = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: "Bearer " + token.accessToken,
    },
    params: data,
  };
  axios
    .get(url, requestOptions)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return {};
    });
}
export function useFetch(path, data) {
  const token = JSON.parse(localStorage.getItem("userToken"));
  const url = "http://localhost:8080/" + path;
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: "Bearer " + token.accessToken,
    },
    body: JSON.stringify(data),
  };
  fetch(url, requestOptions)
    .then(async (response) => {
      const data = await response.json();
      return data;
    })
    .catch((error) => {
      console.log(error);
      return {};
    });
}

export function usePost(path, data) {
  const token = JSON.parse(localStorage.getItem("userToken"));
  console.log(token);
  const url = "http://localhost:8080/" + path;
  const requestOptions = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: "Bearer " + token.accessToken,
    },
    data: data,
  };
  axios
    .post(url, requestOptions)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return {};
    });
}

export function useDelete(path, data) {
  const token = JSON.parse(localStorage.getItem("userToken"));
  const url = "http://localhost:8080/" + path;
  const requestOptions = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: "Bearer " + token.accessToken,
    },
    data: data,
  };
  axios
    .delete(url, requestOptions)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return {};
    });
}
