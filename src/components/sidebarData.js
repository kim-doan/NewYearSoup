import React from 'react';
import * as AiIcons from 'react-icons/ai';

export default SidebarData = [
  {
    title: '홈 화면으로 이동',
    path: '/',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: '내 밥상 보러가기',
    path: '/auth/login',
    icon: <AiIcons.AiFillProfile />,
  },
  {
    title: '로그아웃',
    path: '/',
    icon: <AiIcons.AiOutlineLogout />,
  }
];