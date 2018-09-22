import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';
import get from 'lodash/get';
import MobileMenu from './mobileMenu';
import ShareLink from './shareLink';
import { ShareLinkType } from '../shareLinkTypes';
import '../less/header.less';

const shareLinks = [
  { type: ShareLinkType.Email, text: 'email' },
  { type: ShareLinkType.Facebook, text: 'facebook' },
  { type: ShareLinkType.Twitter, text: 'twitter' },
];

const Navigation = ({
  isStory, isSplash, isPlain, showLightMenu, data,
}) => {
  const twitterShareBody = get(data, 'contentfulSiteMetaContent.twitterShareBody');
  const links = get(data, 'contentfulSiteMetaContent.links')
    .map(link => ({
      slug: link.slug ? link.slug : '',
      title: link.title,
    }));
  const siteUrl = get(data, 'contentfulSiteMetaContent.siteUrl');
  const shareLinksWithTwitter = shareLinks.map(
    link => (link.type === ShareLinkType.Twitter
      ? { ...link, linkTextContent: twitterShareBody }
      : link),
  );
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
            <div className="header-logo">
              <span style={{ display: 'none' }}>The Noted Project Home</span>
            </div>
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
              <div className="link-wrapper">
                <ShareLink
                  linkType={ShareLinkType.Placeholder}
                  linkText="Share"
                />
                <div className="link-wrapper">
                  {shareLinksWithTwitter.map(link => (
                    <ShareLink
                      key={link.type}
                      linkType={link.type}
                      linkText={link.text}
                      linkUrl={siteUrl}
                      linkTextContent={link.linkTextContent}
                    />
                  ))}
                </div>
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
        contentfulSiteMetaContent{
          links{
            title
            slug
          }
          siteUrl
          twitterShareBody
        }
      }
    `}
    render={
      data => <Navigation data={data} {...props} />
    }
  />
);
