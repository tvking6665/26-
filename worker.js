export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. [신규 라우트] 3D 공장동 맵 요청 시 서빙
    if (url.pathname === '/factory-3d' || url.pathname === '/650t') {
      // 방법 1: GitHub Pages에 올린 정적 사이트를 리버스 프록시로 매끄럽게 서빙
      const GITHUB_PAGES_URL = 'https://<본인-깃허브-아이디>.github.io/<저장소명>/index.html';
      return fetch(GITHUB_PAGES_URL);

      // 방법 2: 또는 Worker 내부에서 GitHub의 raw 파일을 바로 가져와 응답
      // const res = await fetch('https://raw.githubusercontent.com/<아이디>/<저장소>/main/index.html');
      // return new Response(await res.text(), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }

    // 2. 기존 bul.kim6665.workers.dev 포털 로직 유지
    return handleExistingPortal(request);
  }
};

// 기존 MES 포털 처리 함수
async function handleExistingPortal(request) {
  // 현재 운영 중인 기존 HTML/API 핸들러 코드 유지
  return new Response("기존 MES 모니터링 포털 화면", {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
