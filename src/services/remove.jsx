import axios from "axios";
import { ref, getDatabase, get, set, remove } from "firebase/database";
import app from "..";

const usergroup="rooms/";
export function removeinDB(roomno) {
    const db = getDatabase(app);

    const userref = ref(db, usergroup+roomno);

    remove(userref);

}