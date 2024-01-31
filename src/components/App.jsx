/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { fetchImages } from './SearchImage/SearchImage';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { animateScroll } from 'react-scroll';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [image, setImage] = useState([]);
  const [page, setPage] = useState(1);
  const per_Page = 12;
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('largeImageURL');
  //const [id, setId] = useState(null);

  useEffect(() => {
    getImages(imageName, page);
  }, [imageName, page]);

  const getImages = async (im, page) => {
    if (!im) {
      return;
    }
    setLoading(true);
    try {
      const { hits, totalHits } = await fetchImages(im, page);

      setImage(prevImages => [...prevImages, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / per_Page));
    } catch (error) {
      setError({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setImage([]);
    setPage(1);
    setLoadMore(false);
  };

  const onLoadMore = () => {
    setLoading(true);
    setPage(prevPage => prevPage + 1);
    scrollOnMoreButton();
  };

  const scrollOnMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      {loading ? (
        <Loader />
      ) : (
        <ImageGallery images={image} openModal={openModal} />
      )}

      {loadMore && <Button onLoadMore={onLoadMore} page={page} />}

      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </>
  );
}
