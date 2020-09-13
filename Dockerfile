FROM node:12-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app
RUN npm install --silent
RUN npm install npm install 
RUN ng build --configuration=docker

FROM nginx:1.16.0-alpine
COPY --from=build /app/dist/MurcyFrontEnd /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
