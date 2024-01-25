import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { ENV_CONFIG } from "./envConfig";
const firebaseConfig = {
  apiKey: ENV_CONFIG.API_KEY,
  authDomain: ENV_CONFIG.AUTH_DOMAIN,
  projectId: ENV_CONFIG.PROJECT_ID,
  storageBucket: ENV_CONFIG.STORAGE_BUCKET,
  messagingSenderId: ENV_CONFIG.MESSAGING_SENDER_ID,
  appId: ENV_CONFIG.APP_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);