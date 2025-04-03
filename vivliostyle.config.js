module.exports = {
  language: 'ja',
  theme: 'theme.css',
  entry: ['example/slide.md'],
  size: 'a5 landscape',
  output: [
    'slide.pdf',
    {
      path: './slide',
      format: 'webpub',
    },
  ],
};