import axios from 'axios';

export const fetchImages = async (im, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${im}&page=${page}&key=34983998-155dfb76bac09cdf48f99cd2f&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
