import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  //   CommandGroup,
  //   CommandItem,
} from "@/components/ui/command";
import { useState } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <Command className="w-full sm:max-w-[550px] border rounded-full font-roboto">
      <CommandInput
        value={searchTerm}
        onValueChange={setSearchTerm}
        placeholder="Type a command or search..."
        className=""
      />
      {}
      {/* <CommandList>
        {searchTerm && searchResults.length == 0 && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}

        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList> */}
    </Command>
  );
}

export default SearchBar;
