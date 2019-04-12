import React from 'react';

const LoginPage = () => (
  <div className="box-layout">
    <div className="box-layout__box">
      <div className="box-layout__topbox">
        <img src="https://i.imgur.com/PvYs6dc.png" className="box-layout__avatar"/>
      </div>
      <div className="box-layout__bottombox">
        <h1 className="box-layout__title">Sora Waifu Manager</h1>
        <p>Manage and request waifus</p>
        <a href="/auth/login" className="button button--rounded button-sora">Login with Discord</a>
      </div>
    </div>
  </div>
);

export default LoginPage;