FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build:prod

FROM nginx:alpine

COPY --from=builder /app/dist/course-dashboard/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"] 