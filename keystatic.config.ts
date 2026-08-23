import { config, fields, collection } from '@keystatic/core'

export const showAdminUI = process.env.NODE_ENV === 'development'

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'content/projects/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        description: fields.text({ label: 'Description', multiline: true }),
        image_url: fields.pathReference({
          label: 'Project image',
          description: 'Select an image from anywhere in the public folder',
          pattern: 'public/**/*.{png,jpg,jpeg,webp,gif,svg,ico,avif}',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value || 'Tag',
        }),
        demo_url: fields.url({ label: 'Demo URL' }),
        repo_url: fields.url({ label: 'Repository URL' }),
        featured: fields.checkbox({ label: 'Featured project' }),
        created_at: fields.date({ label: 'Created at' }),
      },
    }),
  },
})
