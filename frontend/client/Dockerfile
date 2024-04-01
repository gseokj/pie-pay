FROM node:20.4.0-alpine as builder

# 작업 폴더를 만들고 npm 설치
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install

# 소스를 작업폴더로 복사하고 빌드
COPY . /usr/src/app
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]