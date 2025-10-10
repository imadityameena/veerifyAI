// Global type declarations for Node.js environment
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      MONGODB_URI: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      EMAIL_HOST?: string;
      EMAIL_PORT?: string;
      EMAIL_USER?: string;
      EMAIL_PASS?: string;
      FRONTEND_URL?: string;
    }
  }
}

export {};
