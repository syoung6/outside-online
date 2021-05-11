const { client } = require('../utils/prismic-client');

module.exports = async () => {
  const result = await client.query('');

  const page = result.results[0];
  const title = page.data.page_title[0].text;

  const terms = page.data.body.filter(item => {
    return item.slice_type === 'glossary_term';
  }).map(slice => {
    const fields = slice.primary;

    return {
      term: fields.title[0].text,
      description: fields.description[0].text,
    }
  });

  return { title, terms };
}