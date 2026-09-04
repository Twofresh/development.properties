import type { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'price', 'town', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Used in the property URL, e.g. 12-oak-avenue',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'for-sale',
      options: [
        { label: 'For Sale', value: 'for-sale' },
        { label: 'Under Offer', value: 'under-offer' },
        { label: 'Sold', value: 'sold' },
        { label: 'For Rent', value: 'for-rent' },
        { label: 'Let', value: 'let' },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'priceQualifier',
      type: 'select',
      options: [
        { label: 'Guide Price', value: 'guide' },
        { label: 'Offers Over', value: 'offers-over' },
        { label: 'Fixed Price', value: 'fixed' },
        { label: 'Per Calendar Month', value: 'pcm' },
      ],
    },
    {
      name: 'propertyType',
      type: 'select',
      required: true,
      options: [
        { label: 'House', value: 'house' },
        { label: 'Flat', value: 'flat' },
        { label: 'Bungalow', value: 'bungalow' },
        { label: 'Land', value: 'land' },
        { label: 'Commercial', value: 'commercial' },
      ],
    },
    {
      name: 'bedrooms',
      type: 'number',
    },
    {
      name: 'bathrooms',
      type: 'number',
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
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
        },
      ],
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
