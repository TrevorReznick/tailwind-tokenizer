import { Octokit } from 'octokit';
import JSZip from 'jszip';

export async function convertTailwindToTokens(repoUrl: string) {
  const [, owner, repo] = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/) || []

  if (!owner || !repo) {
    throw new Error('URL del repository non valido')
  }

  const octokit = new Octokit()

  async function getRepoContent(path = '') {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
    })

    return data
  }

  async function scanDirectory(path = '') {
    const contents = await getRepoContent(path)
    let files = []

    for (const item of contents) {
      if (item.type === 'file') {
        if (item.name.endsWith('.js') || item.name.endsWith('.ts') || item.name.endsWith('.tsx')) {
          const fileContent = await octokit.repos.getContent({
            owner,
            repo,
            path: item.path,
          })
          files.push({
            name: item.name,
            path: item.path,
            content: Buffer.from(fileContent.data.content, 'base64').toString('utf-8')
          })
        }
      } else if (item.type === 'dir') {
        files = files.concat(await scanDirectory(item.path))
      }
    }

    return files
  }

  const files = await scanDirectory()
  const tokens = parseConfigToTokens(files.find(f => f.name === 'tailwind.config.js')?.content || '')
  const cssVariables = generateCSSVariables(tokens)
  const componentStyles = generateComponentStyles(tokens)

  const zip = new JSZip()
  zip.file('design-tokens.json', JSON.stringify(tokens, null, 2))
  zip.file('variables.css', cssVariables)
  zip.file('component-styles.css', componentStyles)

  const zipContent = await zip.generateAsync({ type: 'base64' })

  return { tokens, cssVariables, componentStyles, zipContent }
}

// Helper functions to be implemented
function parseConfigToTokens(configContent: string) {
  // TODO: Implement parsing logic
  return {}
}

function generateCSSVariables(tokens: any) {
  // TODO: Implement CSS variables generation
  return ''
}

function generateComponentStyles(tokens: any) {
  // TODO: Implement component styles generation
  return ''
}