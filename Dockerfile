# Versão do node recomendada.
FROM node:20.12.0

# Define um diretório raiz.
WORKDIR /usr/app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instalar dependências do sistema e o editor nano
RUN apt-get update && apt-get install -y nano

# Instala as dependências.
RUN npm install

# Copia todos os arquivos necessários da aplicação.
COPY . .

# Gera o Prisma Client.
RUN npx prisma generate

# Executa o build/compilação dos arquivos.
RUN npm run build

# Porta que o app é executado.
EXPOSE 3333
