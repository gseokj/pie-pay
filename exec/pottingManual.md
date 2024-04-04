## 포팅 가이드라인

이 문서는 Piepay 서비스 Front, Back, Infra의 빌드 및 배포를 위한 문서입니다.

## 프로젝트 버전 정보

| 공통 | 형상관리 | Gitlab | \- |
| --- | --- | --- | --- |
|   | 커뮤니케이션 | Mattermost, Notion | \- |
| 개발툴 | IDE | Intellij | 2023.2.5 |
|   |   | Webstorm | 2023.3.2 |
| Backend | Java | Amazon-correto | 17 |
|   | Spring | Spring boot | 3.2.2 |
|   |   | Spring Security | 6.2.1 |
|   |   | Oauth2 | 3.2.3 |
|   |   | Stomp | 2.3.4 |
|   |   | JJWT | 0.12.5 |
|   |   | Cloud-AWS | 2.2.6 |
|   |   | Websocket | 2.3.4 |
|   | Build | Gradle | 8.5 |
|   | SMS | CoolSms | 4.3.0 |
|   | QRcode | Zxing | 3.5.0 |
| Frontend | Node | Node |   |
|   |   | Npm |   |
|   | WebSocket | Stomp | 2.3.3 |
|   |   | React |   |
|   |   | JavaScript |   |
|   |   | Next.js |   |
|   |   | TypeScript |   |
|   |   | Tailwind |   |
|   |   | Vanila extract |   |
|   |   | Tanstackquery |   |
|   |   | Zustand |   |
|   |   | auth.js |   |
| Database | RDBMS | MySql | 8.0.35 |
|   | Redis | Rdis | 7.2.4 |
| Infra | AWS-EC2 | Ubuntu | 20.04.6 |
|   | CI/CD | Docker | 26.0.0 |
|   |   | Jenkins | 2.450 |

## Front 배포 설정


-   배포 환경은 Ubuntu 20.04.6 을 사용합니다.

#### Https 인증 (Cerbot)

---

docker nginx를 사용하기 전에 https 인증을 위해서 nginx를 설치 후 https 인증 후 삭제를 진행

1.  Cerbot 설치  
    
    ```
    $ apt-get update
    $ sudo apt-get install certbot
    $ apt-get install python-certbot-nginx​
    ```
    
2.  Nginx SSL 설정  
    
    ```
    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        root /var/www/html;
        server_name {{domain_name}} # ex) i10a702.p.ssafy.io;
    }​
    ```
    
3.  Nginx 재시작  
    
    ```
    $ sudo service nginx restart​
    ```
    
4.  SSL 인증서 받기  
    
    ```
    sudo certbot --nginx -d {{domain_name}} -d {{sub_domain_name}}​
    ```
    
5.  로컬 Nginx 완전 삭제  
    
    ```
    sudo apt-get -y remove --purge nginx nginx-full nginx-common​
    ```
    

#### Docker Nginx 설정

---

-   Nginx 들어가기  
    
    ```
    docker exec -it -u root nginx /bin/bash​
    ```
    
-   Nginx 설정 파일 vim으로 들어가기  
    
    ```
    vim etc/nginx/conf.d/default.conf​
    ```
    
-   Nginx 추가 설정  
    
    ```
    server{
    	server_name j10a402.p.ssafy.io;
        
        access_log /var/log/nginx/access.log
    	error_log /var/log/nginx/error.log
        
        # Front
        location / {
        	proxy_pass http://j10a402.p.ssafy.io:3000;
        }
        
        # Back
        location /api {
        	proxy_pass http://j10a402.p.ssafy.io:8081;
        }
        
        # Back
    	# SSE 추가 설정
        location /api/sse {
        	proxy_pass http://j10a402.p.ssafy.io:8081;
            proxy_set_header Connection '';
            proxy_buffering off;
            proxy_http_version 1.1;
            proxy_read_timeout 3600;
            keepalive_timeout 75s; 
        }
        
    	# Back
        # 소셜 로그인 
        location /oauth2 {
        	proxy_pass http://j10a402.p.ssafy.io:8081;
        }
        
        # Back
        # Redirect
        location /login {
        	proxy_pass http://j10a402.p.ssafy.io:8081;
        }
        
        # Back
        # socket
        location /pay {
        	proxy_pass http://j10a402.p.ssafy.io:8081;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgade";
        }​
    ```
    

#### Dockerfile 설정

---

Front 빌드 및 배포를 위한 도커 파일은 프로젝트내 frontend/client 에 위치

```
FROM node:19.5.0-alpine

# 작업 폴더를 만들고 npm 설치
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json tsconfig.json next.config.js tailwind.config.ts postcss.config.js .env /usr/src/app/
COPY . /usr/src/app
RUN npm install

# 소스를 작업폴더로 복사하고 빌드
COPY . /usr/src/app
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Jenkins Execute Shell 설정

---

```
cd frontend/client && docker build -t piepay .

docker ps -a -q --filter "name=front" | grep -q . && docker stop front && docker rm front | true

docker run -d -p 3000:3000 --name front piepay

docker image prune -af
```

## Backend 설정


#### 서버 yml 파일 설정

---

{{ name }} 안의 내용을 사용자 환경에 맞게 수정

파일 경로 : piepay-api/src/main/resources/application-pie.yml

```
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://{{mysql-address}}
    username: { { mysql-username } }
    password: { { mysql-password } }

  security:
    oauth2:
      client:
        registration:
          kakao:
            client-id: {{ kakao-develop-restapi-key }}
            client-secret: {{ kakao-develop-restapi-key }}
            client-authentication-method: client_secret_post
            authorization-grant-type: authorization_code
            scope: # https://developers.kakao.com/docs/latest/ko/kakaologin/common#user-info
              - profile_nickname
              - profile_image
              - account_email
            redirect-uri:  {{ domain-address }}/login/oauth2/code/kakao
            client-name: Kakao

        provider:
          kakao:
            authorization-uri: https://kauth.kakao.com/oauth/authorize
            token-uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user-info-authentication-method: header
            user-name-attribute: id # Kakao 응답 값 id, connected_at, properties, kakao_account 중 id 지정
  data:
    redis:
      port: 6379
      host: {{ domain-address }}

jwt:
  issuer: pie
  key:
    salt: { { jwt-key } }
  expire_time:
    access-token: 1800
    refresh-token: 7200
coolSms:
  api-key: { { coolSms-api-key } }
  api-secret-key: { { coolSms-api-secret-key } }

bank:
  api-key: { { ssafy 제공 가상은행 } }
  url:
    create-user: { { ssafy 제공 가상은행(유저 생성 url) } }
    find-user: { { ssafy 제공 가상은행(유저 정보 url) } }
    inquire-account-list: { { ssafy 제공 가상은행(계좌 list) } }
    inquire-account: { { ssafy 제공 가상은행(계좌 정보) } }
    inquire-account-balance: { { ssafy 제공 가상은행(계좌 금액 조회) } }
    receiveTransferAccount: { { ssafy 제공 가상은행(계좌 입금) } }
    transfer-account: { { ssafy 제공 가상은행(계좌 이체) } }

cloud:
  aws:
    s3:
      bucket: { { aws-s3-bucket-name } }
    credentials:
      access-key: { { aws-s3-access-key } }
      secret-key: { { aws-s3-secret-key } }
    region :
      static: { { aws-s3-region } }
```

#### Dockerfile 설정

---

```
# 베이스 이미지로 OpenJDK 17 이미지를 사용
FROM amazoncorretto:17
# 8081 포트로 매핑
EXPOSE 8081
# 변수 선언
ARG JAR_FILE=build/libs/*.jar
# 호스트의 빌드 파일을 Docker 이미지 내로 복사
COPY ${JAR_FILE} piepay-api.jar
# jar 파일을 실행하는 명령을 설정
ENTRYPOINT ["java", "-jar", "/piepay-api.jar"]
```

#### Jenkins Execute Shell 설정

---

```
cp $secret piepay-api/src/main/resources/application-pie.yml
cd piepay-api && ./gradlew clean build
cd piepay-api && docker build -t jenkins/piepay .
docker ps -q --filter name=jenkins-piepay | grep -q . && docker stop jenkins-piepay && docker rm jenkins-piepay | true
docker run -p 8081:8080 -d -e TZ=Asia/Seoul --name=jenkins-piepay jenkins/piepay
docker rmi -f $(docker images -f "dangling=true" -q) || true
```

## 프로젝트 외부 서비스

---

서비스 이용을 위해서는 소셜로그인이 필요합니다.

현재 카카오 회원가입/로그인의 기능을 제공하고 있습니다.

따라서, 개발자는 kakao developer 에서 API KEY 발급이 필요합니다.

  
문자 전송을 위한 CoolSms  
[https://console.coolsms.co.kr/dashboard](https://console.coolsms.co.kr/dashboard)
