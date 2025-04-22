import { useState } from "react";
import { Command, CommandInput } from "../ui/command";

export const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  return (
    <div className="w-[44rem]">
      {!isFocused ? (
        <Command className="rounded-2xl focus:outline-none">
          <CommandInput
            placeholder="Type a command or search..."
            className="bg-white"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </Command>
      ) : (
        <Command className="rounded-2xl border-2 border-slate-900 focus:outline-solid">
          <CommandInput
            placeholder="Type a command or search..."
            className="bg-white text-slate-400 focus:outline-none"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onValueChange={setSearchText}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log(
                  "Enter was pressed and this is the text:",
                  searchText
                );
              }
            }}
          />
        </Command>
      )}
    </div>
  );
};
