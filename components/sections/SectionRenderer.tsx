import React from 'react';
import HeroSection from './HeroSection';
import TextImageSection from './TextImageSection';
import GallerySection from './GallerySection';
import CtaBannerSection from './CtaBannerSection';
import MenuHighlightSection from './MenuHighlightSection';
import RichTextSection from './RichTextSection';
import QuoteSection from './QuoteSection';

const SECTION_COMPONENTS: Record<string, React.FC<{ data: any }>> = {
  heroBlock: HeroSection,
  textImageBlock: TextImageSection,
  galleryBlock: GallerySection,
  ctaBannerBlock: CtaBannerSection,
  menuHighlightBlock: MenuHighlightSection,
  richTextBlock: RichTextSection,
  quoteBlock: QuoteSection
};

const SectionRenderer: React.FC<{ sections: any[] }> = ({ sections }) => {
  if (!sections?.length) return null;

  return (
    <div>
      {sections.map(section => {
        const Component = SECTION_COMPONENTS[section._type];
        if (!Component) return null;
        const spacing = section._type === 'heroBlock' ? '' : 'py-16';
        return (
          <div key={section._key} className={spacing}>
            <Component data={section} />
          </div>
        );
      })}
    </div>
  );
};

export default SectionRenderer;
