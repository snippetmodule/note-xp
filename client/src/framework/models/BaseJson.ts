

export default interface BaseJons<T>{
    code:number;
    message:T;
    serverTime:string;
    des:string;
}