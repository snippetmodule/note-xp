
 export default interface IBaseJson<T> {
    code: number;
    message: T;
    serverTime: string;
    des: string;
}