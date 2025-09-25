import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({ name: 'excerpt', type: 'text' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({
      name: 'mainImage',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      ...( {
        name: 'tags',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'tag' }],
          },
        ],
      } as any),
    }),
    defineField({ name: 'demo_url', title: 'Demo URL', type: 'url' }),
    defineField({ name: 'repo_url', title: 'Repo URL', type: 'url' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      featured: 'featured',
    },
    prepare({ title, media, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        media,
      }
    },
  },
})
