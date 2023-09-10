FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package.json .
RUN yarn install
COPY ./ ./
RUN yarn build

FROM nginx 
EXPOSE 3000
COPY ./nginx.conf /etc/nginx/conf.d/default.conf 
COPY --from=builder usr/src/app/build  /usr/share/nginx/html 