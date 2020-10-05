export class Todo {
    id: number;
    parent_id: number;
    name: string;
    description: string;
    subTodoList: Todo[] = [];
    isFavourite: string = '';
}
