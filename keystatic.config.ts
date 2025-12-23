import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: import.meta.env.PROD
    ? {
        kind: 'github',
        repo: {
          owner: 'monkeytower',
          name: 'olaf-klein-de',
        },
      }
    : {
        kind: 'local',
      },
  singletons: {
    settings: singleton({
      label: 'Site Settings / Website-Einstellungen',
      path: 'src/content/settings',
      schema: {
        siteTitle: fields.text({ label: 'Site Title / Website-Titel', validation: { length: { min: 1 } } }),
        siteDescription: fields.text({ label: 'Global SEO Description / Globale SEO-Beschreibung' }),
        socialLinks: fields.array(
          fields.object({
            label: fields.text({ label: 'Label / Bezeichnung' }),
            url: fields.url({ label: 'URL' }),
            icon: fields.text({ label: 'Icon Name / Icon-Bezeichnung (e.g. WhatsApp)' }),
          }),
          { label: 'Social Links / Kontakte' }
        ),
        footerText: fields.text({ label: 'Footer Text / Footer-Text' }),
      },
    }),
    home: singleton({
      label: 'Home Page / Startseite',
      path: 'src/content/home',
      schema: {
        subheadline: fields.text({ 
          label: 'Sub-Headline / Unterüberschrift',
          description: 'The text below the main name (e.g. Caveman with an iPhone)'
        }),
        heroImage: fields.image({
          label: 'Hero Image / Hintergrundbild',
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
      path: 'src/content/pages/**',
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
