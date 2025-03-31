import path from 'path';

export default ({ env }) => {
  const isProduction = env('NODE_ENV') === 'production';

  return {
    connection: isProduction
      ? {
          client: 'postgres',
          connection: {
            connectionString: env('DATABASE_URL'),
            ssl: {
              rejectUnauthorized: false,
            },
          },
          pool: { min: 2, max: 10 },
        }
      : {
          client: 'sqlite',
          connection: {
            filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
          },
          useNullAsDefault: true,
        },
  };
};