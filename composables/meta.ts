import {
  SameAs,
  SiteDescription,
  SiteLanguage,
  SiteLogo,
  SiteName,
  SiteUrl,
} from '~/logic'

export function useSiteMeta() {
  return {
    name: SiteName,
    description: SiteDescription,
    sameAs: SameAs,
    logo: SiteLogo,
    lang: SiteLanguage,
    host: SiteUrl,
  }
}
