import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../reducers/auth/slice';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export const SidebarData = [
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