import "@pnp/sp/profiles";
import { FunctionComponent } from "react";
import { IPersonaProps } from "@fluentui/react/lib/Persona";
export interface Person {
    Id: string;
    Title: string;
    EMail: string;
}
export interface CustomPersona extends IPersonaProps, Person {
}
interface IPeoplePickerProps {
    /** Required - The text used to label this people picker for screenreaders */
    ariaLabel: string;
    readOnly?: boolean;
    required?: boolean;
    /** Optional - Limit the People Picker to only allow selection of specific number -- Defaults to 1 */
    itemLimit?: number;
    updatePeople: (p: Person[]) => void;
    selectedItems: Person[] | Person;
}
export declare const PeoplePicker: FunctionComponent<IPeoplePickerProps>;
export {};
