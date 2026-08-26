# 하루빛 — 나만의 iOS 스타일 스케줄러

iOS 캘린더/미리알림 앱의 감성(블러 유리질감, 스프링 애니메이션, SF 계열 폰트)을 기반으로 만든
개인용 캘린더 + 할 일 앱입니다. 데이터는 브라우저 로컬 저장소(localStorage)에만 저장되며,
로그인 없이 바로 사용할 수 있습니다.

## 시그니처 요소
- **오늘 펄스 링**: 오늘 날짜에만 코랄색 숨쉬는 링 애니메이션이 표시됩니다.
- 월간/주간 뷰를 세그먼트 컨트롤로 전환, 하루를 탭하면 iOS 스타일 바텀시트로 일정·할 일을 확인/추가/수정합니다.

## 로컬에서 실행하기

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속

## GitHub에 올리기

```bash
cd ios-scheduler
git init
git add .
git commit -m "Initial commit: iOS 스타일 스케줄러"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Vercel로 배포하기

1. https://vercel.com 에 로그인 (GitHub 계정 연동)
2. **Add New... → Project** 선택
3. 방금 push한 GitHub 저장소를 Import
4. Framework Preset은 자동으로 **Next.js**로 감지됩니다 (별도 설정 불필요)
5. **Deploy** 클릭 → 몇 분 후 `https://<project-name>.vercel.app` 주소로 접속 가능

이후 `main` 브랜치에 push할 때마다 Vercel이 자동으로 재배포합니다.

## 폴더 구조

```
src/
  app/            페이지, 레이아웃, 전역 스타일
  components/     Header, MonthView, WeekView, DaySheet, EventForm, BottomSheet, Fab 등
  hooks/          useEvents (localStorage 연동 상태 관리)
  lib/            타입, 날짜 유틸, 태그 색상, 저장소 헬퍼
```

## 기술 스택
Next.js 14 (App Router) · TypeScript · Tailwind CSS · localStorage (별도 백엔드 없음)
