import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  // From the post side
  const posts = await prisma.post.findMany({
    include: {
      categories: true,
    },
  })
  console.dir(posts, { depth: Infinity })

  // From the other side
  const categories = await prisma.category.findMany({
    include: {
      posts: true,
    },
  })
  console.dir(categories, { depth: Infinity })
}

main().catch(console.error)
