import * as dalRiddle1 from '../dal/dalriddle.js'

export async function readText() {
    try {
        const file = await dalRiddle1.readRiddle()
        return file
    }
    catch (err) {
        console.log(err)
    }
}



export async function creat(obj) {
    try {
        const file = await dalRiddle1.readRiddle()
        file.push(obj)
        await dalRiddle1.writeRiddle(file)
    }
    catch (err) {
        console.log(err)
    }
}

export async function delet(id) {
    try {
        const file = await dalRiddle1.readRiddle()
        file.forEach((element, i) => {
            if (element.id == id) {
                file.splice(i, 1)
                return
            }
        })
        await dalRiddle1.writeRiddle(file)
    }
    catch (err) {
        console.log(err)
    }
}


