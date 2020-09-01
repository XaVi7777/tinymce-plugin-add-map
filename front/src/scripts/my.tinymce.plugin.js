import 'es6-promise';
import tinymce from 'tinymce';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import html2canvas from 'html2canvas';
import { settings } from '../../settings';

export default (name) => tinymce.PluginManager.add(name, editor => {

  const createDialogConfig = () => {

    const dialogConfig = {
      title: 'Just a title',
      size: 'large',

      body: {
        type: 'panel',
        items: [
          {
            type: 'iframe',
            name: 'iframe',
            label: 'Description of iframe',
            sandboxed: true,
          }
        ],
      },


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

      initialData: {
        iframe: settings.GEOCODER_HTML,
      },

      onAction: async function (api, details) {
        if (details.name === 'insert-and-close') {
          const iframe = document.getElementsByTagName('iframe')[1];

          let iframeWindow = iframe.contentDocument;

          const mapImg = await html2canvas(iframeWindow.querySelector('#map')).then(canvas => canvas.toDataURL());
          editor.insertContent(`<img src="${mapImg}" alt="map">`)

          api.close()
        }
      }
    }
    editor.windowManager.open(dialogConfig);
  }

  editor.ui.registry.addButton(name, {
    icon: 'user',

    onAction: () => {
      createDialogConfig();
    }
  });

});


