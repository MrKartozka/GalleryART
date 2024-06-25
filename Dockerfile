# Используем официальный образ Node.js в качестве базового
FROM node:lts

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем проект
RUN npm run build

# Устанавливаем сервер для обслуживания приложения
RUN npm install -g serve

# Запускаем приложение
CMD ["serve", "-s", "build"]

# Указываем порт, который будет использоваться контейнером
EXPOSE 3000
