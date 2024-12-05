declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RESEND_API_KEY: string;
      API_BASE_URL: string;
    }
  }
}

export {}
