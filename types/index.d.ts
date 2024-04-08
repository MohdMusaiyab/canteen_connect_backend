import { Express,Request } from "express";
export {};

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
    export interface Response{
      userId?:string;
    }
  }
}


// declare namespace Express {
//   export interface Request {
//       user: any;
//   }
//   export interface Response {
//       user: any;
//   }
// }
// declare module 'express-serve-static-core' {
//   export interface Request {
//     user: any
//   }
// }