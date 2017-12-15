import Fuse = require('fuse.js');
import { FuseOptions } from 'fuse.js';
import { read } from 'fs';

class Searcher<T> {
    private fuseOption: FuseOptions = {
        caseSensitive: false,
        // include: ['matches', 'score'],
        shouldSort: true,
        tokenize: false,
        threshold: 0.6,
        location: 0,
        distance: 99,
        maxPatternLength: 32,
        keys: [''],
        // keys: ['name', 'author.firstName'],
    };
    private fuse: Fuse;

    constructor(private mList: T[], private keys: string[]) {
        this.reset(this.mList);
    }
    public reset(mList: T[]) {
        this.fuseOption.keys = this.keys;
        this.fuse = new Fuse(this.mList, this.fuseOption);
    }
    public search(input: string): T[] {
        let time = new Date().getMilliseconds();
        console.time('Search');
        let lists = this.fuse.search<T>(input).filter((item: T) => {
            if (item) {
                return true;
            }
            return false;
        });
        console.timeEnd('Search');
        return lists;
    }
}
export { Searcher };