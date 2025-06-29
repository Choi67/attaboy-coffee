import api from '@/lib/api';

export interface User {
  no: number;
  role: string;
  name: string;
  email: string;
  mobile: string;
  tel: string;
  position: string;
  groupName: string;
  teamName: string;
}

class AuthService {
  private currentUser: User | null = null;

  /**
   * 로그인 요청
   */
  async login(id: string, password: string): Promise<User> {
    try {
      const response = await api.post<{ data: User }>('/api/ext/login', { id, password });
      this.currentUser = response.data.data;
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      return this.currentUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * 비밀번호 찾기 요청 (이메일로 재설정 링크 발송)
   */
  async forgotPassword(email: string): Promise<void> {
    try {
      // 실제 API 연동 시 이 부분을 수정
      // await api.post('/auth/forgot-password', { email });
      
      // 개발용 임시 로직
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`비밀번호 재설정 링크가 ${email}로 발송되었습니다.`);
          resolve();
        }, 1500);
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  /**
   * 비밀번호 재설정
   */
  async resetPassword(token: string, password: string): Promise<void> {
    try {
      // 실제 API 연동 시 이 부분을 수정
      // await api.post('/auth/reset-password', { token, password });
      
      // 개발용 임시 로직 - token과 password 매개변수를 콘솔에 출력하여 사용
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`토큰 ${token}을 사용하여 비밀번호를 ${password}로 재설정했습니다.`);
          resolve();
        }, 1500);
      });
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  /**
   * 로그아웃
   */
  async logout(): Promise<void> {
    try {
      await api.post('/api/user/logout');
      this.currentUser = null;
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  /**
   * 현재 로그인한 사용자 가져오기
   */
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  /**
   * 사용자가 로그인되어 있는지 확인
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return user !== null;
    } catch (error) {
      console.error('Authentication check error:', error);
      return false;
    }
  }

  /**
   * 사용자의 특정 권한 확인
   */
  async hasRole(requiredRole: string): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      if (!user) return false;
      
      return user.role === requiredRole;
    } catch (error) {
      console.error('Role check error:', error);
      return false;
    }
  }
}

export default new AuthService(); 