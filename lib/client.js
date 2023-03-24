import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export  const client = sanityClient({
    projectId : 'zyuzs3x3',
    dataset : 'production',
    apiVersion : '2023-01-14',
    useCdn : true,
    token : process.env.NEXT_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);