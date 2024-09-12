// src/plugins/vuetify.js
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
// import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
  // Add custom configuration here
  components,
  directives,
  theme: {
    defaultTheme: 'light', // or 'dark' 'light'
  },
  defaults: {
    VCard: {
      elevation: 2,
      outlined: true,
    },
    VBtn: {
      rounded: 'md',
      fontWeight: '400',
      letterSpacing: '0',
    },
  },
});
