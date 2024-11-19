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

// Тестовый маршрут для проверки работы сервера
app.get("/api/template", (req, res) => {
  res.json({ message: "Сервер работает!" });
});

// Маршрут для получения JSON-данных
app.post("/api/upload", (req, res) => {
  const data = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ error: "Данные должны быть массивом JSON" });
  }

  const filePath = path.join(__dirname, "uploaded.json");
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Ошибка записи файла" });
    }
    res.json({ message: "Данные успешно загружены и сохранены" });
  });
});

app.get("/api/uploaded", (req, res) => {
  const filePath = path.join(__dirname, "uploaded.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Ошибка чтения файла" });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData); // Отправляем данные обратно клиенту
    } catch (parseError) {
      return res.status(500).json({ error: "Ошибка при обработке данных" });
    }
  });
});

// Обработчик неизвестных маршрутов
app.use((req, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
