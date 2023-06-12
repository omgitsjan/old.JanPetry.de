const breadcrumb = {
  nav: 'mr-12',
  list: 'flex flex-wrap space-x-4',
  itemContainer: 'flex items-center',
}

const breadcrumbItem = {
  icon: ' !h-4.5 !w-4.5 !block',
  iconWithLabel: 'mr-1',
  default: 'flex items-center text-gray-600 dark:text-gray-400',
  disabled: 'text-gray-400 dark:text-gray-600',
  separator: 'ml-2 text-gray-400 dark:text-gray-600',
}

export default defineAppConfig({
  docus: {
    layout: {
      fluid: false,
    },
    title: 'Jan Petry',
    description:
      'Developer, working for KÜS Data GmbH and in my free im coding a bit and playing some video games.',
  },
  seoUi: {
    breadcrumb,
    breadcrumbItem,
  },
})
