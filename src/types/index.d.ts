import mongoose from "mongoose";
export {};

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId>;
        name: string;
        role: string;
      };
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      DATABASE_URL: string;
      DATABASE_URL_V2: string;
      JWT_SECRET: string;
      JWT_LIFETIME: string;
    }
  }
}
