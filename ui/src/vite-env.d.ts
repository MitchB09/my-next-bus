/// <reference types="vite/client" />

type ViteTypeOptions = {
  strictImportMetaEnv: unknown
}

type ImportMetaEnv = {
  readonly VITE_PERSONAL_DOMAIN: string
  readonly VITE_USERPOOL_ID: string
  readonly VITE_USERPOOL_CLIENT_ID: string
  readonly VITE_REDIRECT_URL: string
}

type ImportMeta = {
  readonly env: ImportMetaEnv
}
