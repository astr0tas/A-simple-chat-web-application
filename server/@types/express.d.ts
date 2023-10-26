import 'express-session';

declare module 'express-session' {
      interface SessionData
      {
            username: string; // Define your session properties here
            // You can add other session properties as needed
      }
}
