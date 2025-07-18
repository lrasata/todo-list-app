import TodoListContainer from "../containers/TodoListContainer.tsx";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner.tsx";
import SearchBar from "../components/SearchBar.tsx";
import { Stack } from "@mui/material";
import { filterActions } from "../redux-store/filter-slice.ts";
import { fetchFilteredTasks } from "../redux-store/tasks-slice.ts";
import {
  DATE_QUERY_PARAMETER,
  SEARCH_QUERY_PARAMETER,
} from "../constants/constants.ts";
import { ChangeEvent, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import BasicDatePicker from "../components/BasicDatePicker.tsx";
import dayjs, { Dayjs } from "dayjs";
import { ICategory, ITask } from "../types/types.ts";
import useQueryParams from "../hooks/useQueryParams";
import CategoryFilterContainer from "./CategoryFilterContainer.tsx";
import { fetchCategories } from "../redux-store/categories-slice.ts";
import { formatDate } from "../util/util.ts";
import { AppDispatch, RootState } from "../redux-store";

interface IFilter {
  search: string;
  date: Dayjs | null;
}

const AllTaskContainer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const searchTextSelector = useSelector(
    (state: RootState) => state.filter.search,
  );
  const dateSelector = useSelector((state: RootState) => state.filter.date);
  const categoriesSelector = useSelector(
    (state: RootState) => state.categories.categories,
  );

  const [uiFilter, setUiFilter] = useState<IFilter>({
    search: searchTextSelector,
    date: dateSelector,
  });
  const isLoading = useSelector((state: RootState) => state.tasks.isLoading);
  const filteredTasksSelector: ITask[] = useSelector(
    (state: RootState) => state.tasks.filteredTasks,
  );
  const [tasks, setTasks] = useState(filteredTasksSelector);
  const [resultMessage, setResultMessage] = useState<string>("");

  const { getQueryParamByKey, setQueryParam, removeQueryParamByKey } =
    useQueryParams();

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<
    ICategory[]
  >([]);

  useEffect(() => {
    dispatch(fetchCategories());

    const searchQueryParam = getQueryParamByKey(SEARCH_QUERY_PARAMETER);
    if (searchQueryParam) {
      dispatch(filterActions.updateSearchText({ search: searchQueryParam }));
      setUiFilter((prevState) => ({ ...prevState, search: searchQueryParam }));
    }

    const dateQueryParam = getQueryParamByKey(DATE_QUERY_PARAMETER);
    if (dateQueryParam) {
      dispatch(filterActions.updateDate({ date: dateQueryParam }));
      setUiFilter((prevState) => ({
        ...prevState,
        date: dayjs(dateQueryParam),
      }));
    }

    if (searchQueryParam || dateQueryParam) {
      dispatch(
        fetchFilteredTasks({ search: searchQueryParam, date: dateQueryParam }),
      );
    }
  }, []);

  useEffect(() => {
    if (searchTextSelector !== "") {
      setUiFilter((prevState) => ({
        ...prevState,
        search: searchTextSelector,
      }));
    }
  }, [searchTextSelector]);

  useEffect(() => {
    if (tasks.length === 1) {
      setResultMessage(`Showing 1 result`);
    } else {
      setResultMessage(`Showing ${tasks.length} results`);
    }
  }, [tasks]);

  useEffect(() => {
    setTasks(filteredTasksSelector);
    setSelectedCategoryFilter([]);
  }, [filteredTasksSelector]);

  useEffect(() => {
    if (selectedCategoryFilter.length !== 0) {
      const filterIds = selectedCategoryFilter.map((category) => category._id);
      setTasks(
        filteredTasksSelector.filter((task) => {
          if (task.category && task.category.categoryId) {
            return filterIds.includes(task.category?.categoryId);
          }
          return false;
        }),
      );
    } else {
      setTasks(filteredTasksSelector);
    }
  }, [selectedCategoryFilter]);

  useEffect(() => {
    // this is a workaround as BasicDatePicker is not triggering onDateChange()
    if (dateSelector) {
      setQueryParam(DATE_QUERY_PARAMETER, dateSelector);
    } else {
      removeQueryParamByKey(DATE_QUERY_PARAMETER);
    }
  }, [dateSelector]);

  const handleInputSearch = (inputSearch: string) => {
    setUiFilter((prevState) => ({ ...prevState, search: inputSearch }));
    dispatch(filterActions.updateSearchText({ search: inputSearch }));

    dispatch(
      fetchFilteredTasks({
        search: inputSearch,
        ...(uiFilter.date && { date: formatDate(uiFilter.date) }),
      }),
    );
    if (inputSearch !== "") {
      setQueryParam(SEARCH_QUERY_PARAMETER, inputSearch);
    } else {
      removeQueryParamByKey(SEARCH_QUERY_PARAMETER);
    }
  };

  const onDateChange = (date: Dayjs | null) => {
    if (date) {
      dispatch(filterActions.updateDate({ date: formatDate(date) }));
      dispatch(
        fetchFilteredTasks({ search: uiFilter.search, date: formatDate(date) }),
      );
      setQueryParam(DATE_QUERY_PARAMETER, formatDate(date));
      setUiFilter((prevState) => ({ ...prevState, date: date })); // Note that in IFilter this needs to be Dayjs
    } else {
      dispatch(filterActions.removeDate());
      dispatch(fetchFilteredTasks({ search: uiFilter.search, date: null }));
      setUiFilter((prevState) => ({ ...prevState, date: null }));
      removeQueryParamByKey(DATE_QUERY_PARAMETER);
    }
  };

  const handleCategoryFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const index = categoriesSelector.findIndex(
      (category: ICategory) => category.name === event.target.name,
    );
    if (event.target.checked) {
      setSelectedCategoryFilter((prevState) => [
        ...prevState,
        categoriesSelector[index],
      ]);
    } else {
      setSelectedCategoryFilter((prevState) => prevState.splice(index, 0));
    }
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        All your tasks
      </Typography>
      <Stack my={3} direction="column" gap={2}>
        <SearchBar
          inputSearchText={uiFilter.search}
          handleSearch={handleInputSearch}
        />
        <BasicDatePicker
          value={dayjs(dateSelector) ?? ""}
          onChange={(date) => onDateChange(date)}
        />
        <CategoryFilterContainer
          categories={categoriesSelector}
          selectedCategories={selectedCategoryFilter}
          handleCategoryFilterChange={handleCategoryFilterChange}
        />
      </Stack>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Typography variant="subtitle2" color="textSecondary">
            {resultMessage}
          </Typography>
          <TodoListContainer tasks={tasks} displayDate={true} />
        </>
      )}
    </>
  );
};

export default AllTaskContainer;
