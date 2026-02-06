const PASSWORD = '9544*';

export const config = {
  matcher: '/',
};

export default function middleware(request) {
  const url = new URL(request.url);
  const cookies = request.headers.get('cookie') || '';
  const isAuthenticated = cookies.includes('cnsa_auth=verified');

  // Check if trying to verify password
  const authParam = url.searchParams.get('auth');
  if (authParam === PASSWORD) {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/',
        'Set-Cookie': 'cnsa_auth=verified; Path=/; Max-Age=604800; SameSite=Strict',
      },
    });
  }

  // Check if trying to logout
  if (url.searchParams.get('logout') === 'true') {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/',
        'Set-Cookie': 'cnsa_auth=; Path=/; Max-Age=0',
      },
    });
  }

  // If authenticated, allow access
  if (isAuthenticated) {
    return;
  }

  // Show error message if wrong password
  const showError = authParam && authParam !== PASSWORD;

  // Show login page
  return new Response(getLoginHTML(showError), {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

function getLoginHTML(showError) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CNSA Tools - 로그인</title>
  <link rel="icon" href="/favicon.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
      min-height: 100vh;
      background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .login-screen {
      text-align: center;
      background: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 100%;
    }
    .logo { width: 80px; height: 80px; margin-bottom: 1.5rem; }
    h1 { color: #1e3a5f; font-size: 1.8rem; margin-bottom: 0.5rem; }
    .desc { color: #64748b; margin-bottom: 2rem; font-size: 0.95rem; }
    input {
      width: 100%;
      padding: 1rem;
      font-size: 1rem;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      outline: none;
      text-align: center;
      letter-spacing: 0.1em;
    }
    input:focus { border-color: #3b82f6; }
    button {
      width: 100%;
      padding: 1rem;
      font-size: 1rem;
      font-weight: 600;
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      color: white;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      margin-top: 1rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    button:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4); }
    .error { color: #dc2626; font-size: 0.9rem; margin-top: 1rem; }
  </style>
</head>
<body>
  <div class="login-screen">
    <img src="/favicon.png" alt="CNSA Logo" class="logo">
    <h1>CNSA Tools</h1>
    <p class="desc">접근하려면 비밀번호를 입력하세요</p>
    <form id="loginForm" method="get" action="/">
      <input type="password" name="auth" placeholder="비밀번호" required autofocus>
      <button type="submit">입장</button>
    </form>
    ${showError ? '<p class="error">비밀번호가 올바르지 않습니다</p>' : ''}
  </div>
</body>
</html>`;
}
