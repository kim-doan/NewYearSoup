import React, { useState } from 'react';
import { Link } from 'gatsby'
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: #e5d5c6;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #9c4b3a;
    border-left: 4px solid white;
    cursor: pointer;
  }
`;

const Dropdown = styled.span`
  display: flex;
  color: #9c4b3a;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #9c4b3a;
    border-left: 4px solid white;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

const SubMenu = ({ item }) => {
    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);

    return (
        <>
        {item.subNav ?
                          <Dropdown onClick={item.subNav && showSubnav}>
                    <div>
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </div>
                    <div>
                        {item.subNav && subnav
                            ? item.iconOpened
                            : item.subNav
                                ? item.iconClosed
                                : null}
                    </div>
                </Dropdown>
          :
                          <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
                    <div>
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </div>
                    <div>
                        {item.subNav && subnav
                            ? item.iconOpened
                            : item.subNav
                                ? item.iconClosed
                                : null}
                    </div>
                </SidebarLink>
            }
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;