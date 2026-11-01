FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ su-exec

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY . .

ENV NODE_ENV=production \
    PORT=3011 \
    DATABASE_PATH=/data/database.sqlite \
    FIREBASE_PROJECT_ID=general-2ed6c

EXPOSE 3011

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3011/health').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["sh", "/app/docker-entrypoint.sh"]
