import { gql, type GraphQLClient } from 'graphql-request'
import type * as Types from './graphql'


export function getContentType(client: GraphQLClient, variables: Types.getContentTypeQueryVariables) : Promise<Types.getContentTypeQuery>
{
  const query = gql`query getContentType($key: String!, $version: String, $locale: [Locales!], $path: String, $domain: String) { content: _Content( where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}]} locale: $locale ) { total items { _metadata { types } } } }`
  return client.request<Types.getContentTypeQuery, Types.getContentTypeQueryVariables>(query, variables)
}
export function getContentByPath(client: GraphQLClient, variables: Types.getContentByPathQueryVariables) : Promise<Types.getContentByPathQuery>
{
  const query = gql`query getContentByPath($path: String!, $version: String, $locale: [Locales!], $domain: String) { content: _Content( where: {_metadata: {url: {default: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}} locale: $locale ) { total items { ...PageData ...BlankExperienceData ...StartPageData ...BlogPostPageData ...BlogPostPageSearchResult ...LandingPageData ...StandardPageData } } } fragment BlankExperienceData on BlankExperience { BlankExperienceSeoSettings { ...PageSeoSettingsPropertyData } ...ExperienceData } fragment StartPageData on StartPage { HomePageHeroContentArea { ...BlockData ...BlogListingBlockData ...CardBlockData ...CarouselBlockData ...OdpEmbedBlockData ...QuoteBlockData ...TextBlockData ...ButtonBlockData ...ContentRecsBlockData ...HeroBlockData ...HomePageHeroBlockData ...LayoutContainerBlockData ...BlankSectionData } HomePageMainContentArea { ...BlockData ...BlogListingBlockData ...CardBlockData ...CarouselBlockData ...OdpEmbedBlockData ...QuoteBlockData ...TextBlockData ...ButtonBlockData ...ContentRecsBlockData ...HeroBlockData ...HomePageHeroBlockData ...LayoutContainerBlockData ...BlankSectionData } } fragment BlogPostPageData on BlogPostPage { blogTitle: Heading blogSubtitle: ArticleSubHeading blogImage: BlogPostPromoImage { ...ReferenceData } blogBody: BlogPostBody { json } blogAuthor: ArticleAuthor } fragment BlogPostPageSearchResult on BlogPostPage { title: Heading image: BlogPostPromoImage { ...ReferenceData } author: ArticleAuthor seodata: SeoSettings { MetaTitle MetaDescription } _metadata { published } } fragment LandingPageData on LandingPage { TopContentArea { ...BlockData ...BlogListingBlockData ...CardBlockData ...CarouselBlockData ...OdpEmbedBlockData ...QuoteBlockData ...TextBlockData ...ButtonBlockData ...ContentRecsBlockData ...HeroBlockData ...HomePageHeroBlockData ...LayoutContainerBlockData ...BlankSectionData } MainContentArea { ...BlockData ...BlogListingBlockData ...CardBlockData ...CarouselBlockData ...OdpEmbedBlockData ...QuoteBlockData ...TextBlockData ...ButtonBlockData ...ContentRecsBlockData ...HeroBlockData ...HomePageHeroBlockData ...LayoutContainerBlockData ...BlankSectionData } } fragment StandardPageData on StandardPage { sptitle: StandardPageHeading spsubtitle: StandardSubHeading spimage: StandardPromoImage { ...ReferenceData } spdescription: MainBody { json } } fragment PageData on _IContent { ...IContentData } fragment PageSeoSettingsPropertyData on PageSeoSettingsProperty { MetaTitle MetaDescription SharingImage { ...ReferenceData } GraphType } fragment ExperienceData on _IExperience { composition { ...CompositionData } } fragment ReferenceData on ContentReference { key url { ...LinkData } } fragment LinkData on ContentUrl { base hierarchical default } fragment CompositionData on ICompositionNode { name: displayName layoutType: nodeType type key template: displayTemplateKey settings: displaySettings { key value } ... on ICompositionStructureNode { nodes @recursive(depth: 10) { name: displayName } } ... on ICompositionElementNode { element { ...ElementData ...ArticleListElementData ...CTAElementData ...ContentRecsElementData ...HeadingElementData ...ImageElementData ...ParagraphElementData ...TestimonialElementData ...VideoElementData } } } fragment ArticleListElementData on ArticleListElement { articleListCount } fragment CTAElementData on CTAElement { cta_text: Text cta_link: Link { ...LinkData } } fragment ContentRecsElementData on ContentRecsElement { ElementDeliveryApiKey ElementRecommendationCount } fragment HeadingElementData on HeadingElement { headingText } fragment ImageElementData on ImageElement { altText imageLink { ...ReferenceData } } fragment ParagraphElementData on ParagraphElement { text { json } } fragment TestimonialElementData on TestimonialElement { customerName customerLocation customerImage { ...ReferenceData } referenceTitle referenceText { json } } fragment VideoElementData on VideoElement { title video { ...ReferenceData } placeholder { ...ReferenceData } } fragment ElementData on _IElement { ...IElementData } fragment IElementData on _IElement { _metadata { ...IContentInfo } _type: __typename } fragment IContentInfo on IContentMetadata { key locale types displayName version url { ...LinkData } } fragment BlogListingBlockData on BlogListingBlock { _metadata { name: displayName } showFilters: BlogListingShowFilters selectedPageSize: BlogListingItemCount } fragment CardBlockData on CardBlock { cardButton: CardButton { className: ButtonClass children: ButtonText buttonType: ButtonType url: ButtonUrl { ...LinkData } buttonVariant: ButtonVariant } cardColor: CardColor cardDescription: CardDescription { json html } cardHeading: CardHeading cardIcon: CardIcon { ...ReferenceData } cardImage: CardImage { ...ReferenceData } cardSubheading: CardSubHeading cardImageLayout: ImageLayout } fragment CarouselBlockData on CarouselBlock { CarouselItemsContentArea { ...IContentListItem } } fragment OdpEmbedBlockData on OdpEmbedBlock { ContentId } fragment QuoteBlockData on QuoteBlock { quote: QuoteText color: QuoteColor active: QuoteActive name: QuoteProfileName profilePicture: QuoteProfilePicture { ...ReferenceData } location: QuoteProfileLocation } fragment TextBlockData on TextBlock { overline: TextBlockOverline headingSize: TextBlockHeadingSize heading: TextBlockHeading description: TextBlockDescription { json html } center: TextCenter width: TextBlockWidth className: TextClassName } fragment ButtonBlockData on ButtonBlock { children: ButtonText url: ButtonUrl { ...LinkData } className: ButtonClass buttonType: ButtonType buttonVariant: ButtonVariant } fragment ContentRecsBlockData on ContentRecsBlock { BlockDeliveryApiKey BlockRecommendationCount } fragment HeroBlockData on HeroBlock { heroImage: HeroImage { ...ReferenceData } eyebrow: Eyebrow heroHeading: Heading heroSubheading: SubHeading heroDescription: Description { json html } heroColor: HeroColor heroButton: HeroButton { ...ButtonBlockPropertyData } } fragment HomePageHeroBlockData on HomePageHeroBlock { homeHeroHeading: HomeHeroBlockHeading homeHeroSubheading: HomeHeroBlockSubHeading leftImage: HomeHeroLeftImage { ...ReferenceData } rightImage: HomeHeroRightImage { ...ReferenceData } homeHeroButton: HomeHeroButtonBlock { ...ButtonBlockPropertyData } } fragment LayoutContainerBlockData on LayoutContainerBlock { columns: ColumnsCount gap: GapSize LayoutContentArea { ...BlockData ...BlogListingBlockData ...CardBlockData ...CarouselBlockData ...OdpEmbedBlockData ...QuoteBlockData ...TextBlockData ...ButtonBlockData ...ContentRecsBlockData ...HeroBlockData ...HomePageHeroBlockData ...LayoutContainerBlockData ...BlankSectionData } containerColor: ContainerBackgroundColor backgroundImage: ContainerBackgroundImage { ...ReferenceData } marginTop: ContainerMarginTop marginBottom: ContainerMarginBottom paddingBottom: ContainerPaddingBottom paddingTop: ContainerPaddingTop } fragment BlankSectionData on BlankSection { _metadata { key } } fragment BlockData on _IContent { ...IContentData } fragment IContentListItem on _IContent { ...IContentData } fragment IContentData on _IContent { _metadata { ...IContentInfo } _type: __typename } fragment ButtonBlockPropertyData on ButtonBlockProperty { children: ButtonText url: ButtonUrl { ...LinkData } className: ButtonClass buttonType: ButtonType buttonVariant: ButtonVariant }`
  return client.request<Types.getContentByPathQuery, Types.getContentByPathQueryVariables>(query, variables)
}
export function getContentById(client: GraphQLClient, variables: Types.getContentByIdQueryVariables) : Promise<Types.getContentByIdQuery>
{
  const query = gql`query getContentById($key: String!, $version: String, $locale: [Locales!], $path: String, $domain: String) { content: _Content( where: {_or: [{_metadata: {key: {eq: $key}, version: {eq: $version}}}, {_metadata: {url: {hierarchical: {eq: $path}, base: {eq: $domain}}, version: {eq: $version}}}]} locale: $locale ) { total items { ...BlockData ...PageData ...BlogListingBlockData ...CardBlockData ...CarouselBlockData ...OdpEmbedBlockData ...QuoteBlockData ...TextBlockData ...ButtonBlockData ...ContentRecsBlockData ...HeroBlockData ...HomePageHeroBlockData ...LayoutContainerBlockData ...BlankSectionData ...BlankExperienceData ...StartPageData ...BlogPostPageData ...BlogPostPageSearchResult ...LandingPageData ...StandardPageData } } } fragment BlogListingBlockData on BlogListingBlock { _metadata { name: displayName } showFilters: BlogListingShowFilters selectedPageSize: BlogListingItemCount } fragment CardBlockData on CardBlock { cardButton: CardButton { className: ButtonClass children: ButtonText buttonType: ButtonType url: ButtonUrl { ...LinkData } buttonVariant: ButtonVariant } cardColor: CardColor cardDescription: CardDescription { json html } cardHeading: CardHeading cardIcon: CardIcon { ...ReferenceData } cardImage: CardImage { ...ReferenceData } cardSubheading: CardSubHeading cardImageLayout: ImageLayout } fragment CarouselBlockData on CarouselBlock { CarouselItemsContentArea { ...IContentListItem } } fragment OdpEmbedBlockData on OdpEmbedBlock { ContentId } fragment QuoteBlockData on QuoteBlock { quote: QuoteText color: QuoteColor active: QuoteActive name: QuoteProfileName profilePicture: QuoteProfilePicture { ...ReferenceData } location: QuoteProfileLocation } fragment TextBlockData on TextBlock { overline: TextBlockOverline headingSize: TextBlockHeadingSize heading: TextBlockHeading description: TextBlockDescription { json html } center: TextCenter width: TextBlockWidth className: TextClassName } fragment ButtonBlockData on ButtonBlock { children: ButtonText url: ButtonUrl { ...LinkData } className: ButtonClass buttonType: ButtonType buttonVariant: ButtonVariant } fragment ContentRecsBlockData on ContentRecsBlock { BlockDeliveryApiKey BlockRecommendationCount } fragment HeroBlockData on HeroBlock { heroImage: HeroImage { ...ReferenceData } eyebrow: Eyebrow heroHeading: Heading heroSubheading: SubHeading heroDescription: Description { json html } heroColor: HeroColor heroButton: HeroButton { ...ButtonBlockPropertyData } } fragment HomePageHeroBlockData on HomePageHeroBlock { homeHeroHeading: HomeHeroBlockHeading homeHeroSubheading: HomeHeroBlockSubHeading leftImage: HomeHeroLeftImage { ...ReferenceData } rightImage: HomeHeroRightImage { ...ReferenceData } homeHeroButton: HomeHeroButtonBlock { ...ButtonBlockPropertyData } } fragment LayoutContainerBlockData on LayoutContainerBlock { columns: ColumnsCount gap: GapSize LayoutContentArea { ...BlockData ...BlogListingBlockData ...CardBlockData ...CarouselBlockData ...OdpEmbedBlockData ...QuoteBlockData ...TextBlockData ...ButtonBlockData ...ContentRecsBlockData ...HeroBlockData ...HomePageHeroBlockData ...LayoutContainerBlockData ...BlankSectionData } containerColor: ContainerBackgroundColor backgroundImage: ContainerBackgroundImage { ...ReferenceData } marginTop: ContainerMarginTop marginBottom: ContainerMarginBottom paddingBottom: ContainerPaddingBottom paddingTop: ContainerPaddingTop } fragment BlankExperienceData on BlankExperience { BlankExperienceSeoSettings { ...PageSeoSettingsPropertyData } ...ExperienceData } fragment StartPageData on StartPage { HomePageHeroContentArea { ...BlockData ...BlogListingBlockData ...CardBlockData ...CarouselBlockData ...OdpEmbedBlockData ...QuoteBlockData ...TextBlockData ...ButtonBlockData ...ContentRecsBlockData ...HeroBlockData ...HomePageHeroBlockData ...LayoutContainerBlockData ...BlankSectionData } HomePageMainContentArea { ...BlockData ...BlogListingBlockData ...CardBlockData ...CarouselBlockData ...OdpEmbedBlockData ...QuoteBlockData ...TextBlockData ...ButtonBlockData ...ContentRecsBlockData ...HeroBlockData ...HomePageHeroBlockData ...LayoutContainerBlockData ...BlankSectionData } } fragment BlankSectionData on BlankSection { _metadata { key } } fragment BlogPostPageData on BlogPostPage { blogTitle: Heading blogSubtitle: ArticleSubHeading blogImage: BlogPostPromoImage { ...ReferenceData } blogBody: BlogPostBody { json } blogAuthor: ArticleAuthor } fragment BlogPostPageSearchResult on BlogPostPage { title: Heading image: BlogPostPromoImage { ...ReferenceData } author: ArticleAuthor seodata: SeoSettings { MetaTitle MetaDescription } _metadata { published } } fragment LandingPageData on LandingPage { TopContentArea { ...BlockData ...BlogListingBlockData ...CardBlockData ...CarouselBlockData ...OdpEmbedBlockData ...QuoteBlockData ...TextBlockData ...ButtonBlockData ...ContentRecsBlockData ...HeroBlockData ...HomePageHeroBlockData ...LayoutContainerBlockData ...BlankSectionData } MainContentArea { ...BlockData ...BlogListingBlockData ...CardBlockData ...CarouselBlockData ...OdpEmbedBlockData ...QuoteBlockData ...TextBlockData ...ButtonBlockData ...ContentRecsBlockData ...HeroBlockData ...HomePageHeroBlockData ...LayoutContainerBlockData ...BlankSectionData } } fragment StandardPageData on StandardPage { sptitle: StandardPageHeading spsubtitle: StandardSubHeading spimage: StandardPromoImage { ...ReferenceData } spdescription: MainBody { json } } fragment BlockData on _IContent { ...IContentData } fragment PageData on _IContent { ...IContentData } fragment LinkData on ContentUrl { base hierarchical default } fragment ReferenceData on ContentReference { key url { ...LinkData } } fragment IContentListItem on _IContent { ...IContentData } fragment IContentData on _IContent { _metadata { ...IContentInfo } _type: __typename } fragment IContentInfo on IContentMetadata { key locale types displayName version url { ...LinkData } } fragment ButtonBlockPropertyData on ButtonBlockProperty { children: ButtonText url: ButtonUrl { ...LinkData } className: ButtonClass buttonType: ButtonType buttonVariant: ButtonVariant } fragment PageSeoSettingsPropertyData on PageSeoSettingsProperty { MetaTitle MetaDescription SharingImage { ...ReferenceData } GraphType } fragment ExperienceData on _IExperience { composition { ...CompositionData } } fragment CompositionData on ICompositionNode { name: displayName layoutType: nodeType type key template: displayTemplateKey settings: displaySettings { key value } ... on ICompositionStructureNode { nodes @recursive(depth: 10) { name: displayName } } ... on ICompositionElementNode { element { ...ElementData ...ArticleListElementData ...CTAElementData ...ContentRecsElementData ...HeadingElementData ...ImageElementData ...ParagraphElementData ...TestimonialElementData ...VideoElementData } } } fragment ArticleListElementData on ArticleListElement { articleListCount } fragment CTAElementData on CTAElement { cta_text: Text cta_link: Link { ...LinkData } } fragment ContentRecsElementData on ContentRecsElement { ElementDeliveryApiKey ElementRecommendationCount } fragment HeadingElementData on HeadingElement { headingText } fragment ImageElementData on ImageElement { altText imageLink { ...ReferenceData } } fragment ParagraphElementData on ParagraphElement { text { json } } fragment TestimonialElementData on TestimonialElement { customerName customerLocation customerImage { ...ReferenceData } referenceTitle referenceText { json } } fragment VideoElementData on VideoElement { title video { ...ReferenceData } placeholder { ...ReferenceData } } fragment ElementData on _IElement { ...IElementData } fragment IElementData on _IElement { _metadata { ...IContentInfo } _type: __typename }`
  return client.request<Types.getContentByIdQuery, Types.getContentByIdQueryVariables>(query, variables)
}
