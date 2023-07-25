## KIOSK 프로젝트

# 기본 셋팅

.gitignore
.prettierr
app.js

# npm i 옵션

dependencies: 프로덕션 환경에서 응용 프로그램에 필요한 패키지.
devDependencies: 로컬 개발 및 테스트에만 필요한 패키지.

npm install
// package.json의 dependencies에 있는 모든 패키지를 설치한다.
// 처음 프로젝트를 세팅했다면 이 명령어로 패키지를 설치하고 개발을 시작하면 된다.

npm i
// npm install 의 줄인 명령어.

npm install [package]
// 현재 작업중인 디렉토리 내에 있는 ./node_modules에 [package]를 설치한다.
// (예: npm install moment) -> ./node_modules에 moment 패키지를 설치 함

npm install [package] --save
// [package]를 설치 하면서 package.json파일에 있는 dependencies 객체에 지금 설치한 패키지 정보를 추가한다.

npm install [package] --save -dev
// --save옵션과 같이 package.json파일에 의존성 내용을 추가하지만
// dependencies가 아닌 devDepenencies 객체에 추가한다.
–save와 –save-dev의 차이는 의존성을 기본으로 추가할지, 개발용으로 추가할지의 차이이다.
--production로 빌드할 경우 devDepenencies에 있는 패키지들은 설치되지 않는다

npm install [package] --no-save
// dependencies에 패키지 정보를 추가하지 않는다.

npm install [package] --save-exact
// 정확히 일치하는 버전의 패키지를 추가한다.

npm install [package] --save-bundle
// 해당 패키지를 bundleDependencies에 추가한다.

npm install [package] --force
// 해당 패키지가 존재하더라도 원격 저장소에 있는 패키지를 가져온다.

# express

app.listen(port,()=>{})
http 객체를 쓰는 이유 -> 더 많은 옵션을 넣을 수 있다. 소켓.. https 같은

# npm i sequelize sequelize-cli nodemon mysql2

패키지 설치

# 시퀄라이즈

npx sequelize init
config/config.json 파일 설정
npx sequelize db:create

# babel

바벨은 ES5+ 코드를 자바스크립의 하위 호환 버전으로 변환하여 오래된 브라우저에서 실행하도록 변환하는 컴파일러이다. (트랜스파일링: 특정 언어로 작성된 코드를 다른 언어로 변환)

# 필요한 패키지

npm install --save-dev @babel/core @babel/cli @babel/preset-env

@babel/core
바벨의 핵심 기능이 있는 모듈 (parsing, traverse, generator를 한꺼번에 처리할 수 있는 함수를 제공 => transformSync)
@babel/cli
@babel/core에 대한 인터페이스 역할을 하며 개발 프로세스와 잘 통합되는 도구
@babel/preset-env
모던 자바스크립트를 지원하기 위한 모든 플러그인의 집합

# babel.config.json

{
"presets": [
[
"@babel/preset-env",
{
"targets": {
"edge": "17",
"firefox": "60",
"chrome": "67",
"safari": "11.1"
},
"useBuiltIns": "usage",
"corejs": "3.6.5"
}
]
]
}

#

# 바벨 > package.json

{
...
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"compile": "babel src -d dist"
},
...
}

# 출처

https://velog.io/@suyeon9456/Babel#%EF%B8%8F-babel%EC%9D%B4-%ED%95%98%EB%8A%94-%EC%9D%BC

- 6번부터 안했다.
