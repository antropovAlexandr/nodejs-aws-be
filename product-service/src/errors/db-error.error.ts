class DatabaseError extends Error {
  name: string;
  code: number;

  constructor(message) {
    super(message);
    this.name = "DatabaseError";
    this.code = 500;
  }
}
