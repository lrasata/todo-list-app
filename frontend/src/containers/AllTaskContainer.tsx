import TodoListContainer from '../containers/TodoListContainer.tsx';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../components/Spinner.tsx";
import SearchBar from "../components/SearchBar.tsx";
import {Stack} from "@mui/material";
import {filterActions} from "../redux-store/filter-slice.ts";
import {fetchFilteredTasks} from "../redux-store/tasks-slice.ts";
import {DATE_QUERY_PARAMETER, SEARCH_QUERY_PARAMETER} from "../constants/constants.ts";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import BasicDatePicker from "../components/BasicDatePicker.tsx";
import dayjs, {Dayjs} from "dayjs";
import {ITask} from "../types/types.ts";
import useQueryParams from '../hooks/useQueryParams';


const AllTaskContainer = () => {
    const dispatch = useDispatch();

    // @ts-ignore
    const searchTextSelector = useSelector(state => state.filter.searchText);
    const [inputSearch, setInputSearch] = useState(searchTextSelector);
    // @ts-ignore
    const dateSelector = useSelector(state => state.filter.date);
    // @ts-ignore
    const isLoading = useSelector((state) => state.tasks.isLoading);
    // @ts-ignore
    const filteredTasksSelector: ITask[] = useSelector(state => state.tasks.filteredTasks);
    const [tasks, setTasks] = useState<ITask[]>([...filteredTasksSelector]);
    const resultMessage = `Showing ${tasks.length} results`;

    const { getQueryParamByKey, setQueryParam,removeQueryParamByKey } = useQueryParams();

    const handleSearch = (searchText: string) => {
        setInputSearch(searchText);
    }

    useEffect(() => {
        const searchQueryParam = getQueryParamByKey(SEARCH_QUERY_PARAMETER);
        if (searchQueryParam) {
            dispatch(filterActions.updateSearchText({ searchText: searchQueryParam }));
            setInputSearch(searchQueryParam);
        }

        const dateQueryParam = getQueryParamByKey(DATE_QUERY_PARAMETER);
        if (dateQueryParam) {
            dispatch(filterActions.updateDate({ date: dateQueryParam }));
        }

        if (searchQueryParam || dateQueryParam) {
            // @ts-ignore
            dispatch(fetchFilteredTasks({ search: searchQueryParam, filterDate: dateQueryParam }));
        }

    }, []);

    useEffect(() => {
        dispatch(filterActions.updateSearchText({ searchText: inputSearch }));
        let filter;
        if (inputSearch !== "") {
            setQueryParam(SEARCH_QUERY_PARAMETER, inputSearch);
            filter = {search: inputSearch}
        } else {
            removeQueryParamByKey(SEARCH_QUERY_PARAMETER);
        }

        if (dateSelector) {
            filter = {...filter, filterDate: dateSelector };
        }
        // @ts-ignore
        dispatch(fetchFilteredTasks(filter));

    }, [inputSearch]);

    useEffect(() => {
        if (searchTextSelector !== '') {
            setInputSearch(searchTextSelector)
        }
    }, [searchTextSelector]);

    useEffect(() => {
        if (dateSelector) {
            // @ts-ignore
            dispatch(fetchFilteredTasks({ search: searchTextSelector, filterDate: dateSelector}));
            setQueryParam(DATE_QUERY_PARAMETER, dateSelector);
        }
    }, [dateSelector]);

    useEffect(() => {
        setTasks([...filteredTasksSelector]);
    }, [filteredTasksSelector]);


    const onDateChange = (date: Dayjs | null) => {
        if (date) {
            dispatch(filterActions.updateDate({ date: date.toISOString() }));
            // @ts-ignore
            dispatch(fetchFilteredTasks({ search: inputSearch, filterDate: date.toISOString() }));
            setQueryParam(DATE_QUERY_PARAMETER, date.toISOString());
        } else {
            dispatch(filterActions.removeDate());
            // @ts-ignore
            dispatch(fetchFilteredTasks({ search: inputSearch, filterDate: null }));
            removeQueryParamByKey(DATE_QUERY_PARAMETER);
        }
    }

    return (
        <>
            <Stack my={3} direction="column" gap={2}>
                <SearchBar inputSearchText={inputSearch} handleSearch={handleSearch} />
                <BasicDatePicker value={dayjs(dateSelector)} onChange={(date) => onDateChange(date)} />
            </Stack>
            {
                isLoading ? <Spinner/> : (
                    <>
                        <Typography variant="subtitle2" color="textSecondary">{resultMessage}</Typography>
                        <TodoListContainer tasks={tasks} displayDate={true}/>
                    </>
                    )
            }
        </>

    );

}

export default AllTaskContainer;