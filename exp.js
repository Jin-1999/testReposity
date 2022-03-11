let arr = [1, 2, 3, 4]

function fn(v) {
    setTimeout(() => { console.log(v) }, 1000)
}

async function test() {
    // forEach
    // arr.forEach(async (v) => {
    //     await fn(v)
    // })

    // for循环
    // for (let i = 0; i < arr.length; i++) {
    //     await fn(arr[i])
    // }

    // for of
    // for (let i of arr) {
    //     await fn(i)
    // }
}


test()