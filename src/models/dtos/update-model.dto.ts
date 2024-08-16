export class UpdateModelDto {
    name: string;
    project_id: number;
    item_id?: number[];
    updated_at: Date;
}