
import { ref, getDatabase, get, set } from "firebase/database";
import app from "..";


const usergroup = "rooms/";
export default function readData(roomno) {
    return new Promise((resolve, reject) => {
        const db = getDatabase(app);
        const userref = ref(db, usergroup + roomno);

        get(userref).then((snapshot) => {
            const data = snapshot.val();
            resolve(data); // Resolve the promise with the data
        }).catch((error) => {
            reject(error); // Reject the promise if an error occurs
        });
    });
}