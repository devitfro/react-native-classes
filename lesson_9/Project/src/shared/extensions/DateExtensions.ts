export {};

declare global {
  interface Date {
    toDotted: () => string,
    toApi: () => string,
    toSqlDate: () => string,
    toSqlDateTime: () => string,
  }
}

Date.prototype.toDotted = function() : string {
  return `${this.getDate().pad2()}.${(this.getMonth() + 1).pad2()}.${this.getFullYear()}`;
}

Date.prototype.toApi = function() : string {
  return `${this.getFullYear()}${(this.getMonth() + 1).pad2()}${this.getDate().pad2()}`;
}

Date.prototype.toSqlDate = function() : string {
  return `${this.getFullYear()}-${(this.getMonth() + 1).pad2()}-${this.getDate().pad2()}`;
}

Date.prototype.toSqlDateTime = function(): string {
  return `${this.getFullYear()}-${(this.getMonth() + 1).pad2()}-${this.getDate().pad2()} ` +
         `${this.getHours().pad2()}:${this.getMinutes().pad2()}:${this.getSeconds().pad2()}`;
}