import React, { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { fetchImages } from 'api';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    pictures: [],
    page: 1,
    totalPictures: 0,
    searchQuery: null,
    isLoading: false,
    error: null,
    largePicture: '',
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevImage = prevState.searchQuery;
    const nextImage = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevImage !== nextImage || prevPage !== nextPage) {
      try {
        if (nextImage.trim() === '') {
          throw new Error('Please enter correct search query');
        }
        this.setState({ isLoading: true, error: null });
        const data = await fetchImages(nextImage, nextPage);
        if (!data.hits.length) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...data.hits],
          totalPictures: data.totalHits,
        }));
      } catch (error) {
        this.setState({
          error: error.message,
        });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, pictures: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  openModal = evt => {
    const largePicture = evt.target.dataset.source;
    if (largePicture) {
      this.setState({ largePicture });
      this.toggleModal();
    }
  };

  render() {
    const {
      isLoading,
      error,
      pictures,
      totalPictures,
      showModal,
      largePicture,
    } = this.state;
    const { handleSubmit, loadMore, openModal, toggleModal } = this;
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
  }
}
