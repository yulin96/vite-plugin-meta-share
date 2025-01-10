import { Plugin } from 'vite'

export type vitePluginMetaShareOption = {
  enable?: boolean
  title?: string
  description?: string
  link?: string
  image?: string
}

export default function vitePluginMetaShare(option: vitePluginMetaShareOption): Plugin {
  return {
    name: 'vite-plugin-deploy-oss',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html) {
      let _html = html
      if (option.enable) {
        _html = ogMeta(_html, option)
        _html = twitterMeta(_html, option)
        _html = otherMeta(_html, option)
      }
      return _html
    },
  }
}

function ogMeta(html: string, option: vitePluginMetaShareOption) {
  const { title, description, link, image } = option || {}

  return html.replace(
    /<head>/,
    `<head>\n    ${title ? `<meta property="og:title" content="${title}">\n    ` : ''}${
      description ? `<meta property="og:description" content="${description}">\n    ` : ''
    }${link ? `<meta property="og:url" content="${link}">\n    ` : ''}${
      image ? `<meta property="og:image" content="${image}">\n    ` : ''
    }`
  )
}

function twitterMeta(html: string, option: vitePluginMetaShareOption) {
  const { title, description, link, image } = option || {}

  return html.replace(
    /<head>/,
    `<head>\n    ${
      title
        ? `<meta name="twitter:card" content="summary">\n    <meta name="twitter:title" content="${title}">\n    `
        : ''
    }${description ? `<meta name="twitter:description" content="${description}">\n    ` : ''}${
      link ? `<meta name="twitter:url" content="${link}">\n    ` : ''
    }${image ? `<meta name="twitter:image" content="${image}">\n    ` : ''}`
  )
}

function otherMeta(html: string, option: vitePluginMetaShareOption) {
  const { title, description, link, image } = option || {}

  return html.replace(
    /<head>/,
    `<head>\n    \n    ${
      description ? `<meta name="description" content="${description}">\n    ` : ''
    }${image ? `<link rel="shortcut icon" type="text/css" href="${image}" />\n    ` : ''}${
      image ? `<link rel="apple-touch-icon" href="${image}" />\n    ` : ''
    }`
  )
}
