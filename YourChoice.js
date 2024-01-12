useEffect(() => {
    const GalleryPermission = async () => {
      try {
        // Conditionally pass different permission types based on the platform
        const permissionType =
          Platform.OS === 'ios' ? 'PHOTO_LIBRARY' : 'READ_EXTERNAL_STORAGE';
        const result = await RequestGalleryPermission(permissionType);
        console.log(result);
        // Now you can use the result or perform other actions based on the permission status.
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    };

    GalleryPermission();
  }, []);
