import React, { useState, useEffect } from "react"
import { Card, Button, Typography } from "antd"
import { HeartOutlined, HeartFilled } from "@ant-design/icons"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

const { Meta } = Card
const { Text } = Typography

interface Pet {
  id: string
  image: StaticImageData
  name: string
  price: number
}

const PetCard: React.FC<{ pet: Pet }> = ({ pet }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "{}")
    setIsFavorite(!!favorites[pet.id])
  }, [pet.id])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "{}")
    const newFavorites = {
      ...favorites,
      [pet.id]: !isFavorite,
    }

    localStorage.setItem("favorites", JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }
  return (
    <Card
      className="rounded-xl overflow-hidden bg-white w-60 hover:shadow-md"
      cover={
        <Image
          alt={pet.name}
          src={pet.image}
          className="object-cover rounded-tr-xl rounded-tl-xl h-52"
        />
      }
      actions={[
        <Button
          key="adopt"
          type="primary"
          className="bg-[#B95F5F] border-[#B95F5F] rounded-md w-[90%] mx-auto text-white"
          onClick={() => console.log(`Adopting ${pet.name}`)}
        >
          Adopt
        </Button>,
      ]}
    >
      <Meta
        title={
          <div className="flex justify-between items-center">
            <Link href={`/pet/${pet.id}`}>
              <Text strong className="text-base text-[#B95F5F] hover:underline">
                {pet.name}
              </Text>
            </Link>
            {isFavorite ? (
              <HeartFilled
                className="text-lg text-[#B95F5F] cursor-pointer"
                onClick={toggleFavorite}
              />
            ) : (
              <HeartOutlined
                className="text-lg cursor-pointer"
                onClick={toggleFavorite}
              />
            )}
          </div>
        }
        description={
          <Text style={{ fontSize: 14, color: "#B95F5F" }}>${pet.price}</Text>
        }
      />
    </Card>
  )
}

export default PetCard
