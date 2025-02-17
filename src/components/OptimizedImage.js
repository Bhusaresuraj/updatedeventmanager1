import Image from 'next/image';

const OptimizedImage = ({ src, alt, width, height, ...props }) => {
  return (
    <Image
      src={src}
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