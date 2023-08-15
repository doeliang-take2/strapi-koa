FROM node:18
# Installing libvips-dev for sharp Compatibility
#RUN apk update && apk add  build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
#ARG NODE_ENV=development
#ENV NODE_ENV=${NODE_ENV}
#WORKDIR /opt/
#RUN npm config set registry https://repo.huaweicloud.com/repository/npm/
COPY ./package.json ./
#ENV PATH /opt/node_modules/.bin:$PATH
RUN npm install
#RUN npm install
#--ignore-scripts=false --verbose sharp
#WORKDIR /opt/app
COPY . .
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "start"]