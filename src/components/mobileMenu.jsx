import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import NavTrigger from './navTrigger';
import '../less/mobileMenu.less';
import '../less/media.less';

class MobileMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMenuActive: false,
    };

    this.onNavTriggerClick = this.onNavTriggerClick.bind(this);
  }

  onNavTriggerClick() {
    const { isMenuActive } = this.state;
    if (!isMenuActive) {
      this.setState({
        isMenuActive: true,
      });
    } else {
      this.setState({
        isMenuActive: false,
      });
    }
  }

  render() {
    const { isMenuActive } = this.state;
    const { links, isPlain } = this.props;
    return (
      <>
        <header
          role="navigation"
          className={`mobile-header
            ${isMenuActive ? 'mobile-header--active' : ''}
            ${isPlain ? 'mobile-header--plain' : ''}`
          }
        >
          <a className="mobile-header__logo" href="\">
            <span style={{ display: 'none' }}>The Noted Project Home</span>
          </a>
          <NavTrigger
            onTriggerClick={this.onNavTriggerClick}
            isActive={isMenuActive}
          />
        </header>
        <section className={`mobile-menu ${isMenuActive ? 'mobile-menu--active' : ''}`}>
          <ul>
            {
              links.map(link => (
                <li key={`li-${link.slug}`}>
                  <Link
                    to={`${link.slug}`}
                    key={`${link.slug}`}
                    onClick={this.onNavTriggerClick}
                  >
                    {link.title}
                  </Link>
                </li>
              ))
            }
          </ul>
          <div className="header-media">
            <div className="header-media__share-text">
          Share
              <br />
          #THENOTEDPROJECT
            </div>
            <div className="mobile-menu__share">
              <a
                className="facebook media icon"
                href="https://www.facebook.com/sharer/sharer.php?u=TheNotedProject.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span style={{ display: 'none' }}>Share on Facebook</span>
              </a>
              <a
                className="twitter media icon"
                href="https://twitter.com/share?url=https%3A%2F%2Fwww.thenotedproject.org&text=Share%20The%20Noted%20Project:"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span style={{ display: 'none' }}>Share on Twitter</span>
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }
}

MobileMenu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  isPlain: PropTypes.bool,
};

MobileMenu.defaultProps = {
  isPlain: false,
};

export default MobileMenu;
