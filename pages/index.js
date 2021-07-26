import Head from 'next/head'
import { connectToDatabase } from '../lib/mongodb'

export default function Home({ properties }) {

console.log(properties)

  return (
    <div>

    </div>
  )
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase()

  const data = await db.collection("formCollection").find({}).limit(20).toArray();

  const properties = JSON.parse(JSON.stringify(data));

  const filtered = properties.map(property => {
    // const properties = JSON.parse(JSON.stringify(data));
    return { //props
      _id: property._id,
      name: property.name,
      email: property.email,
      phone: property.phone,
      message: property.message
    }

  })

  console.log(properties);

  return {
    props: { properties: filtered },
  }
}
