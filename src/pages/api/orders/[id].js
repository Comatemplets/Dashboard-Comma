import fsPromises from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  const filePath = path.resolve(
    process.cwd(),
    "src",
    "API_Data",
    "OrdersData.json"
  );
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);
  const id = req.query.id;
  const singleOrder = objectData.find((e) => e.id == id);
  if (req.method === "GET") {
    res.status(200).json(singleOrder);
    // Return all Order
  }
  if (req.method === "DELETE") {
    try {
      const updatedData = objectData.filter((Order) => !(Order.id == id));
      if (updatedData.length === objectData.length) {
        return res.status(404).json({ error: "Order not found" });
      }
      // Save updated data
      const updatedDatajson = JSON.stringify(updatedData);
      await fsPromises.writeFile(filePath, updatedDatajson);
      res.status(200).json(updatedDatajson);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete Order" });
    }
  }
}
