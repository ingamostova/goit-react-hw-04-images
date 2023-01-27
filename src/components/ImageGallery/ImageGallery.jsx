import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ pictures, onClick }) => {
  return (
    <List>
      {pictures.map(picture => (
        <ImageGalleryItem onClick={onClick} item={picture} key={picture.id} />
      ))}
    </List>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
