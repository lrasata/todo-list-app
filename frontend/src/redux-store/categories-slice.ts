import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_CATEGORIES_ENDPOINT} from "../constants/constants.ts";
import axios from "axios";
import {ICategory} from "../types/types.ts";

const initialCategoryState = {
    categories: []
}

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<ICategory[]>(API_CATEGORIES_ENDPOINT, { withCredentials: true});
            return {
                categories: response.data
            }
        } catch (error) {
            console.error("Error getting categories:", error);
            return rejectWithValue('Oops unable to fetch categories from API');

        }
    }
);

export const createCategory = createAsyncThunk(
    'categories/createCategory',
    async (arg: {name: string, colour?: string}, { rejectWithValue }) => {
        try {
            const response = await axios.post<ICategory>(
                API_CATEGORIES_ENDPOINT,
                { name: arg.name, colour: arg.colour ? arg.colour : undefined },
                {headers: {"Content-Type": "application/json"}, withCredentials: true}
            );
            return {
                category: response.data
            }
        } catch (error) {
            console.error("Error getting categories:", error);
            return rejectWithValue('Oops unable to fetch categories from API');

        }
    }
);



const categorySlice = createSlice({
    name: 'categories',
    initialState: initialCategoryState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            // @ts-ignore
            state.categories = action.payload.categories;
        })
        builder.addCase(createCategory.fulfilled, (state, action) => {
            // @ts-ignore
            state.categories = [...state.categories, action.payload.category];
        })

    }
});

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;