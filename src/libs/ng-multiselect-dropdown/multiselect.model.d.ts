export interface IDropdownSettings {
    singleSelection?: boolean;
    idField?: string;
    textField?: string;
    enableCheckAll?: boolean;
    selectAllText?: string;
    unSelectAllText?: string;
    allowSearchFilter?: boolean;
    clearSearchFilter?: boolean;
    maxHeight?: number;
    itemsShowLimit?: number;
    limitSelection?: number;
    searchPlaceholderText?: string;
    noDataAvailablePlaceholderText?: string;
    closeDropDownOnSelection?: boolean;
    showSelectedItemsAtTop?: boolean;
    classes?: string;
}
export declare class ListItem {
    id: String;
    text: String;
    constructor(source: any);
}
