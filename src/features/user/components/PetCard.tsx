import React, { useState } from "react"
import { Card, Button, Typography } from "antd"
import { HeartOutlined, HeartFilled } from "@ant-design/icons"
import Image from "next/image"
import { StaticImageData } from "next/image"

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

  return (
    <Card
      hoverable
      style={{
        width: 240,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#white",
      }}
      cover={
        <Image
          alt={pet.name}
          src={pet.image}
          style={{
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            height: 200,
            objectFit: "cover",
          }}
        />
      }
      actions={[
        <Button
          key="adopt"
          type="primary"
          style={{
            backgroundColor: "#B95F5F",
            borderColor: "#B95F5F",
            borderRadius: 4,
            width: "90%",
            margin: "auto",
            display: "block",
            color: "#fff",
          }}
          onClick={() => console.log(`Adopting ${pet.name}`)}
        >
          Adopt
        </Button>,
      ]}
    >
      <Meta
        title={
          <div className="flex justify-between items-center">
            <Text strong style={{ fontSize: 16, color: "#B95F5F" }}>
              {pet.name}
            </Text>
            {isFavorite ? (
              <HeartFilled
                style={{ fontSize: 18, color: "#B95F5F", cursor: "pointer" }}
                onClick={() => setIsFavorite(false)}
              />
            ) : (
              <HeartOutlined
                style={{ fontSize: 18, cursor: "pointer" }}
                onClick={() => setIsFavorite(true)}
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
