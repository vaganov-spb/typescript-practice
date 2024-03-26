const objHash = require("object-hash")
const equal = require('deep-equal');
import { NotUndefined } from '@types/object-hash';


// coomented data is for debugging

class NodeItem {
    public key: NotUndefined;
    public value: unknown;
    public next: NodeItem | null = null;

    constructor(key: NotUndefined, value: unknown) {
        this.key = key;
        this.value = value;
    }
}

class LinkedList {
    private root: NodeItem | null = null

    constructor(key?: NotUndefined, value?: unknown) {
        if (key && value) {
            this.root = new NodeItem(key, value)
        }
    }

    set(key: NotUndefined, value: unknown): void {
        if (this.root) {
            let root = this.root;
            while (root.next !== null) {
                if (equal(root.key, key)) {
                    root.value = value;
                    return;
                }

                root = root.next;
            }
            root.next = new NodeItem(key, value)
        } else {
            const node = new NodeItem(key, value)
            this.root = node
        }
    }

    get(key: NotUndefined): unknown | undefined {
        let root = this.root;

        while (root) {
            if (equal(root.key, key)) {
                return root.value
            }
            root = root.next;
        }
        return undefined
    }

    delete(key: NotUndefined): void {
        let root = this.root;

        if (!root) { return; }

        if (root.key === key) {
            this.root = root.next
        }

        let prev = root
        root = root.next

        while (root) {
            if (equal(root.key, key)) {
                prev.next = root.next
                return;
            }
            prev = root
            root = root.next
        }
    }

    isRootNullable(): boolean {
        return this.root == null;
    }

    // print(): void {
    //     let root = this.root
    //     while (root) {
    //         console.log(root.value)
    //         root = root.next;
    //     }
    // }
}

interface IHashMap {
    [key: string]: LinkedList
}

class HashMap {
    private data: IHashMap = {};

    calcHash(key: NotUndefined): string {
        return objHash(key)
    }

    set(key: NotUndefined, value: unknown): void {
        const _hash = this.calcHash(key)
        if (_hash in this.data) {
            const elem = this.data[_hash]
            elem.set(key, value)
        } else {
            this.data[_hash] = new LinkedList(key, value)
        }
    }

    get(key: NotUndefined) {
        const _hash = this.calcHash(key)
        if (_hash in this.data) {
            const res = this.data[_hash].get(key)
            console.log('Value:', res)
            return res
        } else {
            console.log('There is no elem with that key')
            return;
        }
    }

    private isEmpty(_hash: string): void {
        if (this.data[_hash].isRootNullable()) {
            delete this.data[_hash]
        }
    }

    remove(key: NotUndefined): void {
        const _hash = this.calcHash(key)
        if (_hash in this.data) {
            this.data[_hash].delete(key)
            this.isEmpty(_hash)
        } else {
            console.log('There is no elem with that key')
            return;
        }
    }

    clear(): void {
        this.data = {}
    }

    // print(): void {
    //     console.log(this.data)
    // }
}

// const p = new HashMap();
// const d = { a: 1 }
// p.set('a3a', 1)
// p.set('A3a', 2)
// p.set('A3A', 3)
// p.set('4', 4)
// p.print()
// console.log(p.get('a3a'))
// console.log(p.get('A3a'))
// console.log(p.get('A3A'))
// p.remove('A3a')
// p.remove('4')
// p.set('a3A', 5)
// p.print()

// console.log(p.get('a3a'))
// console.log(p.get('A3a'))
// console.log(p.get('A3A'))
// console.log(p.get('a3A'))

// const p = new LinkedList()
// p.set(1, 2)
// p.set(3, 4)
// p.set({ a: 1 }, 6)
// p.set(16, 8)
// console.log(p.get(3))
// console.log(p.get({ a: 1 }))
// p.delete(17)
// p.print()

//console.log(objHash({ a: 1 }, { algorithm: 'md5' }), objHash((a: number) => a, { algorithm: 'md5' }), objHash(1, { algorithm: 'md5' }), objHash('s', { algorithm: 'md5' }))

