import api from "./api";

export function list() {
  return api.get("/games");
}

export function create(name, image, stockTotal, pricePerDay) {
  return api.post("/games", {
    name,
    image,
    stockTotal,
    pricePerDay,
  });
}
