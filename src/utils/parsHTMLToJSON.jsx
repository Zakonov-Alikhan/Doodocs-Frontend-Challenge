export default function parsHTMLToJSON(file) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(file, "text/html");

  const spans = doc.querySelectorAll("span");
  const jsonResult = [];

  spans.forEach((span) => {
    const idMatch = span.textContent.match(/{{ input "(.*)" }}/);
    if (idMatch) {
      const id = idMatch[1]; // извлекаем (.*), группу захвата
      const name =
        span.closest("p")?.textContent?.split(":")[0].trim() || "Unknown"; // название поля

      const isNumeric = name.toLowerCase().includes("иин");
      const isRequired = !name.includes("(опционально)");

      jsonResult.push({
        id: id,
        type: "INPUT_TEXT",
        name: name,
        is_required: isRequired,
        attrs: {
          has_max: true,
          max: isNumeric ? 12 : 255,
          has_min: true,
          min: isNumeric ? 12 : 1,

          ...(isNumeric && { numeric: true }), //использую spread оператор для добавления свойства при необходимости
        },
      });
    } else if (!idMatch || !idMatch[1]) {
      console.warn(`Invalid input format in span: ${span.textContent}`);
      return;
    }
  });
  return jsonResult;
}
