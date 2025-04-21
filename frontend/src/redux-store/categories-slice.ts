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
            console.error("Error creating categories:", error);
            return rejectWithValue('Oops unable to create category');

        }
    }
);

export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async (arg: {_id: string, name: string, colour?: string}, { rejectWithValue }) => {
        try {
            const response = await axios.put<ICategory>(
                `${API_CATEGORIES_ENDPOINT}/${arg._id}`,
                { name: arg.name, colour: arg.colour ? arg.colour : undefined },
                {headers: {"Content-Type": "application/json"}, withCredentials: true}
            );
            return {
                category: response.data
            }
        } catch (error) {
            console.error("Error updating categories:", error);
            return rejectWithValue('Oops unable to update category');

        }
    }
);

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (arg: {_id: string}, { rejectWithValue }) => {
        try {
            await axios.delete<ICategory>(
                `${API_CATEGORIES_ENDPOINT}/${arg._id}`,
                {headers: {"Content-Type": "application/json"}, withCredentials: true}
            );
            return {
                _id: arg._id
            }
        } catch (error) {
            console.error("Error deleting categories:", error);
            return rejectWithValue('Oops unable to delete category');

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
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            const updatedCategory = action.payload.category;
            const index = state.categories.findIndex( (element: ICategory) => element._id === updatedCategory._id)

            if (index >= 0) {
                // @ts-ignore
                state.categories[index] = updatedCategory;
            }
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter((c: ICategory) => c._id !== action.payload._id);
        })

    }
});

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;