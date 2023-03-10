import React from 'react';
import styled from 'styled-components';
import logo from '../../img/logo.png';
import AuthForm from '../AuthForm';
import { useState } from 'react';
import { authService } from '../../firebase';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Weather from '../Weather';
import nullImage from '../../img/null-image.png';

const Header = ({ toggle, setToggle }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  });

  const onClickToggleHandler = () => {
    setToggle(!toggle);
  };

  const [signinmodal, setSignInModal] = useState(false);
  const showsignin = () => {
    setSignInModal(true);
  };

  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  };

  const onClickNavigateCommunityHandler = () => {
    setToggle(!toggle);
    navigate('/postlist');
  };

  return (
    <div>
      <StHeader>
        <StNavLogo>
          <img src={logo} alt="logo" onClick={() => navigate('/')} />
        </StNavLogo>

        <StNavMenu>
          {isLoggedIn ? (
            <li onClick={onLogOutClick}>로그아웃</li>
          ) : (
            <li onClick={showsignin}>로그인</li>
          )}
          {signinmodal && <AuthForm setSignInModal={setSignInModal} />}
          {isLoggedIn ? (
            <StList onClick={() => navigate('/profile')}>
              <StDisplayName>
                {authService.currentUser.displayName}
              </StDisplayName>
              {authService.currentUser.photoURL ? (
                <StProfileImg
                  src={authService.currentUser.photoURL}
                  alt="img"
                />
              ) : (
                <StProfileImg src={nullImage} alt="img" />
              )}
            </StList>
          ) : null}

          <li>
            <Weather />
          </li>
        </StNavMenu>

        <StNavToggleBtn onClick={onClickToggleHandler}>
          <i className="fa-solid fa-bars"></i>
        </StNavToggleBtn>
      </StHeader>

      {toggle ? (
        <StNavMenuNone>
          {isLoggedIn ? (
            <li onClick={onLogOutClick}>로그아웃</li>
          ) : (
            <li onClick={showsignin}>로그인</li>
          )}
          {signinmodal && <AuthForm setSignInModal={setSignInModal} />}
          {isLoggedIn ? (
            <StList onClick={() => navigate('/profile')}>
              <StDisplayName>
                {authService.currentUser.displayName}
              </StDisplayName>
              {authService.currentUser.photoURL ? (
                <StProfileImg
                  src={authService.currentUser.photoURL}
                  alt="img"
                />
              ) : (
                <StProfileImg src={nullImage} alt="img" />
              )}
            </StList>
          ) : null}
        </StNavMenuNone>
      ) : null}
      <hr />
    </div>
  );
};

const StHeader = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  max-width: 1360px;
  margin: auto;
  width: 80%;
  padding-right: 10px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 95%;
    position: fixed;
    top: 10;
    background-color: white;
  }
`;

const StNavLogo = styled.div`
  img {
    width: 100px;
  }
`;

const StProfileImg = styled.img`
  border-radius: 50%;
  width: 30px;
  &:hover {
    cursor: pointer;
  }
`;
const StDisplayName = styled.div`
  margin-right: 10px;
`;
const StList = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StNavMenu = styled.div`
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  li {
    padding: 8px 12px;
  }
  li:hover {
    background-color: #48af48;
    border-radius: 4px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const StNavMenuNone = styled.div`
  margin: auto;
  padding: 10px 0 10px 0;
  margin-top: 10px;
  width: 100%;
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    width: 80%;
    gap: 5px;
    padding-top: 100px;
    li {
      width: 70%;
      text-align: center;
      padding: 8px 12px;
      border: 3px solid black;
    }
    li:hover {
      background-color: #48af48;
      border-radius: 4px;
    }
  }
`;

const StNavToggleBtn = styled.span`
  display: none;
  position: absolute;
  top: 28px;
  right: 32px;
  font-size: 24px;
  color: #48af48;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export default Header;
