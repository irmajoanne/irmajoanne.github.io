import React from 'react';
import Menu from './Menu';
import {ReactComponent as MailIcon} from '../utils/icons/mail.svg'
import {ReactComponent as InstagramIcon} from '../utils/icons/instagram.svg'

const Navbar = props => {
  const { lang, setLang } = props
  const switchLang = () => {
    lang === 'en-US' ? setLang('nl') : setLang('en-US')
  }

  return (
    <div className="navbar">
      <div
        className="mail"
        onClick={() => window.open('mailto:info@irmajoanne.com', '_blank')}
      >
        <MailIcon />
      </div>
      <div
        className="instagram"
        onClick={() => window.open('https://www.instagram.com/irma.joanne', '_blank')}
      >
        <InstagramIcon />
      </div>
      <div
        className="language"
        onClick={switchLang}
      >
        {lang === 'en-US' ? 'EN' : 'NL'}
      </div>
      <Menu lang={lang} />
    </div>
  );
}

export default Navbar;
