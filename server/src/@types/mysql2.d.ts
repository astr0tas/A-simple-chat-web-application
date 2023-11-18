import 'mysql2';

declare module 'mysql2' {
      interface QueryError
      {
            sql: string; // Define your session properties here
            // You can add other session properties as needed
      }
}
