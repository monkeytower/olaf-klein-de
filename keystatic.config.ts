import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: import.meta.env.PROD
    ? {
        kind: 'github',
        repo: {
          owner: 'olafklein', // Placeholder, to be updated
          name: 'olaf-klein-de',
        },
      }
    : {
        kind: 'local',
      },
  singletons: {
    settings: singleton({
      label: 'Site Settings',
      path: 'src/content/settings',
      schema: {
        siteTitle: fields.text({ label: 'Site Title', validation: { length: { min: 1 } } }),
        siteDescription: fields.text({ label: 'Global SEO Description' }),
        socialLinks: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            url: fields.url({ label: 'URL' }),
            icon: fields.text({ label: 'Icon Name (e.g. WhatsApp)' }),
          }),
          { label: 'Social Links / Contacts' }
        ),
        footerText: fields.text({ label: 'Footer Text' }),
      },
    }),
    home: singleton({
      label: 'Home Page',
      path: 'src/content/home',
      schema: {
        headline: fields.text({ label: 'Main Headline' }),
        subheadline: fields.text({ label: 'Sub Headline' }),
        tagline: fields.text({ label: 'Tagline (e.g. all we have is now)' }),
        heroImage: fields.image({
          label: 'Hero Image',
          directory: 'src/assets/images/home',
          publicPath: '@assets/images/home',
        }),
      },
    }),
  },
  collections: {
    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        seoTitle: fields.text({ label: 'SEO Title (Optional)' }),
        seoDescription: fields.text({ label: 'SEO Description (Optional)' }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/assets/images/pages',
              publicPath: '@assets/images/pages',
            },
          },
        }),
      },
    }),
    services: collection({
      label: 'Services',
      slugField: 'name',
      path: 'src/content/services/*',
      format: { contentField: 'content' },
      schema: {
        name: fields.slug({ name: { label: 'Service Name' } }),
        icon: fields.text({ label: 'Icon (Lucide/Heroicons)' }),
        description: fields.text({ label: 'Short Summary' }),
        content: fields.markdoc({ label: 'Detailed Description' }),
      },
    }),
    portfolio: collection({
      label: 'Portfolio',
      slugField: 'title',
      path: 'src/content/portfolio/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Project Title' } }),
        date: fields.date({ label: 'Project Date' }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'src/assets/images/portfolio',
          publicPath: '@assets/images/portfolio',
        }),
        content: fields.markdoc({ label: 'Project Details' }),
      },
    }),
  },
});
