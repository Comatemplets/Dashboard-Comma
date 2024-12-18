import { v4 as uuidv4 } from "uuid";
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
  const data = req.body;
  const ID = uuidv4();
  if (req.method === "GET") {
    // Handle any other HTTP method

    res.status(200).json([...objectData]);
  } else if (req.method === "POST") {
    const newData = {
      id: ID,
      ...data,
    };
    objectData.push(newData);

    // Convert the object back to a JSON string
    const updatedData = JSON.stringify(objectData);
    // Write the updated data to the JSON file
    await fsPromises.writeFile(filePath, updatedData);
  } else if (req.method === "PUT") {
    // Handle PUT method
    const { id, ...updateFields } = data;
    console.log(id);
    // Find the product by id
    const productIndex = objectData.findIndex((product) => product.id === id);

    // Update the product
    objectData[productIndex] = {
      ...objectData[productIndex],
      ...updateFields,
    };

    // Save the updated data
    const updatedData = JSON.stringify(objectData);
    await fsPromises.writeFile(filePath, updatedData);
    res.status(200).json([...objectData]);
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
