export default interface IBaseJons<T> {
    code: number;
    message: T;
    serverTime: string;
    des: string;
}