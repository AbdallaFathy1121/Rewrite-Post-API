export interface UserResponse {
    IsSuccess: boolean;
    Errors: [];
    Message: string;
    Data: {
        name: string;
        email: string;
        token: string;
        picture: string;
        roleId: number;
    }
}