import "dotenv/config";

interface Env {
  PORT: number;
  APP_URL: string;
  DATABASE_URL: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  FRONTEND_URL: string;
}

// helper function (env validation)
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`❌ Missing environment variable: ${name}`);
  }
  return value;
}

export const env: Env = {
  PORT: Number(process.env.PORT) || 5000,
  APP_URL: requireEnv("APP_URL"),
  DATABASE_URL: requireEnv("DATABASE_URL"),
  BETTER_AUTH_SECRET: requireEnv("BETTER_AUTH_SECRET"),
  BETTER_AUTH_URL: requireEnv("BETTER_AUTH_URL"),
  FRONTEND_URL: requireEnv("FRONTEND_URL"),
};
