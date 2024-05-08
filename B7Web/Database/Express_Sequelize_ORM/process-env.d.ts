declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            MYSQL_DB: string;
            MYSQL_USER: string;
            MYSQL_PASSWORD: string;
            MYSQL_PORT: string;

            PG_DB: string;
            PG_USER: string;
            PG_PASSWORD: string;
            PG_PORT: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}