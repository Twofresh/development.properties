import type { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'serviceCategory', 'price', 'town', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Development name, e.g. Meadow Rise, Guildford',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Used in the listing URL, e.g. meadow-rise-guildford',
      },
    },
    {
      name: 'serviceCategory',
      type: 'select',
      required: true,
      options: [
        { label: 'Land & Buildings with Planning', value: 'land-with-planning' },
        { label: 'Portfolios & Investments', value: 'portfolio-investment' },
        { label: 'Planning & Land Promotion', value: 'land-promotion' },
      ],
    },
    {
      name: 'listingSource',
      type: 'select',
      required: true,
      defaultValue: 'developer-direct',
      options: [
        { label: 'Developer Direct', value: 'developer-direct' },
        { label: 'Estate Agent', value: 'estate-agent' },
      ],
    },
    {
      name: 'planningStatus',
      type: 'select',
      options: [
        { label: 'No Planning', value: 'no-planning' },
        { label: 'Pre-Application', value: 'pre-application' },
        { label: 'Outline Permission Granted', value: 'outline-permission' },
        { label: 'Full Permission Granted', value: 'full-permission' },
      ],
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'priceQualifier',
      type: 'select',
      defaultValue: 'guide',
      options: [
        { label: 'Guide Price', value: 'guide' },
        { label: 'Offers Over', value: 'offers-over' },
        { label: 'Fixed Price', value: 'fixed' },
        { label: 'Price on Application', value: 'poa' },
      ],
    },
    {
      name: 'addressLine1',
      type: 'text',
      required: true,
    },
    {
      name: 'addressLine2',
      type: 'text',
    },
    {
      name: 'town',
      type: 'text',
      required: true,
    },
    {
      name: 'postcode',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'point',
      admin: {
        description: 'Longitude/latitude for map display',
      },
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'numberOfUnits',
      type: 'number',
      admin: { description: 'Number of units proposed' },
    },
    {
      name: 'proposedSqFt',
      type: 'number',
    },
    {
      name: 'numberOfParkingSpaces',
      type: 'number',
    },
    {
      name: 'numberOfGardens',
      type: 'number',
    },
    {
      name: 'tenure',
      type: 'select',
      options: [
        { label: 'Freehold', value: 'freehold' },
        { label: 'Leasehold', value: 'leasehold' },
      ],
    },
    {
      name: 'financialContributions',
      type: 'textarea',
    },
    {
      name: 'vatApplicable',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'access',
      type: 'textarea',
      admin: {
        description: 'How the site is accessed',
      },
    },
    {
      name: 'furtherInformation',
      type: 'textarea',
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'floorplan',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'documents',
      type: 'array',
      access: {
        // Only signed-in users can read document contents from the public API
        read: ({ req }) => Boolean(req.user),
      },
      admin: {
        description: 'Only visible to signed-in users on the public site',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'agent',
      type: 'relationship',
      relationTo: 'agents',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
