declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RESEND_API_KEY: string;
      API_BASE_URL: string;
    }
    interface ImportMetaEnv {
        readonly VITE_API_BASE_URL: string
      }
      
      interface ImportMeta {
        readonly env: ImportMetaEnv
      }      
  }
}

export {}
