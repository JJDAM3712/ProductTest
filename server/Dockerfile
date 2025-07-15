# Base: Node.js
FROM node:20

# Crea directorio de trabajo
WORKDIR /app

# Copia dependencias
COPY package*.json ./

# Installs dependencies
RUN npm install 

COPY . .

RUN npm run build

# enviroment
ENV PORT=8090

# Expone el puerto
EXPOSE 8090

# comand for starting the server
CMD ["npm", "run", "start"]