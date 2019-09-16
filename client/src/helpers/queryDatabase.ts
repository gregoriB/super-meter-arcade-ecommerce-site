import { IQueryDBArgs } from "../types/generalTypes";

const queryDatabase = async ({ path, query, method }: IQueryDBArgs): Promise<any> => {
    let options;
    if (method) {
        options = {
            method,
            body: JSON.stringify(query),
            headers: { "Content-Type": "applications/json" }
        };
    }
    const port = process.env.PORT || 8080;
    const response = await fetch(`localhost:${port}/${path}`, options);
    const data = await response.json();
    return data.rows.length ? data.rows : data;
};

export default queryDatabase;
