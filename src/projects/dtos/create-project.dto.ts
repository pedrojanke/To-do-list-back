export class CreateProjectDto {
    name: string;
    description?: string;
    team_id?: number[];
    model_id?: number[];
    created_at: Date;
}