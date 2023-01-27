import React, { useState, useEffect } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { fetchImages } from 'api';
import { Container } from './App.styled';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPictures, setTotalPictures] = useState(0);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largePicture, setLargePicture] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchPictures() {
      try {
        if (searchQuery === null) {
          return;
        }
        if (searchQuery.trim() === '') {
          throw new Error('Please enter correct search query');
        }
        setIsLoading(true);
        setError(null);
        const data = await fetchImages(searchQuery, page);
        if (!data.hits.length) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        setPictures(prevPictures => [...prevPictures, ...data.hits]);
        setTotalPictures(data.totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPictures();
  }, [page, searchQuery]);

  const handleSubmit = searchQuery => {
    setPictures([]);
    setSearchQuery(searchQuery);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = evt => {
    const largePicture = evt.target.dataset.source;
    if (largePicture) {
      setLargePicture(largePicture);
      toggleModal();
    }
  };

  const difference = pictures.length < totalPictures;

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />
      {error && <p>{error}</p>}
      <ImageGallery onClick={openModal} pictures={pictures} />
      {pictures.length > 0 && !isLoading && difference && (
        <Button onClick={loadMore} />
      )}
      {isLoading && <Loader />}
      {showModal && (
        <Modal onToggleModal={toggleModal}>
          <img src={largePicture} alt="" />
        </Modal>
      )}
    </Container>
  );
};
