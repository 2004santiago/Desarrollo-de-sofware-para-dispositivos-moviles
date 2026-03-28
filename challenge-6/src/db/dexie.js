import Dexie from "dexie";

const db = new Dexie("Challenge06DB");

// Version 1 - tablas iniciales
db.version(1).stores({
  frutas: "++id, nombre, createdAt"
});

export default db;