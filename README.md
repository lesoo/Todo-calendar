# Todo-calendar(toy)
투두리스트 효율적 관리를 위한 웹페이지<br>
(2025.10~)

<br>

## 개발환경, 사용 API
  ![Node.js](https://img.shields.io/badge/nodejs-%2344f8844?style=for-the-badge&logo=nodejs&logoColor=white)
![NextJs](https://img.shields.io/badge/Firebase%20Cloud%20Messaging-%23fd8B00?style=for-the-badge&logo=fcm&logoColor=white)
![React](https://img.shields.io/badge/react-%23fd8B00?style=for-the-badge&logo=react&logoColor=white)
<br>
<br>

## ENV 파일 설정
<br>

- #### backend
> backend 폴더에 저장
```
    #LOCAL
    # NODE_ENV=(선택)
    DB_HOST=
    DB_USER=
    DB_PASSWORD=
    DB_NAME=
    DB_PORT=
    ENC_KEY=비밀번호 암호화/복호화 키
    TOKEN_SECRET=jwt토큰 암호화 키
    SERVER_PORT=
```
<br>
<br>

- #### frontend
> frontend 폴더에 저장
```
NEXT_PUBLIC_API_URL=http://localhost:${backend:SERVER_PORT}api
```
<br>
<br>

## 사용방법
.env 파일 설정<br>
$git pull origin main<br>
$yarn install<br>
터미널 2개 구동<br>
 - 터미널 1<br>
   $cd backend<br>
   $yarn start<br>
 - 터미널 2<br>
   $cd frontend<br>
   $yarn dev<br>
localhost:${SERVER_PORT} or localhost:${SERVER_PORT}/login 접속


