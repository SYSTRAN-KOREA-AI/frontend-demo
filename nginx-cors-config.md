# Nginx CORS 설정 가이드

## 문제 설명

빌드된 React 앱을 nginx로 서빙할 때 Authorization 헤더가 전달되지 않는 문제가 발생할 수 있습니다.

## 해결 방법

### 1. Nginx CORS 설정

nginx 설정 파일에 다음 CORS 헤더를 추가하세요:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/your/react/build;
    index index.html;

    # CORS 헤더 설정
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
    add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range' always;

    # OPTIONS 요청 처리 (preflight)
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
    }

    # React Router를 위한 설정
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 프록시 설정 (필요시)
    location /api/ {
        proxy_pass http://your-backend-server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 2. 환경별 설정

#### 개발 환경 (npm run dev)

- Vite dev server가 자동으로 CORS를 처리
- Authorization 헤더가 정상적으로 전달됨

#### 프로덕션 환경 (nginx)

- nginx에서 CORS 헤더를 명시적으로 설정해야 함
- Authorization 헤더를 허용 헤더에 포함해야 함

### 3. 추가 확인사항

#### 브라우저 개발자 도구에서 확인

1. Network 탭에서 요청 헤더 확인
2. Authorization 헤더가 포함되어 있는지 확인
3. CORS 에러가 발생하는지 확인

#### Redux DevTools에서 확인

1. Redux DevTools에서 auth state 확인
2. access_token이 제대로 설정되어 있는지 확인

### 4. 문제 해결 순서

1. **nginx CORS 설정 확인**
2. **Redux store 상태 확인**
3. **axios interceptor 동작 확인**
4. **브라우저 네트워크 요청 확인**

### 5. 디버깅 팁

```bash
# nginx 설정 테스트
nginx -t

# nginx 재시작
sudo systemctl restart nginx

# nginx 로그 확인
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## 주의사항

- `Access-Control-Allow-Origin: *`는 개발 환경에서만 사용
- 프로덕션에서는 특정 도메인만 허용하도록 설정
- Authorization 헤더는 민감한 정보이므로 HTTPS 사용 권장

