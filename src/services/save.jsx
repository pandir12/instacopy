import axios from "axios";
import { ref, getDatabase, get, set } from "firebase/database";
import app from "..";

const usergroup="rooms/";
export function saveinDb(roomno, data) {
    const db = getDatabase(app);

    const userref = ref(db, usergroup+roomno);

    set(userref, data);

}