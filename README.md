# 회의 관리 React + TypeScript + Vite

## 개발 환경

- node : 22.11
- npm : 10.9

## 개발 PC 실행

- package 설치 : `npm install`
- 개발 화면 기동 : `npm run dev`

## 빌드

- `npm run build` : 이 때 빌드 실패 에러가 발생하는데, 해당 에러 라인의 지시대로 수정하면 됨 : 대부분 사용되지 않는 import 나 런타임시 발생할 수 있는 null case 에 대한 방어 코드를 요구함(예시 : user?.profile?.imageUrl 같이 null case 방어)
- build 가 완료되면 dist 폴더로 배포용 파일 생성 => 서버에 업로드 => nginx 대상경로에 배포

```
server {
        listen 80;
        server_name sys-fe.heromakers.kr;
        client_max_body_size 200M;
        root /works/www/syschat/dist;
        location / {
                try_files $uri $uri/ /index.html;
                add_header 'Access-Control-Allow-Origin' '*';
                add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
                add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
        }
}

```

## 기타

- 코드 정렬 : `npm run prettier`

## 인증

- redux 가 좀 어려운 편이기에 선행지식이 필요하다
- 토큰들을 사용한 인증 연장 : accessToken 은 9시간 refreshToken은 7일 => accessToken이 만료되는 순간, ~/refreshToken를 호출해서 새로운 9시간, 7일 토큰들을 받아옴 => refreshToken이 다시 7일 연장
- isTokenExpired 함수 유의
- config.ts : workInstance.interceptors.response.use(~~) 로직은 토큰이 만료되어 401 에러 가 수신되면 토큰 갱신 로직 실행 후, API 재 호출을 함.
- AuthGuard.tsx : 화면 진입시, 토큰 만료 시간을 체크해서 토큰 갱신

## 코딩 조언

- 새로운 모델(interface) 생성시 models 폴더에
- 새로운 API 등록시 api 폴더에
- 새로운 화면 생성은 pages 폴더에
- 경로(route) 등록은 src/routes/AppRoutes.tsx 에, 좌측 메뉴에 보이게 하려면, src/config/menu.config.ts 에 추가
