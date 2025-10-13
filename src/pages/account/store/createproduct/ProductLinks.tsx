import ComboBox, { type SelectOption } from "@/components/ComboBox";
import type { FormSection } from "./ProductForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useStoreState from "@/stores/useStoreState";
import formatComboBoxItem from "@/utils/formatComboBoxItem";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { LinkType } from "./CreateProduct";

function ProductLinks({ form, isPending }: FormSection) {
  const { store } = useStoreState();
  const [selectedAccount, setSelectedAccount] = useState<SelectOption>(
    {} as SelectOption
  );
  const [productLink, setProductLink] = useState("");
  const watchedProductLinks = form.watch("links");

  useEffect(() => {
    if (!selectedAccount?.id) {
      setProductLink("");
      return;
    }

    if (!Array.isArray(watchedProductLinks)) return;

    const existing = watchedProductLinks.find(
      (link) =>
        link.platform === selectedAccount.id || link._id === selectedAccount.id
    );

    setProductLink(existing?.url || "");
  }, [selectedAccount?.id, watchedProductLinks]);

  const selectAccount = (option: SelectOption) => {
    setSelectedAccount(option);
  };

  const addProductLink = () => {
    const trimmedUrl = productLink.trim();
    if (!trimmedUrl || !selectedAccount?.id) return;

    const currentLinks = form.getValues("links") || [];

    // Check if link for this platform already exists (and not deleted)
    const existingIndex = currentLinks.findIndex(
      (link: LinkType) =>
        link.platform === selectedAccount.id && !link.isDeleted
    );

    let updatedLinks;

    if (existingIndex !== -1) {
      // Update existing link's URL
      updatedLinks = [...currentLinks];
      updatedLinks[existingIndex] = {
        ...updatedLinks[existingIndex],
        url: trimmedUrl,
        isDeleted: false,
      };
    } else {
      // Add new link
      updatedLinks = [
        ...currentLinks,
        {
          platform: selectedAccount.id,
          url: trimmedUrl,
          isDeleted: false,
          platformName: selectedAccount.label,
        } as LinkType,
      ];
    }

    form.setValue("links", updatedLinks);
    form.trigger("links");

    // Reset UI state
    setProductLink("");
    setSelectedAccount({} as SelectOption);
  };

  const editProductLink = (platform: string, value: string) => {
    const updatedProductLinks = form
      .getValues("links")
      ?.map((link: LinkType) => {
        return link.platform === platform ? { ...link, url: value } : link;
      });

    form.setValue("links", updatedProductLinks);
  };

  const removeProductLink = (platform: string) => {
    const currentLinks = form.getValues("links") || [];

    const updatedProductLinks = currentLinks
      .map((link: LinkType) => {
        // If it's a persisted link (has _id), just mark it deleted
        if (link.platform === platform && link._id) {
          return { ...link, isDeleted: true };
        }
        return link;
      })
      // Filter out any *new* (client-side only) links that match the platform
      .filter((link: LinkType) => {
        if (!link._id && link.platform === platform) return false;
        return true;
      });

    form.setValue("links", updatedProductLinks);
  };

  return (
    <FormField
      control={form.control}
      name="links"
      render={() => (
        <FormItem>
          <FormLabel>Product Link</FormLabel>
          <FormControl>
            <div className="grid gap-7">
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="md:min-w-[200px]">
                  <ComboBox
                    items={formatComboBoxItem(
                      store?.linkedAccounts || [],
                      "platform",
                      "platformName"
                    )}
                    term="type"
                    selectItem={selectAccount}
                    enableSearch={false}
                    selectionType="pair"
                    value={selectedAccount.id}
                    disabled={isPending}
                  />
                </div>

                <div className="flex items-center gap-2 md:items-stretch">
                  <Input
                    className="flex-1 py-[5.5px] md:h-full min-w-[300px]"
                    value={productLink}
                    onChange={(e) => setProductLink(e.target.value)}
                    placeholder="Product link"
                  />
                  <Button
                    className="h-full"
                    type="button"
                    onClick={addProductLink}
                    disabled={!productLink || !selectedAccount}
                  >
                    Add Link
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                {watchedProductLinks
                  ?.filter((link) => !link.isDeleted)
                  .map((link: LinkType) => (
                    <div
                      key={`${link.platform}-${link?._id}`}
                      className="flex items-stretch gap-3"
                    >
                      <span className="text-slate-500 font-medium my-auto sm:min-w-[90px]">
                        {link.platformName}
                      </span>

                      <div className="h-full flex-1 md:max-w-[500px] flex">
                        <Input
                          value={link.url}
                          onChange={(e) =>
                            editProductLink(link.platform!, e.target.value)
                          }
                          className="h-full"
                        />
                      </div>

                      <Button
                        type="button"
                        className="mr-auto py-4"
                        variant={"destructive"}
                        onClick={() => removeProductLink(link.platform!)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default ProductLinks;
