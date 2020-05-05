export const buildUrl = (url: string = "/", entity: string = "") =>
  url.endsWith("/") ? url + entity : url + "/" + entity;
