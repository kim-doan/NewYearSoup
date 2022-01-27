import { Link, navigate } from 'gatsby'
import React, { useState } from 'react';
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import _ from 'lodash';
import { SidebarData } from './SidebarData';

const Nav = styled.div`
  background: #9c4b3a;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav <{ sidebar: boolean }>`
  background: #9c4b3a;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;


const SideBar = ({ pageTitle, children }) => {
  const [sidebar, setSidebar] = React.useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <IconContext.Provider value={{ color: 'white' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              if (item.title === "로그아웃") {
                return <SubMenu item={item} key={index} onClick={() => {
                  signOut(auth).then(() => {
                    window.location.reload();
                    alert("로그아웃했습니다.")
                  });
                }} />;
              } else if (item.title == "내 밥상 보러가기") {
                if (auth.currentUser) {
                  item.path = `/table/${auth.currentUser.uid}`;
                }
                return <SubMenu item={item} key={index} onClick={() => {
                }} />;
              } else {
                return <SubMenu item={item} key={index} onClick={null} />;
              }
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </div>
  )
}

export default SideBar