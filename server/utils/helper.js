import fs from "fs";

const DB_PATH = "./data/users.json";

// READ DATA
export const readData = () => {

  const data =
    fs.readFileSync(
      DB_PATH,
      "utf-8"
    );

  return JSON.parse(data);
};

// WRITE DATA
export const writeData = (data) => {

  fs.writeFileSync(
    DB_PATH,
    JSON.stringify(data, null, 2)
  );
};