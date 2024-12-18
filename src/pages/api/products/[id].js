import fsPromises from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  const filePath = path.resolve(
    process.cwd(),
    "src",
    "API_Data",
    "ProductsData.json"
  );
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);
  const id = req.query.id;
  const singleProduct = objectData.find((e) => e.id == id);
  if (req.method === "GET") {
    res.status(200).json(singleProduct);
    // Return all products
  }
  if (req.method === "DELETE") {
    try {
      const updatedData = objectData.filter((product) => !(product.id == id));
      if (updatedData.length === objectData.length) {
        return res.status(404).json({ error: "Product not found" });
      }
      // Save updated data
      const updatedDatajson = JSON.stringify(updatedData);
      await fsPromises.writeFile(filePath, updatedDatajson);
      res.status(200).json(updatedDatajson);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  }
}
