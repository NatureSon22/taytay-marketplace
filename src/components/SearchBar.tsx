import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { getProductSuggestions } from "@/api/products";

export type Item = {
  label: string;
  value: string;
};

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["search-products", debouncedSearch],
    queryFn: () => getProductSuggestions(searchTerm),
    enabled: !!debouncedSearch.trim(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() && products.length > 0) {
      navigate(`/products?search=${encodeURIComponent(products[0].value)}`);
      setSearchTerm("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full sm:max-w-[550px]">
      <Command className="w-full border rounded-full font-roboto">
        <CommandInput
          value={searchTerm}
          onValueChange={setSearchTerm}
          placeholder="Search products..."
          onKeyDown={handleKeyDown}
        />

        {searchTerm && (
          <CommandList className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-50">
            {isLoading && <CommandEmpty>Loading...</CommandEmpty>}
            {!isLoading && products.length === 0 && (
              <CommandEmpty>No products found.</CommandEmpty>
            )}
            {products.length > 0 && (
              <CommandGroup heading="Suggestions">
                {products.map((product: Item) => (
                  <CommandItem
                    key={product.value}
                    onSelect={() => navigate(`/products/${product.value}`)}
                  >
                    {product.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
    </form>
  );
}

export default SearchBar;
