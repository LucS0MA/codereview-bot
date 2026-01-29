FROM node:lts-alpine
RUN apk --no-cache add curl
WORKDIR /app
COPY package.json package.json 
RUN npm install
COPY prisma prisma
COPY prisma.config.ts prisma.config.ts
RUN npx prisma generate
COPY src src
COPY tsconfig.json tsconfig.json
COPY .eslint.js .eslint.js
COPY .prettierrc .prettierrc
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]