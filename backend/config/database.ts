export default ({ env }) => {
  const databaseUrl = env("DATABASE_URL");
  const useSSL = env.bool("DATABASE_SSL", true);

  return {
    connection: {
      client: env("DATABASE_CLIENT", "postgres"),
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
};
