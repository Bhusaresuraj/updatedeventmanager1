import Image from 'next/image';

// In the component
<div className={styles.serviceImage}>
  <Image
    src={service.image}
    alt={service.title}
    width={400}
    height={300}
    objectFit="cover"
  />
</div> 