FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY prisma ./prisma

ENV DATABASE_URL="postgresql://postgres:55622@postgres:5432/app_db"

RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]