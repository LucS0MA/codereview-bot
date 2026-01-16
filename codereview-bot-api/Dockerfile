FROM node:lts-alpine
RUN apk --no-cache add curl
WORKDIR /app
COPY package.json package.json 
RUN npm install
COPY src src
COPY tsconfig.json tsconfig.json
COPY .eslint.js .eslint.js
COPY .prettierrc .prettierrc
CMD ["npm", "start"]