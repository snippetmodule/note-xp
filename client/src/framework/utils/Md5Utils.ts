import { Md5 } from 'ts-md5/dist/md5';
// import { ParallelHasher } from 'ts-md5/dist/parallel_hasher';

// hash 一个文件
// export async function hashFile(path: string): Promise {
//     let hasher = new ParallelHasher(path);
//     return hasher.hash(fileBlob) as Promise<string>;;
// }
export function hash(hashStr: string): string | Int32Array {
    return Md5.hashStr(hashStr);
}
export function hash_32(hashStr: string): string | Int32Array {
    return Md5.hashStr(hashStr, true);
}
export function md5(hashStr: string): string | Int32Array {
    return Md5.hashStr(hashStr);
}
export function hashAscii(hashStr: string): string | Int32Array {
    return Md5.hashAsciiStr(hashStr);
}
export function hashAscii_32(hashStr: string): string | Int32Array {
    return Md5.hashAsciiStr(hashStr, true);
}