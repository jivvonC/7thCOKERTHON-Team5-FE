export interface SessionLoginRequest {
  nickname: string;
  password: string;
}

export async function sessionLogin(body: SessionLoginRequest) {
  const response = await fetch('https://43.202.168.163.nip.io/api/auth/session-login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // ⭐️ 세션 로그인 핵심
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('로그인 실패');
  }

  return response.json(); // 백엔드가 반환하는 값이 있다면
}
