import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const hander = NextAuth({
  // 在 providers 中配置更多授权服务
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
});

export { hander as GET, hander as POST };
