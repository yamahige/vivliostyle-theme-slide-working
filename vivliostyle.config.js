module.exports = {
  language: 'ja',
  theme: 'theme.css',
  author: 'yamahige',
  entry: [
    'example/slide.md'
  ],
  size: 'a5 landscape',
  output: [
    'slide.pdf',
    {
      path: './slide',
      format: 'webpub',
    },
  ]
};