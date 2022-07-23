import { PersonaDtoExtends } from "app/model/personaDtoExtends";

export interface ProfileDto {
    id?: number;
    persona?: PersonaDtoExtends;
    username?: string;
}
