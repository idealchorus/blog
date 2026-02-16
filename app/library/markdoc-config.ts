import Markdoc from "@markdoc/markdoc"
import { parse } from "@std/yaml"
import { postFrontmatterSchema } from "./schemas.ts"
import { dateToLocaleDateString } from "./utils.ts"

function collectTextFromScalar(scalar: Markdoc.Scalar): string {
  if (scalar === null) {
    return ""
  } else if (
    typeof scalar === "boolean" || typeof scalar === "number" ||
    typeof scalar === "string"
  ) {
    return String(scalar)
  } else if (Array.isArray(scalar)) {
    let text = ""

    for (const item of scalar) {
      text += collectTextFromScalar(item)
    }

    return text
  } else {
    let text = ""

    for (const value of Object.values(scalar)) {
      text += collectTextFromScalar(value)
    }

    return text
  }
}

function collectTextFromNodes(
  children: Array<Markdoc.RenderableTreeNode>,
): string {
  let text = ""

  for (const child of children) {
    if (Markdoc.Tag.isTag(child)) {
      text += collectTextFromNodes(child.children)
    } else {
      text += collectTextFromScalar(child)
    }
  }

  return text
}

function createSlug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "")
}

const markdocConfig: Markdoc.Config = {
  nodes: {
    document: {
      transform(node, config) {
        const frontmatter = postFrontmatterSchema.parse(
          parse(node.attributes.frontmatter),
        )

        const children = node.transformChildren(config)

        const title = frontmatter.title
        const createdDate = frontmatter.createdDate
        const editedDate = frontmatter.editedDate
        const date = editedDate ?? createdDate

        const out: Array<Markdoc.RenderableTreeNode> = []
        const stack: Array<{ level: number; tag: Markdoc.Tag }> = []

        for (const child of children) {
          if (
            Markdoc.Tag.isTag(child) &&
            child.name === "Heading" 
            &&
            typeof child.attributes.level === "number"
          ) {
            const headingText = collectTextFromNodes(child.children)
            const headingSlug = createSlug(headingText)
            const headingId = `${child.attributes.level}-${headingSlug}`

            // Build a nested <section><header><hN id=...>...</hN></header>...</section>
            const section = new Markdoc.Tag("section", {}, [
              new Markdoc.Tag("header", {}, [
                new Markdoc.Tag(
                  `h${child.attributes.level}`,
                  { id: headingId },
                  child.children,
                ),
              ]),
            ])

            while (
              stack.length > 0 &&
              stack[stack.length - 1]!.level >= child.attributes.level
            ) {
              stack.pop()
            }

            if (stack.length === 0) out.push(section)
            else stack[stack.length - 1]!.tag.children.push(section)

            stack.push({ level: child.attributes.level, tag: section })
          } else {
            if (stack.length === 0) out.push(child)
            else stack[stack.length - 1]!.tag.children.push(child)
          }
        }

        const postId = createSlug(title)

        return new Markdoc.Tag("article", { class: "post" }, [
          new Markdoc.Tag("header", {}, [
              new Markdoc.Tag("h1", { id: postId }, [title]),
              new Markdoc.Tag("time", { datetime: date.toISOString() }, [dateToLocaleDateString(date)]),
          ]),
          ...out,
        ])
      },
    },
        heading: {
      transform(node, config) {
        const level = node.attributes.level;
        const children = node.transformChildren(config);
        return new Markdoc.Tag("Heading", { level }, children);
      },
    },
  },
  
}

export default markdocConfig
