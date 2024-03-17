import { createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE_BOOK_DATA, FETCH_BOOKS_DATA, GET_BOOK_DATA_BY_ID, POST_ADD_BOOK_DATA, PUT_UPDATE_BOOK_DATA } from "../constants";
import { MASTER_URL, headers } from "../../apiService";
import axios from "axios";

//get
export const fetchBooksData = createAsyncThunk(
  FETCH_BOOKS_DATA,
  async () => {
    try {
      const response = await axios.get(`${MASTER_URL}/getbooks`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

//get-id
export const getBookDataByID = createAsyncThunk(
  GET_BOOK_DATA_BY_ID,
  async (id) => {
    try {
      const response = await axios.get(`${MASTER_URL}/getbooks/${id}`);
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        throw new Error(error.response.data.message)
      }
      throw new Error(error.message)
    }
  }
);

//post
export const addBookData = createAsyncThunk(POST_ADD_BOOK_DATA, async (bookdata) => {
  try {
    const response = await axios.post(`${MASTER_URL}/addbook/`, bookdata, {
      headers
    });
    return response.data.message;
  } catch (error) {
    return error.message
  }
})

//delete
export const deleteBookData = createAsyncThunk(DELETE_BOOK_DATA, async (id) => {
  try {
    const response = await axios.delete(`${MASTER_URL}/removebook/${id}`);
    console.log(response.data.message);
    return response.data.message;
  } catch (error) {
    throw new Error(error.message);
  }
})

//put
export const putBookData = createAsyncThunk(PUT_UPDATE_BOOK_DATA, async ({ id, formData }) => {
  try {
    const response = await axios.put(`${MASTER_URL}/updatebook/${id}`, formData, {
      headers
    });
    return response.data
  } catch (error) {
    throw new Error(error.message);
  }
})
