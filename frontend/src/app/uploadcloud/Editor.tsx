import { UIEvent, PhotoEditorSDKUI } from 'photoeditorsdk';

const editor = await PhotoEditorSDKUI.init({
  container: '#editor',
  image: 'example.png', // relative to assets directory
  // Please replace this with your license: https://img.ly/dashboard
  license: '',
});

ex