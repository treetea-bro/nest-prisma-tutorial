# 실행 방법
공통) 도커를 설치합니다.

## Development
1. `bash build.dev.sh`를 실행합니다.
2. `bash build.dev.sh`이후부터는 `bash dev.sh`로 실행합니다.
3. prisma studio를 실행하려면 `studio.sh`를 실행합니다.

## Production
1. `bash build.sh`를 실행합니다.
2. localhost:4040에 접속해서 공용도메인을 확인하고 접속합니다.
3. 젠킨스 로그인을하고 파이프라인을 생성합니다.
