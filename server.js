import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Путь для работы с __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Для разрешения запросов с другого origin
app.use(bodyParser.json()); // Для работы с JSON

// Маршрут для получения шаблона
app.get("/api/template", (req, res) => {
  res.json({ message: "Сервер работает!" });
});

// Маршрут для получения JSON-данных
app.post("/api/upload", (req, res) => {
  const data = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ error: "Данные должны быть массивом JSON" });
  }

  // Сохранение данных в файл
  const filePath = path.join(__dirname, "uploaded.json");
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Ошибка записи файла:", err);
      return res.status(500).json({ error: "Не удалось сохранить файл" });
    }

    res.json({ message: "Данные успешно загружены и сохранены" });
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
