# Auth Advanced
Это полнофункциональное веб-приложение, демонстрирующее продвинутую систему аутентификации и авторизации.


</br>

### 🛠️ Стек технологий

Клиентская часть:
> React, TypeScript, MobX ￼

</br>

Серверная часть:
> Express, MongoDB, JWT (JSON Web Tokens) ￼ ￼ ￼

</br>

📂 Структура проекта
> client/ — исходный код фронтенда.\
> server/ — исходный код бэкенда.
</br>

### 🚀 Начало работы

Предварительные требования
> Node.js (v14-v20), npm, MongoDB

</br>

**Установка**

**1.	Клонируйте репозиторий:**
```bash
git clone https://github.com/ayub-a/auth-advanced.git
cd auth-advanced
```
\
**2.	Установите зависимости для клиента и сервера:**
```bash
cd client
npm install
cd ../server
npm install
```
\
**3.	Создайте файл <u>.env</u> в папке server/ и добавьте следующие переменные окружения:**
```env
PORT=3001
DB_URL=mongodb+srv://[your-link-from-mongodb]
JWT_ACCESS_SECRET=[your-jwt-access-secret]
JWT_REFRESH_SECRET=[your-jwt-refresh-secret]
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=[your-gmail]
SMTP_PASSWORD=[your-gmail-password]
API_URL=http://localhost:3001
CLIENT_URL=http://localhost:3000
```
\
**4.	Запустите сервер и клиент:**
```bash
# В папке server/
npm start

# В новой вкладке терминала, в папке client/
npm start
```
\
**🔐 Функциональность**
> + Регистрация и вход пользователя
> + Защищённые маршруты с использованием JWT
> + Управление состоянием с помощью MobX
> + Интеграция с MongoDB для хранения данных пользователей ￼
