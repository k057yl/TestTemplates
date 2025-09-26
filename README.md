HTML Template Manager + PDF Generator

Невеликий веб-застосунок для керування HTML-шаблонами та генерації PDF.
 *** Стек
- **Backend**: .NET 9, EF Core, PostgreSQL, QuestPDF
- **Frontend**: React + TypeScript
- **Docker**: Docker + Docker-Compose

*** Backend (API + БД)
- Створення шаблону: POST /api/templates
- Редагування: PUT /api/templates/{id}
- Видалення: DELETE /api/templates/{id}
- Отримання списку всіх шаблонів: GET /api/templates`
- Генерація PDF: POST /api/templates/{id}/generate з JSON даними для підстановки

*** Приклад підстановки:
Шаблон: "<html>Привіт, {{Name}}! Дата: {{Date}}</html>"
JSON: { "Name": "Іван", "Date": "2025-09-14" }
Результат PDF: Привіт, Іван! Дата: 2025-09-14

*** Frontend
Сторінка зі списком шаблонів
Кнопка "Створити новий шаблон"
Редагування / Видалення
Генерація PDF (введення JSON → виклик API → скачування PDF)

*** Docker-Compose
* Запуск:
docker-compose up --build
API: http://localhost:8080/swagger
PostgreSQL: порт 5432

* Локальний запуск Frontend
cd template-client
npm install
npm run dev
Frontend буде доступний на http://localhost:3000

*** Структура проекту
TestTemplates/
docker-compose.yml
Dockerfile
.gitignore

*** Backend
Api/                 
Controllers/
Data/
Entities/
Services/
Api.csproj
Dockerfile

*** Frontend
template-client/      
src/
public/
package.json
tsconfig.json


*** Примітки
Для генерації PDF використовується QuestPDF
Міграції БД застосовуються автоматично при старті контейнера
JSON для генерації PDF повинен містити всі ключі {{Placeholders}} шаблона
