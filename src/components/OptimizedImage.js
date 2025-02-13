import Image from 'next/image';

const OptimizedImage = ({ src, alt, width, height, className }) => {
  return (
    <div className={className} style={{ position: 'relative' }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout="responsive"
        objectFit="cover"
        quality={90}
        placeholder="blur"
        blurDataURL={src}
      />
    </div>
  );
};

export default OptimizedImage; 