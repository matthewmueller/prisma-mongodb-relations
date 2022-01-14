import { PrismaClient, Post, Category } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      email: "alice@prisma.io",
      name: "Alice",
    },
  })
  // Create a customer
  await prisma.customer.create({
    data: {
      stripe_id: "abc_123",
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })
  // Create some posts
  const p1 = await prisma.post.create({
    data: {
      title: "First post",
      user: { connect: { id: user.id } },
    },
  })
  const p2 = await prisma.post.create({
    data: {
      title: "Second post",
      user: { connect: { id: user.id } },
    },
  })
  const p3 = await prisma.post.create({
    data: {
      title: "Third post",
      user: { connect: { id: user.id } },
    },
  })
  // Create some categories
  const c1 = await prisma.category.create({
    data: {
      name: "Sports",
    },
  })
  const c2 = await prisma.category.create({
    data: {
      name: "Fashion",
    },
  })
  const c3 = await prisma.category.create({
    data: {
      name: "Programming",
    },
  })
  // Link posts to categories (this connects both sides)
  await prisma.post.update({
    where: {
      id: p1.id,
    },
    data: {
      categories: {
        connect: [
          {
            name: c1.name,
          },
          {
            name: c2.name,
          },
        ],
      },
    },
  })

  // Link some categories to posts
  await prisma.category.update({
    where: {
      id: c3.id,
    },
    data: {
      posts: {
        connect: [
          {
            id: p1.id,
          },
          {
            id: p3.id,
          },
        ],
      },
    },
  })
}

main().catch(console.error)
