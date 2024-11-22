import { Grid, Box, Typography, IconButton, Modal } from '@mui/material';
import { ZoomIn, Close } from '@mui/icons-material';
import { useState } from 'react';

const ImageUploadSection = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const images = [
    { label: 'Front View', imageUrl: 'https://images.meesho.com/images/products/70916372/fcp1v_512.jpg' },
    { label: 'Side View', imageUrl: 'https://images.meesho.com/images/products/70916372/shozq_512.jpg' },
    { label: 'Back View', imageUrl: 'https://images.meesho.com/images/products/70916372/shozq_512.jpg' },
    { label: 'Top View', imageUrl: 'https://images.meesho.com/images/products/70916372/shozq_512.jpg' },
    { label: 'size chart', imageUrl: 'https://images.meesho.com/images/products/70916372/shozq_512.jpg' },
  ];

  return (
    <>
      <div>
        <Grid item xs={12} className='opacity-80 font-semibold'>Add images with details listed here</Grid>
        <Grid container spacing={2} className='bg-white border p-3 mt-4 '>
          {images.map((item, index) => (
            <Grid item xs={12} key={index} >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {/* Small Image with hover effect */}
                <Box sx={{ position: 'relative' }}>
                  <img
                    src={item.imageUrl}
                    alt={item.label}
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                    }}
                    className='border rounded-0'
                    onClick={() => handleOpen(item.imageUrl)} // Open modal on click
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      color: 'white',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      },
                    }}
                    onClick={() => handleOpen(item.imageUrl)} // Open modal on hover click
                  >
                    <ZoomIn />
                  </IconButton>
                </Box>

                {/* Label next to the image */}
                <Typography variant="body2">{item.label}</Typography>
              </Box>
            </Grid>
          ))}

          {/* Modal for Image View */}
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxHeight: '100vh',
                maxWidth: '50vw',
                display: 'flex', // Center content
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: 3,
                overflow: 'auto', // Enables scrolling for large images
                padding: 2,
                textAlign: 'center',
                // position: 'relative', // For close button positioning
              }}
            >
              {/* Close Button */}
              <IconButton
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                }}
              >
                <Close />
              </IconButton>

              {/* Image */}
              <img
                src={selectedImage}
                alt="Selected"
                style={{ width: 'auto', height: '100%', objectFit: 'contain', textAlign: 'center' }}
              />
            </Box>
          </Modal>
        </Grid>
      </div>
    </>
  );
};

export default ImageUploadSection;
