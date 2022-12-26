import React from 'react';
import Slide from '../components/main/Slide';
import BestView from '../components/main/BestView';
import SideBanner from '../components/main/SideBanner';

function MainPage() {
  return (
    // 메인 홈페이지 컴포넌트 분리
    <>
      <hr />

      <Slide />

      <hr />

      <BestView />

      <hr />
      <SideBanner />

      <hr />
    </>
  );
}

export default MainPage;
