import path from "path";

export default ({ env }) => {
  const client = env("DATABASE_CLIENT", "sqlite");

  // If you want Postgres on Render, set DATABASE_CLIENT=postgres + DATABASE_URL on Render
  if (client === "postgres") {
    const databaseUrl = env("DATABASE_URL");
    const useSSL = env.bool("DATABASE_SSL", true);

    return {
      connection: {
        client: "postgres",
        connection: databaseUrl
          ? {
              connectionString: databaseUrl,
              ssl: useSSL ? { rejectUnauthorized: false } : false,
            }
          : {
              host: env("DATABASE_HOST"),
              port: env.int("DATABASE_PORT", 5432),
              database: env("DATABASE_NAME"),
              user: env("DATABASE_USERNAME"),
              password: env("DATABASE_PASSWORD"),
              ssl: useSSL ? { rejectUnauthorized: false } : false,
            },
        pool: { min: 0, max: 10 },
      },
    };
  }

  // Local SQLite (this is what your local content was using)
  const filename =
    env("DATABASE_FILENAME") ||
    path.join(__dirname, "..", "..", ".tmp", "data.db");

  return {
    connection: {
      client: "sqlite",
      connection: {
        filename,
      },
      useNullAsDefault: true,
    },
  };
};
