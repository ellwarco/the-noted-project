import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Layout from '../components/layout';
import SlideArea from '../components/story/slideArea';
import StoryMetaTags from '../components/story/storyMetaTags';
import SlideContentTypes from '../slideContentTypes';
import InfoCard from '../components/story/infoCard';
import withScrollSnapping from '../components/story/withScrollSnapping';

const SlideAreaWithScrolling = withScrollSnapping(SlideArea);

class StoryPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: '',
    };

    this.onCardSelected = this.onCardSelected.bind(this);
    this.onCardClosed = this.onCardClosed.bind(this);
  }

  onCardSelected(slug) {
    this.setState({
      activeCard: slug,
    });
  }

  onCardClosed() {
    this.setState({
      activeCard: '',
    });
  }

  render() {
    const { data } = this.props;
    const { activeCard } = this.state;
    const story = get(data, 'contentfulStory');
    const { metaTagTitle: shareTitle, metaTagDescription: shareDescription } = story;
    const shareImage = get(story, 'metaTagImage.file.url');
    const shareUrl = `/story/${story.slug}`;

    const existingCards = {};
    const infoCards = story.slides
      .filter(
        slide => slide.slideContent[0].__typename === SlideContentTypes.TextContent
          && slide.slideContent[0].infoCards,
      )
      .reduce((arr, slide) => arr.concat(slide.slideContent[0].infoCards), [])
      .reduce((arr, card) => {
        if (!existingCards[card.slug]) {
          existingCards[card.slug] = 1;
          arr.push(card);
        }
        return arr;
      }, [])
      .map(card => (
        <InfoCard
          headerImageUrl={card.headerImage.file.url}
          cardTitle={card.title}
          cardContentAst={card.text.childMarkdownRemark.htmlAst}
          isActive={card.slug === activeCard}
          onCloseClick={this.onCardClosed}
          key={card.slug}
        />
      ));

    const isCardActive = activeCard !== '';
    return (
      <Layout
        isStory
        infoCards={infoCards}
        isCardActive={isCardActive}
        storyTitle={story.title}
      >
        <StoryMetaTags
          shareUrl={shareUrl}
          shareTitle={shareTitle}
          shareDescription={shareDescription}
          shareImageUrl={shareImage}
        />
        <SlideAreaWithScrolling
          maxIndex={story.slides.length}
          slides={story.slides}
          storyTitle={story.title}
          storySlug={story.slug}
          nextStorySlug={story.nextStory.slug}
          previousStorySlug={story.previousStory.slug}
          onCardSelected={this.onCardSelected}
        />
      </Layout>
    );
  }
}

StoryPage.propTypes = {
  // eslint-disable-next-line
  data: PropTypes.object.isRequired,
};

export default StoryPage;

export const pageQuery = graphql`
  query StoryBySlug($slug: String!) {
    contentfulStory(slug: { eq: $slug }) {
      slug
      title
      nextStory{
        slug
      }
      previousStory{
        slug
      }
      metaTagTitle
      metaTagDescription
      metaTagImage {
        file {
          url
        }
      }
      slides {
        ...storySlideFragment
      }
    }
  }
`;
