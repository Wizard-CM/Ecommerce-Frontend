import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import { fetchResponseError } from "../Types/General";
import { cartFetchResponse, deleteFetchResponse, userFetchResponse } from "../Types/API-Types";
import { SerializedError } from "@reduxjs/toolkit";

export type resType =
  | {
      data: cartFetchResponse | userFetchResponse | deleteFetchResponse;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

const ToasterFunction = (res:resType,toastSuccessMessage:string) => {
  if ("data" in res) {
    toast.success(`${toastSuccessMessage}`);
  } else {
    const err = res.error as FetchBaseQueryError;
    const error = (err.data as fetchResponseError).message;
    toast.error(`${error}`);
  }
};

export default ToasterFunction;

