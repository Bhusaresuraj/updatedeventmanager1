import Image from 'next/image';

const OptimizedImage = ({ src, alt, width, height, ...props }) => {
  const imagePath = src.startsWith('/') ? src : `/${src}`;
  
  return (
    <Image
      src={imagePath}
      alt={alt}
      width={width}
      height={height}
      loading="eager"
      style={{ objectFit: 'cover' }}
      {...props}
    />
  );
};

export default OptimizedImage; 