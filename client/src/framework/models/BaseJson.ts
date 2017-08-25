

export default interface BaseJons<T>{
    code:number;
    message:T|T[];
    serverTime:string;
    des:string;
}