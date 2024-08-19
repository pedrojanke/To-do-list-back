export class CreateTeamDto {
    name: string;
    user_id: number[];
    owner_id: number;
    created_at: Date;
}
