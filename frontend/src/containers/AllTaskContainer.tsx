import TodoListContainer from '../containers/TodoListContainer.tsx';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../components/Spinner.tsx";
import SearchBar from "../components/SearchBar.tsx";
import {Box} from "@mui/material";
import {filterActions} from "../redux-store/filter-slice.ts";
import {fetchFilteredTasks} from "../redux-store/tasks-slice.ts";
import { useSearchParams } from 'react-router-dom';
import {SEARCH_QUERY_PARAMETER} from "../constants/constants.ts";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";

const AllTaskContainer = () => {
    const dispatch = useDispatch();

    // @ts-ignore
    const searchTextSelector = useSelector(state => state.filter.searchText);
    const [inputSearch, setInputSearch] = useState(searchTextSelector);
    // @ts-ignore
    const isLoading = useSelector((state) => state.tasks.isLoading);
    // @ts-ignore
    const filteredTasksSelector = useSelector(state => state.tasks.filteredTasks);
    const resultMessage = `Showing ${filteredTasksSelector.length} results`;

    const [currentQueryParameters, setSearchParams] = useSearchParams();
    const newQueryParameters : URLSearchParams = new URLSearchParams();

    const handleSearch = (searchText: string) => {
        setInputSearch(searchText);
    }

    useEffect(() => {
        const searchQueryParam = currentQueryParameters.get(SEARCH_QUERY_PARAMETER);
        if (searchQueryParam) {
            dispatch(filterActions.updateSearchText({ searchText: searchQueryParam }));
            // @ts-ignore
            dispatch(fetchFilteredTasks({ search: searchQueryParam }));
            setInputSearch(searchQueryParam);
        }
    }, []);

    useEffect(() => {
        dispatch(filterActions.updateSearchText({ searchText: inputSearch }));
        // @ts-ignore
        dispatch(fetchFilteredTasks({ search: inputSearch }));

        if (inputSearch !== "") {
            newQueryParameters.set(SEARCH_QUERY_PARAMETER,  inputSearch);
        } else {
            newQueryParameters.delete(SEARCH_QUERY_PARAMETER);
        }
        setSearchParams(newQueryParameters);
    }, [inputSearch]);

    useEffect(() => {
        if (searchTextSelector !== '') {
            setInputSearch(searchTextSelector)
        }
    }, [searchTextSelector]);

    return (
        <>
            <Box my={3}>
                <SearchBar inputSearchText={inputSearch} handleSearch={handleSearch} />
            </Box>
            {
                isLoading ? <Spinner/> : (
                    <>
                        <Typography variant="subtitle2" color="textSecondary">{resultMessage}</Typography>
                        <TodoListContainer tasks={filteredTasksSelector} displayDate={true}/>
                    </>
                    )
            }
        </>

    );

}

export default AllTaskContainer;