import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import {
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Close, Search } from "@mui/icons-material";

interface SearchBarProps {
  inputSearchText: string;
  handleSearch: (searchText: string) => void;
}

const DEBOUNCE_TIME = 500;

const SearchBar = ({ inputSearchText, handleSearch }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearInput = () => {
    setInputValue("");
  };

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const handleOnClickSearch = () => {
    handleSearch(inputValue);
  };

  const handleOnKeyDown = (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter") {
      handleSearch(inputValue);
    }
  };

  useEffect(() => {
    setInputValue(inputSearchText);
  }, [inputSearchText]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, DEBOUNCE_TIME);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  useEffect(() => {
    handleSearch(debouncedInputValue);
  }, [debouncedInputValue]);

  return (
    <OutlinedInput
      value={inputValue}
      fullWidth
      onChange={handleInputChange}
      endAdornment={
        <InputAdornment position="end">
          {inputValue !== "" && (
            <IconButton onClick={handleClearInput}>
              <Close />
            </IconButton>
          )}
          <IconButton onClick={handleOnClickSearch}>
            <Search />
          </IconButton>
        </InputAdornment>
      }
      placeholder="Enter a text to start searching..."
      ref={inputRef}
      autoFocus={false}
      onKeyDown={(event) => handleOnKeyDown(event)}
      sx={{ backgroundColor: "white" }}
    />
  );
};

export default SearchBar;
