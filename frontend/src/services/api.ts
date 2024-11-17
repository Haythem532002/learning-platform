import axios, { AxiosResponse } from "axios";
import axiosInstance from "./auth/axiosInstance";

async function post(url: string, data: any) {
  let payload = {
    data: {},
    ok: 0,
    message: "",
  };
  let response: any = null;
  await axiosInstance
    .post(url, data)
    .then((res: AxiosResponse) => {
      console.log(res);
      response = res;
      payload.message = res.data.message;
      payload.ok = res.data.ok;
    })
    .catch((e) => {
      console.log(e.message);
      payload.ok = -1;
    });

  return response;
}

async function get(url: string) {
  let payload = {
    data: {},
    ok: 0,
    message: "",
  };
  await axiosInstance
    .get(url)
    .then((res: AxiosResponse) => {
      if (res.data) {
        payload.data = res.data;
        payload.ok = 1;
      } else {
        console.log("no data");
      }
    })
    .catch((e) => {
      console.log(e.message);
      payload.ok = -1;
    });

  return payload;
}

export { get, post };
