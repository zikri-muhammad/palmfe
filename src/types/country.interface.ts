export interface Country {
    id: number;
    name: string;
    flag: string;
}

export interface CountryState {
    source: Country[];
    loading: boolean;
    error?: string;
}

export const initialCountry: CountryState = {
    source: [],
    loading: false,
}