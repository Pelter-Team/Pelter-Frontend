import React, { useState, useEffect } from "react"
import { Card, Button, Typography } from "antd"
import { HeartOutlined, HeartFilled } from "@ant-design/icons"
import Image from "next/image"
import Link from "next/link"

const { Meta } = Card
const { Text } = Typography

interface Pet {
  id: number
  image: string
  name: string
  price: number
  is_sold: boolean
}

const PetCard: React.FC<{
  pet: Pet
  onRemoveFav?: (petId: number) => void
}> = ({ pet, onRemoveFav }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : []
    setIsFavorite(
      Array.isArray(favorites) && favorites.includes(Number(pet.id))
    )
  }, [pet.id])

  const toggleFavorite = () => {
    const storedFavorites = localStorage.getItem("favorites")
    const favorites = storedFavorites
      ? JSON.parse(storedFavorites)
      : ([] as number[])

    if (!Array.isArray(favorites)) {
      const newFavorites = [Number(pet.id)] as number[]
      localStorage.setItem("favorites", JSON.stringify(newFavorites))
      setIsFavorite(true)
      return
    }

    if (isFavorite) {
      const newFavorites = favorites.filter(
        (id) => id !== Number(pet.id)
      ) as number[]
      localStorage.setItem("favorites", JSON.stringify(newFavorites))
      if (onRemoveFav) onRemoveFav(Number(pet.id))
    } else {
      favorites.push(Number(pet.id))
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
    setIsFavorite(!isFavorite)
  }
  return (
    <Card
      className="rounded-xl overflow-hidden bg-white w-60 hover:shadow-md relative"
      cover={
        <Image
          alt={pet.name}
          src={pet.image}
          className="object-cover rounded-tr-xl rounded-tl-xl"
          width={240}
          height={208}
        />
      }
      // actions={[
      //   <Link href={`/pet/${pet.id}`}>
      //     <Button
      //       key="adopt"
      //       type="primary"
      //       className="bg-[#B95F5F] border-[#B95F5F] rounded-md w-[90%] mx-auto text-white"
      //     >
      //       Adopt
      //     </Button>
      //   </Link>,
      // ]}
    >
      {pet.is_sold && (
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-lg hover:bg-red-200 hover:text-white text-red-400">
          <h6 className=" text-sm font-normal">Sold</h6>
        </div>
      )}
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
