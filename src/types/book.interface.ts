export interface BookRequest {
    name: string;
    email: string;
    country_id: string;
    phone: string;
    upload_ktp: string;
    surfing_experience: number;
    visit_date: string;
    desired_board: string;
}

export interface BookResponse {
    id: number;
    name: string;
    email: string;
    country: {
        id: number;
        name: string;
        flag: string;
        created_at: string;
        updated_at: string;
    };
    phone: string;
    upload_ktp: string;
    surfing_experience: number;
    visit_date: string;
    desired_board: string;
    created_at: string;
    updated_at: string;
}

export interface BookState {
    payload: BookRequest;
    success: BookResponse;
    error: any;
    loading: boolean;
}

export const initialBook: BookState = {
    loading: false
} as BookState;