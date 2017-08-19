

export default interface BaseJons<T>{
    code:number;
    message:T|T[];
    des:string;
}