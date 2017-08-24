import { Md5 } from 'ts-md5/dist/md5';
// import { ParallelHasher } from 'ts-md5/dist/parallel_hasher';

// hash 一个文件
// export async function hashFile(path: string): Promise {
//     let hasher = new ParallelHasher(path);
//     return hasher.hash(fileBlob) as Promise<string>;;
// }
export function hash(hashStr: string): string {
    return Md5.hashStr(hashStr) as string;
}
export function hash_32(hashStr: string): string {
    return Md5.hashStr(hashStr, true) as string;
}
export function md5(hashStr: string): string {
    return Md5.hashStr(hashStr) as string;
}
export function hashAscii(hashStr: string): string {
    return Md5.hashAsciiStr(hashStr) as string;
}
export function hashAscii_32(hashStr: string): string {
    return Md5.hashAsciiStr(hashStr, true) as string;
}
