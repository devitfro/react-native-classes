export {};

declare global {
  interface Date {
    toDotted: () => string,
    toApi: () => string,
  }
}

Date.prototype.toDotted = function() : string {
  return `${this.getDate().pad2()}.${(this.getMonth() + 1).pad2()}.${this.getFullYear()}`;
}

Date.prototype.toApi = function() : string {
  return `${this.getFullYear()}${(this.getMonth() + 1).pad2()}${this.getDate().pad2()}`;
}