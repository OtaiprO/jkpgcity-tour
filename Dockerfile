FROM node:20-alpine

# Install Python, Make, and GCC
RUN apk add --no-cache python3 make gcc g++

WORKDIR /app

COPY . .

RUN npm install

# Rebuild bcrypt module to ensure compatibility
RUN npm rebuild bcrypt --build-from-source

EXPOSE 8080

CMD ["node", "server.js"]
