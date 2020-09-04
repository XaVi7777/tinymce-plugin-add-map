import 'es6-promise';
import tinymce from 'tinymce';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { settings } from '../../settings';

export default name => tinymce.PluginManager.add(name, async editor => {
  let id;

  const createDialogConfig = async (id) => {

    console.log('dialog', id)
    const dialogConfig = {
      title: 'Just a title',
      url: 'http://localhost:4000/static/mapbox.html',

      buttons: [
        {
          type: "custom",
          name: id,
          text: "Insert and Close",
          primary: true,
          align: "end"
        },
        {
          type: "cancel",
          name: "cancel",
          text: "Close Dialog",
        }
      ],

      onAction: async (api, details) => {
        console.log(details.name)
        api.sendMessage({
          mceAction: "customInsertAndClose",
          id: details.name,
        });
      }
    }
    editor.windowManager.openUrl(dialogConfig);
  }

  editor.ui.registry.addButton(name, {
    icon: 'user',

    onAction: async () => {
      const response = await fetch(settings.API_URL);

      const json = await response.json();
      id = json.id
      console.log('fetch', id)
      createDialogConfig(id);
    }
  });

  editor.addCommand('iframeCommand', async (_, value) => {

    const response = await fetch(settings.API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ markers: value.markers, center: value.center, id }),
    });

    const json = await response.json();
    if (json.success) {
      editor.insertContent(`<img id=${id} src=${value.dataUrl} alt="map"/>`)
    }
  });

  editor.on('click', async event => {
    if (event.target.tagName === 'IMG') {
      // const response = await fetch(``)
    }
  })

});


