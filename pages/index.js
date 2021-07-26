import Head from 'next/head'
import { connectToDatabase } from '../lib/mongodb'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';

export default function Home({ properties }) {

console.log(properties)

  return (
    <div>
      
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Admin Page</h1>
            <h2 className="text-center">Form Collection</h2>

            {properties && properties.map(property => (
              <div className='mt-5' key={property._id}>
                <p>{property.name}</p>
                <p>{property.email}</p>
                <p>{property.phone}</p>
                <p>{property.message}</p>

                <Button variant="primary">Delete</Button>
              </div>
              
            ))}

          </div>
          
        </div>
      </div>

    </div>
  )
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase()

  const data = await db.collection("formCollection").find({}).limit(20).toArray();

  const properties = JSON.parse(JSON.stringify(data));



  return {
    props: { properties: properties },
  }
}
