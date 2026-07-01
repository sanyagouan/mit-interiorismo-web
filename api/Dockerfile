FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev --silent
COPY server.mjs ./
EXPOSE 3100
CMD ["node", "server.mjs"]
