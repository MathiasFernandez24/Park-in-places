import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('address.db');

export const init = () => {
    console.log("OK -Ingresa al Init de db")
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS addres(id INTEGER PRIMARY KEY NOT NULL, title TEXT, image TEXT, fecha TEXT, latitude TEXT, longitude TEXT, address TEXT)',
                [],
                () => {
                    console.log("OK -resuelve transaccion de crear db");
                    resolve()
                },
                (_, error) => {
                    console.log("ERROR en transaccion al crear db");
                    console.log(error.message);
                    reject(error)
                }
            )
        })
    })
    return promise
}

export const insertAddress = (place) => {
    const { id, title = "", image = "", fecha, latitude = "", longitude = "", address = "" } = place

    const promise = new Promise((res, rej) => {
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO addres (id, title, image, fecha, latitude, longitude, address) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [id, title, image, fecha, latitude, longitude, address],
                (_, result) => {
                    console.log("OK -agregar lugar desde db");
                    console.log(result);
                    res(result)
                },
                (_, error) => {
                    console.log("ERROR -agregar lugar desde db");
                    rej(error)
                }
            )
        })
    })
    return promise

}

export const fetchLocalDb = () => {
    const promise = new Promise((res, rej) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM addres",
                [],
                (_, result) => { res(result) },
                (_, error) => { rej(error) },
            )
        })
    })
    return promise
}

export const deleteToLocalDb = (id) => {
    const promise = new Promise((res, rej) => {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM addres WHERE id = ?;",
                [id],
                (_, result) => {
                    console.log("OK - borrar item de local DB, desde index DB");
                    res(result)
                },
                (_, error) => {
                    console.log("ERROR - borrar item de local DB, desde index DB");
                    rej(error)
                },
            )
        })
    })
    return promise
}