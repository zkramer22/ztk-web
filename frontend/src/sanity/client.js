import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: 'nycnglof',
    dataset: 'production',
    apiVersion: '2025-08-03',
    useCdn: true
})
