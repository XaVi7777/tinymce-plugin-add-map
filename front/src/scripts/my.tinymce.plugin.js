import 'es6-promise';
import tinymce from 'tinymce';
import mapboxgl from 'mapbox-gl';
import { settings } from '../../settings';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default (name) => tinymce.PluginManager.add(name, editor => {

  const createDialogConfig = () => {
    const dialogConfig = {
      title: 'Just a title',
      url: 'http://127.0.0.1:5501/front/src/iframe.html',
      buttons: [
        {
          type: 'cancel',
          text: 'Закрыть'
        },
        {
          type: 'custom',
          name: 'insert-and-close',
          primary: true,
          text: 'Добавить карту'
        },
      ],
      onAction: function (instance, trigger) {
        instance.sendMessage({
          mceAction: "customInsertAndClose"
        });
      }
    }
    editor.windowManager.openUrl(dialogConfig);
  }


  editor.ui.registry.addButton(name, {
    icon: 'user',

    onAction: () => {
      createDialogConfig();
    }
  });

  editor.addCommand("iframeCommand", function (ui, value) {
    console.log('value', value)
    editor.insertContent(`<img src="${value}">`)
  });
});


