export interface Loop {
    key?:string;
    userID:string;
    name:string;
    description:string;
    category?:string;
    data:any[];
    tempo:number;
    volume:number;
    measures:number;
}