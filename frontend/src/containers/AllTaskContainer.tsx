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

interface IFilter {
    search: string;
    date: Dayjs | null;
}

const AllTaskContainer = () => {
    const dispatch = useDispatch();

    // @ts-ignore
    const searchTextSelector = useSelector(state => state.filter.search);
    // @ts-ignore
    const dateSelector = useSelector(state => state.filter.date);

    const [uiFilter, setUiFilter] = useState<IFilter>({
        search: searchTextSelector,
        date: dateSelector
    });

    // @ts-ignore
    const isLoading = useSelector((state) => state.tasks.isLoading);
    // @ts-ignore
    const filteredTasksSelector: ITask[] = useSelector(state => state.tasks.filteredTasks);
    const [resultMessage, setResultMessage] = useState<string>("");

    const {getQueryParamByKey, setQueryParam, removeQueryParamByKey} = useQueryParams();

    const handleInputSearch = (inputSearch: string) => {
        setUiFilter((prevState) => ({...prevState, search: inputSearch}));
        dispatch(filterActions.updateSearchText({search: inputSearch}));
        // @ts-ignore
        dispatch(fetchFilteredTasks({search: inputSearch, ...uiFilter.date && {date: dayjs(uiFilter.date).toISOString()}}));
        if (inputSearch !== "") {
            setQueryParam(SEARCH_QUERY_PARAMETER, inputSearch);
        } else {
            removeQueryParamByKey(SEARCH_QUERY_PARAMETER);
        }
    }

    useEffect(() => {
        const searchQueryParam = getQueryParamByKey(SEARCH_QUERY_PARAMETER);
        if (searchQueryParam) {
            dispatch(filterActions.updateSearchText({search: searchQueryParam}));
            setUiFilter((prevState) => ({...prevState, search: searchQueryParam}));
        }

        const dateQueryParam = getQueryParamByKey(DATE_QUERY_PARAMETER);
        if (dateQueryParam) {
            dispatch(filterActions.updateDate({date: dateQueryParam}));
            setUiFilter((prevState) => ({...prevState, date: dayjs(dateQueryParam)}));
        }

        if (searchQueryParam || dateQueryParam) {
            // @ts-ignore
            dispatch(fetchFilteredTasks({search: searchQueryParam, date: dateQueryParam}));
        }
    }, []);


    useEffect(() => {
        if (searchTextSelector !== '') {
            setUiFilter(prevState => ({...prevState, search: searchTextSelector}));
        }
    }, [searchTextSelector]);

    useEffect(() => {
        setResultMessage(`Showing ${filteredTasksSelector.length} results`)
    }, [filteredTasksSelector]);

    useEffect(() => {
        // this is a workaround as BasicDatePicker is not triggering onDateChange()
        if (dateSelector) {
            setQueryParam(DATE_QUERY_PARAMETER, dateSelector);
        } else {
            removeQueryParamByKey(DATE_QUERY_PARAMETER);
        }
    }, [dateSelector]);


    const onDateChange = (date: Dayjs | null) => {
        if (date) {
            dispatch(filterActions.updateDate({date: date.toISOString()}));
            // @ts-ignore
            dispatch(fetchFilteredTasks({search: uiFilter.search, date: date.toISOString()}));
            setQueryParam(DATE_QUERY_PARAMETER, date.toISOString());
        } else {
            dispatch(filterActions.removeDate());
            // @ts-ignore
            dispatch(fetchFilteredTasks({search: uiFilter.search, date: null}));
            removeQueryParamByKey(DATE_QUERY_PARAMETER);
        }
    }

    return (
        <>
            <Stack my={3} direction="column" gap={2}>
                <SearchBar inputSearchText={uiFilter.search} handleSearch={handleInputSearch}/>
                <BasicDatePicker value={dayjs(dateSelector) ?? ""} onChange={(date) => onDateChange(date)}/>
            </Stack>
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