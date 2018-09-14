import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';
import get from 'lodash/get';
import MobileMenu from './mobileMenu';
import ShareLink from './shareLink';
import '../less/header.less';

const Navigation = ({
  isStory, isSplash, isPlain, showLightMenu, data,
}) => {
  const links = get(data, 'allContentfulLayout.edges')
    .map(edge => ({
      slug: edge.node.slug,
      title: edge.node.title,
    }));

  links.unshift({
    slug: '/',
    title: 'Home',
  });

  return (
    <>
      <header
        role="navigation"
        className={`header-row
          ${isStory ? 'header-row--story' : ''}
          ${isSplash ? 'header-row--splash' : ''}`
        }
      >
        <section className={`tnp-header ${showLightMenu ? 'light' : ''}`}>
          <div className={`header-logo-wrapper ${isPlain ? 'plain' : ''}`}>
            <a className="header-logo" href="\">
              <span style={{ display: 'none' }}>The Noted Project Home</span>
            </a>
          </div>
          <nav className="header-links no-mobile">
            {links.map(link => (
              <Link
                to={`${link.slug}`}
                key={`${link.slug}`}
              >
                {link.title}
              </Link>
            ))}
          </nav>
          <div className="header-media no-mobile">
            <div className="share-links">
              <ShareLink
                linkType="placeholder"
                linkText="Share"
              />
              <div className="link-wrapper">
                <ShareLink
                  linkType="email"
                  linkText="Email"
                  linkUrl="mailto:?subject=The%20Noted%20Project&body=http://www.thenotedproject.org"
                />
                <ShareLink
                  linkType="facebook"
                  linkText="Facebook"
                  linkUrl="https://www.facebook.com/sharer/sharer.php?u=TheNotedProject.org"
                />
                <ShareLink
                  linkType="twitter"
                  linkText="Twitter"
                  linkUrl="https://twitter.com/share?url=https%3A%2F%2Fwww.thenotedproject.org&text=Share%20The%20Noted%20Project:"
                />
              </div>
            </div>
          </div>
        </section>
      </header>
      <MobileMenu
        links={links}
        isPlain={isPlain}
      />
    </>
  );
};

Navigation.propTypes = {
  isStory: PropTypes.bool,
  isSplash: PropTypes.bool,
  isPlain: PropTypes.bool,
  showLightMenu: PropTypes.bool,
  data: PropTypes.shape({
    allContentfulLayout: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          slug: PropTypes.string,
          title: PropTypes.string,
        }),
      })),
    }),
  }).isRequired,
};

Navigation.defaultProps = {
  isStory: false,
  isSplash: false,
  isPlain: false,
  showLightMenu: false,
};

// export default Navigation;
export default props => (
  <StaticQuery
    query={graphql`
      query NavigationQuery {
        allContentfulLayout{
          edges{
            node{
              slug
              title
            }
          }
        }
      }
    `}
    render={
      data => <Navigation data={data} {...props} />
    }
  />
);
