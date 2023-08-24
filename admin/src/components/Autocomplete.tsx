import React from "react";

import { CUIAutoComplete } from "chakra-ui-autocomplete";

const countries = [
  { value: "ghana", label: "Ghana", id: "1" },
  { value: "nigeria", label: "Nigeria", id: "2" },
  { value: "kenya", label: "Kenya", id: "3" },
  { value: "southAfrica", label: "South Africa", id: "4" },
  { value: "unitedStates", label: "United States", id: "5" },
  { value: "canada", label: "Canada", id: "6" },
  { value: "germany", label: "Germany", id: "7" },
];

type TagTypes = {
  value: string;
  label: string;
  id: string;
};

export default function Autocomplete() {
  const [pickerItems, setPickerItems] = React.useState(countries);
  const [selectedItems, setSelectedItems] = React.useState<TagTypes[]>([]);

    const handleCreateItem = (item: TagTypes) => {
      setPickerItems((curr) => [...curr, item]);
      setSelectedItems((curr) => [...curr, item]);
    };

  const handleSelectedItemsChange = (selectedItems: TagTypes[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  return (
    <CUIAutoComplete
      hideToggleButton={true}
      disableCreateItem={true}
      listStyleProps={{position:'absolute', 'zIndex': '100', width: '100%'}}
      label=""
      placeholder="Type a Hashtags"
        onCreateItem={handleCreateItem}
      items={pickerItems}
      tagStyleProps={{
        rounded: "full",
        pt: 0,
        pb: 0,
        px: 0,
        fontSize: "1rem",
      }}
      selectedItems={selectedItems}
      onSelectedItemsChange={(changes) =>
        handleSelectedItemsChange(changes.selectedItems as TagTypes[])
      }
    ></CUIAutoComplete>
  );
}
