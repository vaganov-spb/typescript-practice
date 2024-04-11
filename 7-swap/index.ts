type IKeyValue = string | number | symbol

const obj = { a: 1, b: 2, c: 3 }

function swapKeysAndValuesSecond<T extends IKeyValue, V extends Record<string, T>>(obj: V): Record<T, string> {
    const res = {} as Record<T, string>

    Object.entries(obj).forEach(([key, value]) => {
        res[value] = key
    });

    return res

}

console.log(swapKeysAndValuesSecond(obj))


export { }