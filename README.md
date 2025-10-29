# GitHub Pages 정적 블로그

순수 HTML, CSS, JavaScript로 만든 정적 블로그입니다. GitHub Pages에 배포되며, 마크다운 파일로 게시글을 작성합니다.

## 🚀 빠른 시작

### 1. 저장소 설정

1. 저장소 이름: `{your_github_username}.github.io`
2. GitHub Actions를 사용한 자동 배포

### 2. 필수 설정

#### 1) .nojekyll 파일 확인

`.nojekyll` 파일이 루트 디렉토리에 있는지 확인하세요.

#### 2) Giscus 설정

1. https://github.com/apps/giscus 접속하여 앱 설치
2. https://giscus.app/ 접속하여 설정 가져오기
3. `js/post-loader.js` 파일에서 Giscus 설정 업데이트:

```javascript
script.setAttribute("data-repo", "YOUR_USERNAME/YOUR_REPO");
script.setAttribute("data-repo-id", "YOUR_REPO_ID");
script.setAttribute("data-category-id", "YOUR_CATEGORY_ID");
```

#### 3) 블로그 정보 수정

`index.html` 및 `post.html`에서 "My Blog"를 자신의 블로그 제목으로 변경하세요.

### 3. 게시글 작성

`pages/` 디렉토리에 마크다운 파일(`.md`)을 추가하세요.

Front Matter 형식:

```markdown
---
title: "게시글 제목"
date: 2025-01-26
tags: ["JavaScript", "Web"]
category: "Development"
description: "게시글 설명"
---

# 제목

내용...
```

### 4. 배포

1. 변경사항을 커밋하고 push:

```bash
git add .
git commit -m "Add new post"
git push origin main
```

2. GitHub Actions가 자동으로 실행됩니다
3. 약 1-2분 후 https://{your_github_username}.github.io 접속

## 📁 디렉토리 구조

```
/
├── .nojekyll              # Jekyll 비활성화
├── index.html             # 메인 페이지
├── post.html              # 게시글 상세 페이지
├── posts.json             # 게시글 메타데이터 (자동 생성)
├── css/
│   ├── style.css          # 메인 스타일
│   └── prism.css          # 코드 하이라이팅
├── js/
│   ├── app.js             # 메인 로직
│   ├── post-loader.js     # 게시글 로딩
│   ├── search.js          # 검색
│   └── theme.js           # 다크/라이트 모드
├── pages/                 # 마크다운 게시글
│   └── example.md
└── .github/
    ├── workflows/
    │   └── deploy.yml      # GitHub Actions
    └── scripts/
        └── generate-posts.js  # posts.json 생성
```

## ✨ 주요 기능

- ✅ 마크다운 파싱 (marked.js)
- ✅ 코드 하이라이팅 (Prism.js)
- ✅ 다크/라이트 모드
- ✅ 검색 및 태그 필터
- ✅ 반응형 디자인
- ✅ Giscus 댓글 시스템
- ✅ 자동 배포 (GitHub Actions)

## 🛠️ 로컬 개발

### posts.json 생성

로컬에서 테스트하려면:

```bash
node .github/scripts/generate-posts.js
```

이 명령어는 `pages/` 디렉토리의 마크다운 파일들을 읽어서 `posts.json`을 생성합니다.

### 로컬 서버 실행

Python 3:

```bash
python -m http.server 8000
```

Node.js (http-server):

```bash
npx http-server
```

브라우저에서 http://localhost:8000 접속

## 📝 게시글 작성 팁

1. **Front Matter 필수 속성**:

   - `title`: 게시글 제목
   - `date`: 날짜 (YYYY-MM-DD)

2. **Front Matter 선택 속성**:

   - `tags`: 태그 배열
   - `category`: 카테고리
   - `description`: 설명

3. **마크다운 문법**:
   - 제목: `# 제목`
   - 코드 블록: ` ```language `로 언어 지정
   - 링크: `[텍스트](URL)`

## 🔧 문제 해결

### 게시글이 404 에러

- `.nojekyll` 파일이 루트에 있는지 확인
- GitHub Actions가 성공적으로 실행되었는지 확인
- `posts.json`이 제대로 생성되었는지 확인

### Giscus 댓글이 표시되지 않음

- GitHub Discussions가 활성화되었는지 확인
- giscus.app에서 config 정보를 다시 복사
- `data-repo-id`, `data-category-id`가 올바른지 확인

### 다크 모드가 작동하지 않음

- 브라우저 콘솔에서 JavaScript 오류 확인
- `localStorage`가 비활성화되어 있지 않은지 확인

## 📄 라이선스

이 프로젝트는 MIT 라이선스입니다.

## 🙏 감사의 말

- [marked.js](https://github.com/markedjs/marked) - 마크다운 파서
- [Prism.js](https://prismjs.com/) - 코드 하이라이팅
- [Giscus](https://giscus.app/) - 댓글 시스템
# sean-jou2020.github.io
